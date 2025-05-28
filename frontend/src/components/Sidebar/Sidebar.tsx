import {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {
  IconDashBoard,
  IconDocument,
  IconFolder,
  // IconFolderConnection,
  IconLogout,
  IconSetting,
  IconSupport,
  IconUser,
  IconWallet,
  IconYourCompute,
} from "@/assets/icons/Index";
import { SIDEBAR_ITEM_LABELS } from "@/constants/projectConstants";
import { useAuth } from "@/providers/AuthProvider";
import SwitchOrganizationModal from "../SwitchOrganizationModal/SwitchOrganizationModal";
import "./Sidebar.scss";
import ItemSidebar from "./SidebarItem/Index";
import { useGetMyOrganizations } from "@/hooks/organization/useGetMyOrganizations";
import { useAdminOrganizations } from "@/hooks/organization/useAdminOrganizations";
import { newOrganization } from "@/pages/Admin/Organization/Organization";
import { useSwitchOrganization } from "@/hooks/organization/useSwitchOrganizations";
import { confirmDialog } from "../Dialog";
import { generateRandomText } from "@/utils/randomName";
import { useApi } from "@/providers/ApiProvider";
import { useInviteMember } from "@/hooks/organization/useInviteMember";
import {Tooltip} from "react-tooltip";
import {createPortal} from "react-dom";

type TSidebarProps = {
  isExpand: boolean;
};

type BaseItem = {
  path: string;
  icon: JSX.Element;
  label: string;
  activeChecker?: (path: string) => boolean;
  description?: string;
};

export type SidebarItem = BaseItem & {
  children?: BaseItem[];
};

export type SidebarItemWithID = SidebarItem & {
  id: string;
};

const sidebarItems: SidebarItem[] = [
  { path: "/dashboard/", icon: <IconDashBoard />, label: SIDEBAR_ITEM_LABELS.DASHBOARD },
  // {
  //   path: "/computes/",
  //   icon: <IconYourCompute />,
  //   label: SIDEBAR_ITEM_LABELS.COMPUTES,
  //   activeChecker: (path: string) => {
  //     return ["/computes", "/computes/"].includes(path);
  //   },
  // },
  {
    path: "/workflows",
    icon: <IconFolder />,
    label: SIDEBAR_ITEM_LABELS.WORKFLOWS,
    activeChecker: (path: string) => {
      return path.startsWith("/workflows") || path.startsWith("/marketplace/workflow");
    },
    children: [
      {
        path: "/workflows/flows",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.WORKFLOWS_FLOWS,
      },
      {
        path: "/workflows/runs",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.WORKFLOWS_RUNS,
      },
      {
        path: "/workflows/connections",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.WORKFLOWS_CONNECTIONS,
      },
      {
        path: "/workflows/mcp",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.WORKFLOWS_MCP,
      },
      // {
      //   path: "/workflows/blocks",
      //   icon: <IconDocument />,
      //   label: SIDEBAR_ITEM_LABELS.WORKFLOWS_BLOCKS,
      // },
      {
        path: "/workflows/ai-providers",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.WORKFLOWS_AI_PROVIDERS,
      },
    ],
  },
  {
    path: "/projects?page=1",
    icon: <IconFolder />,
    label: SIDEBAR_ITEM_LABELS.YOUR_PROJECTS,
    activeChecker: (path: string) => {
      return path.startsWith("/projects") || path.startsWith("/create-project");
    },
  },
  {
    path: "/infrastructure/storage/cloud",
    icon: <IconYourCompute />,
    label: SIDEBAR_ITEM_LABELS.INFRASTRUCTURE,
    activeChecker: (path: string) => {
      if (path.startsWith("/infrastructure/setup-platform")) {
        return false;
      }

      return path.startsWith("/infrastructure") || path.startsWith("/computes/");
    },
  },
  // { path: "/infrastructure/setup-platform", icon: <IconFolderConnection />, label: SIDEBAR_ITEM_LABELS.SELF_HOST },
  // { path: "/models-seller", icon: <IconHome />, label: SIDEBAR_ITEM_LABELS.MODELS_SELLER },
  // { path: "/computes-supplier/", icon: <IconModelSeller />, label: SIDEBAR_ITEM_LABELS.COMPUTES_SUPPLIER },
  // { path: "/notebook/", icon: <IconBook />, label: SIDEBAR_ITEM_LABELS.NOTEBOOK },
  {
    path: "/document",
    icon: <IconDocument />,
    label: SIDEBAR_ITEM_LABELS.DOCUMENT,
  },
  {
    path: "/admin/organization",
    icon: <IconSetting width={20} height={20} />,
    label: SIDEBAR_ITEM_LABELS.ADMIN,
    activeChecker: (path: string) => {
      return path.startsWith("/admin");
    },
  },
  {
    path: "/",
    icon: <IconUser />,
    label: SIDEBAR_ITEM_LABELS.ACCOUNT,
    activeChecker: (path: string) => {
      return ["/user/account", "/user/rewards"].indexOf(path) > -1;
    },
    children: [
      {
        path: "/user/account",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.ACCOUNT_SETTINGS,
      },
      {
        path: "/user/rewards",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.ACCOUNT_REWARDS,
      },
      {
        path: "/switch",
        icon: <IconDocument />,
        label: SIDEBAR_ITEM_LABELS.SWITCH,
      },
      {
        path: "/user/wallet",
        icon: <IconWallet />,
        label: SIDEBAR_ITEM_LABELS.WALLET,
      },
      {
        path: "/user/organization",
        icon: <IconUser />,
        label: SIDEBAR_ITEM_LABELS.ORGANIZATIONS,
      },
    ],
  },
  {
    path: "/discord/",
    icon: <IconSupport />,
    label: SIDEBAR_ITEM_LABELS.DISCORD,
  },
];

const sidebarItemsWithId = sidebarItems.map(i => ({
  ...i,
  id: "sidebar-item-" + Math.random().toString().substring(2, 8),
}))

export function Sidebar({ isExpand }: TSidebarProps) {
  const { logout, user } = useAuth();
  const [isShowSwitchOrganizationModal, setIsShowSwitchOrganizationModal] =
    useState<boolean>(false);
  const organizationsData = useGetMyOrganizations();
  const { save } = useAdminOrganizations();
  const { switchOrganization, error } = useSwitchOrganization();
  const { organizations } = organizationsData;
  const api = useApi();
  const { inviteByEmail } = useInviteMember();

  const currentUser = useMemo(() => {
    return organizations.find((item) => item.id === user?.active_organization);
  }, [user, organizations]);

  const renderSidebarItems = (items: SidebarItemWithID[]) => {
    if (!items) {
      return null;
    }

    const allowedItems = items
      .filter(item => {
        if (user?.is_superuser) {
          return true;
        }

        if ([SIDEBAR_ITEM_LABELS.ORGANIZATIONS].includes(item.label)) {
          return user?.is_organization_admin;
        }

        if ([SIDEBAR_ITEM_LABELS.ADMIN].includes(item.label)) {
          return user?.is_superuser;
        }

        return true;
      })
      .map(item => {
        if (item.label === SIDEBAR_ITEM_LABELS.ACCOUNT) {
          return {
            ...item,
            children: item.children?.filter(c => {
              if ([SIDEBAR_ITEM_LABELS.ORGANIZATIONS].includes(c.label)) {
                return user?.is_organization_admin;
              }

              return true;
            }),
          };
        }

        return item;
      });

    return (
      <>
        {allowedItems.map((item, index) => (
          <ItemSidebar
            key={`key-${item.label}-${index}`}
            isExpand={isExpand}
            item={item}
            setMethod={setIsShowSwitchOrganizationModal}
          />
        ))}
      </>
    );
  };

  const confirmSwitchOrganization = useCallback(
    (id: number) => {
      confirmDialog({
        message:
          "The page will be reload after switched to another organization. Are you sure you want to do this?",
        onSubmit: () => {
          switchOrganization(id, () => {
            setIsShowSwitchOrganizationModal(false);
            window.location.href = "/dashboard/";
          });
        },
      });
    },
    [switchOrganization]
  );

  useEffect(() => {
    if (currentUser && currentUser.status === "actived") {
      return;
    }

    if (currentUser && currentUser.status !== "actived") {
      const myOrgs = organizations.filter(
        (item) => item.id !== user?.active_organization
      );
      const canBeCreateNewOrg = myOrgs.every(
        (item) => item.status !== "actived"
      );

      if (canBeCreateNewOrg) {
        confirmDialog({
          title: "Information",
          message:
            "You do not have any available organizations, the system will transfer the user to a new organization!",
          className: "c-modal__confirm-switch-org",
          closeOnOverlayClick: false,
          displayClose: false,
          onSubmit: () => {
            const title = generateRandomText(12);
            const ar = api.call("adminOrgCreate", {
              params:
                newOrganization.id > 0
                  ? { id: newOrganization.id.toString() }
                  : {},
              body: {
                ...newOrganization,
                title: title,
                token:
                  newOrganization?.token ??
                  Math.random().toString().substring(2, 6),
                team_id:
                  newOrganization?.team_id ??
                  Math.random().toString().substring(2, 6),
                status: "actived",
              },
            });

            ar.promise.then(async (res) => {
              if (res.ok) {
                const data = await res.json();
                const ar = inviteByEmail(user?.email ?? "", data.id);

                ar.promise.then(async (r) => {
                  if (r.ok) {
                    switchOrganization(data.id, () => {
                      setIsShowSwitchOrganizationModal(false);
                      window.location.href = "/dashboard/";
                    });
                  }
                  return false;
                });
              }
            });
          },
          cancelText: "",
        });
      } else {
        const totalAvailableOrgs = myOrgs.filter(
          (item) => item.status === "actived"
        ).length;

        confirmDialog({
          message: `your organization is deactive. Use have ${totalAvailableOrgs} available org, let start!`,
          className: "c-modal__confirm-switch-org",
          onSubmit: () => {
            setIsShowSwitchOrganizationModal(true);
          },
        });
      }
    }
  }, [
    api,
    user,
    organizations,
    currentUser,
    save,
    confirmSwitchOrganization,
    switchOrganization,
    inviteByEmail
  ]);

  const tooltips = sidebarItemsWithId.filter(i => !!i.description).map(i => (
    <Tooltip key={i.id} id={i.id} />
  ));

  return (
    <Fragment>
      {isExpand &&
        <div className="c-sidebar">
          <div className="c-sidebar__top">
            <ul className="c-sidebar__list">
              {renderSidebarItems(sidebarItemsWithId)}
              {!isExpand &&
                <li
                  className="c-sidebar__item logout"
                  onClick={() => logout(true)}
                >
                  <IconLogout />
                  {isExpand ? "Logout" : ""}
                </li>
              }
            </ul>
          </div>
          <hr />
          {isExpand && (
            <div className="c-sidebar__bottom">
              <ul className="c-sidebar__list">
                <li className="c-sidebar__item logout" onClick={() => logout(true)}>
                  <div className="c-sidebar__item-content">
                    <IconLogout />
                    {isExpand ? "Logout" : ""}
                  </div>
                </li>
              </ul>
            </div>
          )}
          <SwitchOrganizationModal
            openModal={isShowSwitchOrganizationModal}
            setCloseModal={() => setIsShowSwitchOrganizationModal(false)}
            organizationsData={organizationsData.organizations}
            confirmSwitchOrganization={confirmSwitchOrganization}
            error={error}
          />
        </div>
      }
      {createPortal(tooltips, document.body)}
    </Fragment>
  );
}

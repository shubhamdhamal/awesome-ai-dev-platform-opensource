import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBook from "@/assets/icons/IconBook";
import IconDePoSit from "@/assets/icons/IconDePoSit";
import IconWithDraw from "@/assets/icons/IconWithDraw";
import Checkbox from "@/components/Checkbox/Checkbox";
import { useUserLayout } from "@/layouts/UserLayout";
// import Pagination from "./Pagination";
import "./index.scss";
import DepositModal from "./modal/DepositModal";
import WithdrawModal from "./modal/WithdrawModal";
import useUserPortfolio from "@/hooks/user/useUserPortfolio";
import {PRICE_FP, TOKEN_SYMBOL_DEFAULT} from "@/constants/projectConstants";
import Pagination from "@/components/Pagination/Pagination";
import {formatFloat} from "@/utils/customFormat";

const WalletPage = () => {
  const [page, setPage] = useState(1);
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const userLayout = useUserLayout();
  const navigate = useNavigate();
  const {balance} = useUserPortfolio(TOKEN_SYMBOL_DEFAULT);

  React.useEffect(() => {
    userLayout.setBreadcrumbs([{ label: "Payment" }]);
    userLayout.setCloseCallback("/projects");
    userLayout.setActions([
      // Todo: wait logic when click button
      {
        icon: <IconBook />,
        label: "Guidline: how to add your wallet?",
        onClick: () => 0,
      },
    ]);
    return () => {
      userLayout.clearBreadcrumbs();
      userLayout.clearCloseCallback();
      userLayout.clearActions();
    };
  }, [userLayout, navigate]);

  return (
    <div className="wallet-container">
      <div className="left-side">
        <div className="left-side-list">
          <div className="left-side-list-search">
            <input placeholder="Search asset" />
          </div>
          <div className="left-side-list-table">
            <table>
              <thead>
                <tr>
                  <th>
                    <Checkbox label="" size="sm" />
                  </th>
                  <th>Table Name</th>
                  <th style={{ width: "130px" }}>Status</th>
                  <th>Email</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>
                    <Checkbox label="" size="md" />
                  </td>
                  <td className="left-side-list-table__name">
                    <div>Mastercard **** 6442</div>
                    <div>Card payment</div>
                  </td>
                  <td className="left-side-list-table__status">
                    <span className="done">Done</span>
                  </td>
                  <td className="left-side-list-table__email">
                    <div>$99.00</div>
                    <div>Jan 17, 2022</div>
                  </td>
                  <td className="left-side-list-table__method">
                    <span>Bank </span>
                    <span>• Supporting text</span>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="left-side-pagination">
            <Pagination
              total={6548}
              page={page}
              pageSize={10}
              setPage={setPage}
              target="user/wallet"
            />
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-price">
          <div className="right-side-price-earning right-side-price__frame">
            <div className="right-side-price__title">Total Earning</div>
            <div className="right-side-price__price">$0</div>
          </div>
        </div>
        <div className="right-side-currency-box">
          <div className="right-side-currency-box-price">
            <div className="right-side-currency-box-price-icon"></div>
            <div className="right-side-currency-box-price-content">
              <div className="right-side-currency-box-price-content-title">
                ${formatFloat(balance, PRICE_FP)}
              </div>
              <div className="right-side-currency-box-price-content-des">
                Your balance is equivalent
              </div>
            </div>
          </div>
          <div className="right-side-currency-box-bottom">
            <div
              className="right-side-currency-box-bottom-item"
              onClick={() => setOpenDepositModal(true)}
            >
              <IconDePoSit />
              <span>Deposit</span>
            </div>
            <div
              className="right-side-currency-box-bottom-item"
              onClick={() => setOpenWithdrawModal(true)}
            >
              <IconWithDraw />
              <span>Withdraw</span>
            </div>
          </div>
        </div>
      </div>
      <DepositModal open={openDepositModal} onCancel={setOpenDepositModal} />
      <WithdrawModal open={openWithdrawModal} onCancel={setOpenWithdrawModal} />
    </div>
  );
};

export default WalletPage;

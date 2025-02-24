import React, { useEffect, useMemo, useState } from 'react';
import "./Index.scss";
import Tab from './Tab';
import TabContent from './TabContent';
import IconArrowLeft from '../../assets/icons/IconArrowLeft';
import { SetURLSearchParams } from 'react-router-dom';

export type TabV2 = {
  label: string;
  content?: JSX.Element | string;
  key: number;
  netWorkId: number;
}

export type TabsProps = {
  tabs: TabV2[];
  setCurrentTab: React.Dispatch<React.SetStateAction<number | undefined>>,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
}

const TabContainer: React.FC<TabsProps> = ({ tabs, setCurrentTab, searchParams, setSearchParams }) => {
  const tabActive = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<number>(Number(tabActive));
  const [currentPage, setCurrentPage] = useState(0);
  const [tabFrom, setTabFrom] = useState<number>(tabs[0].key);
  const tabsPerPage = 5;

  const handleTabClick = (key: number, mlId: number) => {
    setActiveTab(mlId);
    setCurrentTab(mlId);
    setTabFrom(key);
    searchParams.set("tab", mlId.toString());
    setSearchParams(searchParams);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * tabsPerPage < tabs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTabs = useMemo(() => {
    return tabs.slice(currentPage * tabsPerPage, (currentPage + 1) * tabsPerPage);
  }, [currentPage, tabs]);

  useEffect(() => {
    searchParams.set("tab", tabActive ?? tabs[0].netWorkId.toString());
    setSearchParams(searchParams);
    setActiveTab(tabs[0].netWorkId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tab-container">
      <div className="tabs-heading">
        <div className="tabs">
          <button disabled={currentPage <= 0} className="nav-button left" onClick={handlePrevPage}>
            <IconArrowLeft width={14} height={14} />
          </button>
          {currentTabs.map((tab, index) => (
            <Tab
              key={`key-${tab.label}-${index}`}
              label={tab.label}
              isActive={activeTab === tab.netWorkId}
              onClick={() => handleTabClick(tab.key, tab.netWorkId)}
              tabId={index}
            />
          ))}
          <button
            disabled={(currentPage + 1) * tabsPerPage >= tabs.length}
            className="nav-button right"
            onClick={handleNextPage}
          >
            <IconArrowLeft width={14} height={14} />
          </button>
        </div>
        <div className="tabs-heading__page">
          {`${tabFrom} - ${tabs.length}`}
        </div>
      </div>
      {tabs.map((tab, index) => (
        <TabContent
          key={`key-${tab.label}-${index}`}
          label={tab.label}
          content={tab.content}
          isActive={activeTab === tab.netWorkId}
        />
      ))}
    </div>
  );
};

export default TabContainer;

import React, { ReactNode, useState } from 'react';

interface TabsProps {
  defaultValue?: string;
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || '');

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, activeTab, setActiveTab }) => {
  return (
    <button
      className={`tab-trigger ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  activeTab: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, activeTab }) => {
  return activeTab === value ? <div className="tab-content">{children}</div> : null;
};

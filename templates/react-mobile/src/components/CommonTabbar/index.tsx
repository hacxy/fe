import type { IRouteConfig } from '../../routes/config';
import { TabBar } from 'antd-mobile';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { routeConfig } from '../../routes/config';

const CommonTabbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickTabItem = (route: IRouteConfig) => {
    if (route.path) {
      navigate(route.path, { replace: true });
    }
  };

  return (
    <div style={{ flexShrink: 0 }}>
      <TabBar activeKey={pathname}>
        {routeConfig.map(item => {
          return (
            <TabBar.Item
              icon={item.icon}
              key={item.path}
              title={item.name}
              onClick={() => handleClickTabItem(item)}
            />
          );
        })}
      </TabBar>
    </div>
  );
};

export default CommonTabbar;

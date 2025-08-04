import type { IRouteConfig } from '../../routes/config';
import React, { memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { routeConfig } from '../../routes/config';

const CommonTabbar: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(
    routeConfig.findIndex(item => item.path === location.pathname)
  );
  const handleClickTabItem = (route: IRouteConfig, index: number) => {
    setCurrent(index);
    navigate({ pathname: route.path });
  };

  return (
    <div style={{ flexShrink: 0 }}>
      <Tabbar fixed={false} value={current}>
        {routeConfig.map((item, index) => {
          return (
            <Tabbar.Item
              icon={item.icon}
              key={item.path}
              onClick={() => handleClickTabItem(item, index)}
            >
              {item.name}
            </Tabbar.Item>
          );
        })}
      </Tabbar>
    </div>
  );
});

export default CommonTabbar;

import { NavBar } from 'antd-mobile';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { routeConfig } from '../../routes/config';

const CommonNavBar: React.FC = () => {
  const location = useLocation();

  const pageName = useMemo(() => {
    const { name } = routeConfig.find(item => location.pathname.includes(item.path || '')) || {};
    return name;
  }, [location.pathname]);

  return (
    <div style={{ flexShrink: 0 }}>
      <NavBar>
        {pageName}
      </NavBar>
    </div>
  );
};

export default CommonNavBar;

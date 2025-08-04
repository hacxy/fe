import React, { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar } from 'react-vant';
import { routeConfig } from '../../routes/config';

const CommonNavBar: React.FC = memo(() => {
  const location = useLocation();

  const pageName = useMemo(() => {
    const { name } = routeConfig.find(item => location.pathname.includes(item.path || '')) || {};
    return name;
  }, [location.pathname]);

  return (
    <div style={{ flexShrink: 0 }}>
      <NavBar title={pageName} leftArrow={false} />
    </div>
  );
});

export default CommonNavBar;

import type { RouteObject } from 'react-router';
import { AppstoreOutline, UserOutline } from 'antd-mobile-icons';
import Home from '../views/home';
import Profile from '../views/profile';

export type IRouteConfig = RouteObject & {
  name: string
  icon: JSX.Element
};

export const routeConfig: IRouteConfig[] = [
  {
    name: '首页',
    path: '/home',
    element: <Home />,
    icon: <AppstoreOutline />
  },
  {
    name: '我的',
    path: '/profile',
    element: <Profile />,
    icon: <UserOutline />
  }
];

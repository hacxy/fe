import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App.tsx';
import { routeConfig } from './config.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />
      },
      ...routeConfig
    ]
  }
]);

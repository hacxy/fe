import type { Router } from '@remix-run/router';
import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../App.tsx';
import { routeConfig } from './config.tsx';

export const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        loader: () => redirect('/home')
      },
      ...routeConfig
    ]
  }
]);

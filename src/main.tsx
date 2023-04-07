import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import App from './App';
import { AuthProvider } from './configuration/authentication/authentication';
import { DataProvider } from './configuration/data/database';
import './index.css';
const Login = lazy(() => import('./pages/authentication/login'));
const SignUp = lazy(() => import('./pages/authentication/signup'));
const Instances = lazy(() => import('./pages/instances/Instances'));
const AddInstance = lazy(() => import('./pages/instances/AddInstance'));
const ManageInstance = lazy(() => import('./pages/instances/ManageInstance'));
const ListInstances = lazy(() => import('./pages/instances/InstancesList'));
const User = lazy(() => import('./pages/user/user'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  }, 
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/instances",
    element: <Instances />,
    children: [
      {
        path: "",
        element: <ListInstances />
      },
      {
        path: "add",
        element: <AddInstance />
      },
      {
        path: "manage/:instanceId",
        element: <ManageInstance />
      }
    ]
  },
  {
    path: "/user",
    element: <User />
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <Suspense fallback={<div>Loading....</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
)

import { lazy } from 'react';

const FormElements = lazy(() => import('../Form/FormElements'));
const FormLayout = lazy(() => import('../Form/FormLayout'));
const Profile = lazy(() => import('../Profile'));
const RegisterUser = lazy(() => import('../RegisterUser'));
const Settings = lazy(() => import('../Settings'));
 

const coreRoutes = [

  {
    path: '/dashboard/profile',
    title: 'Profile',
    component: Profile,
  },
    
  {
    path: '/dashboard/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/dashboard/register',
    title: 'Register',
    component: RegisterUser,
  },
];

const routes = [...coreRoutes];
export default routes;

import { lazy } from 'react';

const FormElements = lazy(() => import('../Form/FormElements'));
const FormLayout = lazy(() => import('../Form/FormLayout'));
const Profile = lazy(() => import('../Profile'));
const RegisterUser = lazy(() => import('../RegisterUser'));
const Settings = lazy(() => import('../Settings'));
const Tables = lazy(() => import('../Tables'));


const coreRoutes = [

  {
    path: '/dashboard/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/dashboard/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/dashboard/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/dashboard/tables',
    title: 'Tables',
    component: Tables,
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

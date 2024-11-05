import { lazy } from 'react';
import AssignValidator from '../AssignValidator';
import VerifyUser from '../VerifyUser';
import RetrieveProfile from '../RetrieveProfile';

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
  {
    path: '/dashboard/verify-user',
    title: 'Verify User',
    component: VerifyUser,
  },
  {
    path: '/dashboard/assign-validator',
    title: 'Assign Validator',
    component: AssignValidator,
  },
  {
    path: '/dashboard/retrieve-profile',
    title: 'Retrieve Profile',
    component: RetrieveProfile,
  },
];

const routes = [...coreRoutes];
export default routes;

import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../components/Main/MainPage';
import Page404 from '../components/Page404';
import SignupForm from '../components/SignupForms/SignupForm';

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <MainPage/>
      },
      {
        path: '/signup',
        element: <SignupForm/>
      }
    ],
  },
  {
    path: '*',
    element: <Page404/>
  }

]);

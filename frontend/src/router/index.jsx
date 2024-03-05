import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../components/Main/MainPage';
import Page404 from '../components/Page404';

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <MainPage/>
      }
    ],
  },
  {
    path: '*',
    element: <Page404/>
  }

]);

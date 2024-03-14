import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../components/Main/MainPage';
import Page404 from '../components/Page404';
import SignupForm from '../components/SignupForms/SignupForm';
import ListingHub from '../components/Main/Vendor/Listings/ListingHub';
import ListingPage from '../components/ListingPage/ListingPage';
import ShopHub from '../components/Main/Vendor/Shops/ShopHub/ShopHub';
import { csrfFetch } from '../redux/csrf';
import CreateListingPage from '../components/Main/Vendor/Listings/CreateNewListingPage/CreateListingPage';
import MessageCenter from '../components/MessageCenter/MessageCenter';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/my-listings',
        element: <ListingHub />
      },
      {
        path: '/messages',
        element: <MessageCenter />
      },
      {
        path: '/listings',
        children: [
          {
            path: 'new',
            element: <CreateListingPage />
          },
          {
            path: ':id',
            element: <ListingPage />
          }
        ]
      },
      {
        path: '/my-shops',
        element: <ShopHub />,
      }
    ],
  },
  {
    path: '*',
    element: <Page404 />
  }

]);

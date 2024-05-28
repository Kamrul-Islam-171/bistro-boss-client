import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './Layout/MainLayout.jsx';
import Home from './Pages/Home/Home.jsx';
import Menu from './Pages/Menu/Menu.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Order from './Components/Order/Order.jsx';
import Login from './Pages/Login/Login.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';

import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import Dashbord from './Components/Dashbord/Dashbord.jsx';
import Cart from './Components/Cart/Cart.jsx';
import AllUser from './Components/Dashbord/AllUser.jsx';
import AddItems from './Components/Dashbord/AddItems.jsx';
import AdminRoute from './PrivateRoutes/AdminRoute.jsx';
import ManageItem from './Components/Dashbord/ManageItem/ManageItem.jsx';
import UpdateItem from './Components/Dashbord/UpdateItem/UpdateItem.jsx';
import Payment from './Components/Dashbord/Payment/Payment.jsx';
import PaymentHistory from './Components/Dashbord/PaymentHistory/PaymentHistory.jsx';
import UserHome from './Components/Dashbord/UserHome/UserHome.jsx';
import AdminHome from './Components/Dashbord/AdminHome/AdminHome.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'menu',
        element: <Menu></Menu>
      },
      // {
      //   path:'order',
      //   element:<Order></Order>
      // },
      {
        path: 'order/:category',
        element: <Order></Order>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path:'dashbord',
    element:<Dashbord></Dashbord>,
    children:[
      {
        path:'cart',
        element:<Cart></Cart>
      },
      {
        path:'userHome',
        element:<UserHome></UserHome>
      },
      {
        path:'payment',
        element:<Payment></Payment>
      },
      {
        path:'allUsers',
        element:<AdminRoute><AllUser></AllUser></AdminRoute>
      },
      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'addItems',
        element:<AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path:'manageItems',
        element:<AdminRoute><ManageItem></ManageItem></AdminRoute>
      },
      {
        path:'update/:id',
        element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>
      },
      {
        path:'paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)

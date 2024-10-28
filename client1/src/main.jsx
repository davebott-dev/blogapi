import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from './routes/Root.jsx';
import Index from './Index.jsx';
import ErrorPage from './errorpage.jsx';
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';
import Posts from './routes/Posts.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index:true,
        element: <Index/>
      },
      {
        path:'/register',
        element: <Register/>,
      },
      {
        path:'/login',
        element: <Login/>,
      },
      {
        path: '/posts',
        element: <Posts/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)

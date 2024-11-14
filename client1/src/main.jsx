import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from './routes/Root.jsx';
import Index from './Index.jsx';
import ErrorPage from './errorpage.jsx';
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';
import Posts from './routes/Posts.jsx';
import Profile from './routes/Profile.jsx';
import Editor from './routes/Editor.jsx';

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
        errorElement: <ErrorPage/>,
      },
      {
        path: '/posts',
        element: <Posts/>,
      },
      {
        path: '/profile',
        element:<Profile/>,
      },
      {
        path: '/create',
        element: <Editor/>,
      }
    ]
  }
])
//add a route param for profile so that i can include viewing others profiles based on user id
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)

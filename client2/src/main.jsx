import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from './routes/Root.jsx';
import Index from './Index.jsx';
import ErrorPage from './errorpage.jsx';
import Home from './routes/Home.jsx';
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
        path:'/home',
        element: <Home/>,
      },
      {
        path: '/posts',
        element: <Editor/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from './routes/Root.jsx';
import Index from './Index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <p>Bad path</p>,
    children: [
      {
        index:true,
        element: <Index/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)

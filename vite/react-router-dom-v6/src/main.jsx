import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root,{loader as rootLoader} from './routes/root.jsx'
import { Reset } from 'styled-reset'
import ErrorPage from './error-page'
import Contact from './routes/contact'



const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root/>,
      errorElement:<ErrorPage/>,
      loader : rootLoader,
      children: [
        {
          path: 'contacts/:contactId',
          element:<Contact/>,
          
        },
      ],
    },
    
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Reset/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

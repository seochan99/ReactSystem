import React from 'react'
import ReactDOM from 'react-dom/client'
import Worldcup from './Worldcup.jsx'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import About from './about.jsx'
import Misae from './Misae.jsx'
import { RecoilRoot } from 'recoil'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root/>,
      // element를 레이아웃으로 설정한 후 Outlet을 레이아웃에 넣어준다.
      errorElement: <div>ㅁㄹㅋㅋ</div>,
      children: [
        {
          path: 'login',
          element: <div>로그인</div>,
        },
        {
          path: 'worldcup',
          element: <Worldcup/>,
        },
        {
          path: 'about',
          element: <About/>,
        },
        {
          path: 'misae',
          element: <Misae/>,
        },
        {
          path: 'user/:id',
          element: <div>유저</div>,
        },
        {
          path:"*",
          element: <div>404</div>,
        },

      ]
    }
  ]

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
    <RouterProvider router={router}/>
    </RecoilRoot>
  </React.StrictMode>,
)

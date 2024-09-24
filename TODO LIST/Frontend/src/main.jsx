import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Login from "../src/container/Authentication/Login.jsx"
import Register from "../src/container/Authentication/Register/Register.jsx"
import Error from "../src/container/Error/Error.jsx"
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>,
    errorElement:<Error/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/home",
    element: <App/>,
    errorElement:<Error/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className='w-full mt-20'>
        <Outlet />  
      </div>

    </div>
  )
}

export default Layout
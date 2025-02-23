'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { routes } from '@/app/utils/routes'
import { useRouter } from 'next/navigation'

export default function Layout({ children }) {

  const router = useRouter()

  const [token, setToken] = useState('token')

  const getToken = () => {
    setToken(localStorage.getItem('token'))
  }

  const redirect = () => {
    if (!token) {
        router.push(routes.SIGNIN)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    redirect()
  }, [token])

  return (
    <>
    <div className='flex'>
        <Sidebar/>
        <div className='py-[20px] ml-[255px] w-full min-h-screen'>
          {children}
        </div>
    </div> 
    </>
  )
}

'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import OrderTable from '../Components/OrderTable'
import { getAllOrders } from '../apiService'
import { toast } from 'react-toastify'

export default function Page() {

  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    // setLoading(true)
    try {
      const response = await getAllOrders()
      console.log(response.data);
      setOrders(response?.data)
    } catch (error) {
      toast.error('Category not available')
    } finally {
      // setLoading(false)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
        <Layout>
          <OrderTable
            orders={orders}
          />
        </Layout>
    </>
  )
}

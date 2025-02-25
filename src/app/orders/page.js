'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import OrderTable from '../Components/OrderTable'
import { getAllOrders, updateOrders } from '../apiService'
import { toast } from 'react-toastify'

export default function Page() {

  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    // setLoading(true)
    try {
      const response = await getAllOrders()
      setOrders(response?.data)
    } catch (error) {
      toast.error('Category not available')
    } finally {
      // setLoading(false)
    }
  }

  const updateStatus = async(e, orderId, i) => {    
    const payload = {status: e.target.value}
    // setLoading(true)
    try {
      const response = await updateOrders(payload, orderId)
      const updatedOrder = [...orders]
      updatedOrder[i].status = e.target.value
      setOrders(updatedOrder)
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
            updateStatus={(e, orderId, i) => updateStatus(e, orderId, i)}
          />
        </Layout>
    </>
  )
}

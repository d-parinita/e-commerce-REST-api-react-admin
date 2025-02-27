'use client'
import { getProductById } from '@/app/apiService'
import AddProductForm from '@/app/Components/AddProductForm'
import Layout from '@/app/Components/Layout'
import { useLoader } from '@/app/context/LoaderContext'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Page({params}) {

    const {id} = use(params)
    const { setLoading } = useLoader()
    
    const [products, setProducts] = useState([])

    const getProduct = async () => {
      setLoading(true)
      try {
        const response = await getProductById(id)        
        setProducts(response?.data?.data)
      } catch (error) {
        toast.error('Product not available')
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      getProduct()
    }, [])

  return (
    <>
        <Layout>
            <AddProductForm
                product={products}
                isEdit={true}
            />
        </Layout>
    </>
  )
}

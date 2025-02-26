'use client'
import AddProductForm from '@/app/Components/AddProductForm'
import Layout from '@/app/Components/Layout'
import React, { useState } from 'react'

export default function Page({params}) {

    const {id} = use(params)

    const [product, setProduct] = useState([])



  return (
    <>
        <Layout>
            <AddProductForm
                product={product}
                isEdit={true}
            />
        </Layout>
    </>
  )
}

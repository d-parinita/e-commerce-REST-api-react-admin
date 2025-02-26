'use client'
import { getCategories } from '@/app/apiService'
import AddCategoryForm from '@/app/Components/AddCategoryForm'
import Layout from '@/app/Components/Layout'
import React, { use, useEffect, useState } from 'react'

export default function Page({params}) {

    const {id} = use(params)
    const [categories, setCategories] = useState([])

    const getCategoriesData = async () => {
        // setLoading(true)
        try {
            const response = await getCategories()
            console.log(response.data.data);
            const category = response?.data?.data.find((item) => item._id == id)
            setCategories(category)
        } catch (error) {
            toast.error('Category not available')
        } finally {
            // setLoading(false)
        }
    }  

    useEffect(() => {
        getCategoriesData()
    }, [])

  return (
    <>
        <Layout>
            <AddCategoryForm
                category={categories}
                isEdit={true}
            />
        </Layout>
    </>
  )
}

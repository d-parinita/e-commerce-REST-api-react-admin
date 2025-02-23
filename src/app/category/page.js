'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Layout from '../Components/Layout';
import { deleteCategory, getCategories } from '../apiService';
import { toast } from 'react-toastify';
import CategoryCard from '../Components/CategoryCard';
import Link from 'next/link';
import { routes } from '../utils/routes';

export default function Page() {
  
  // const { setLoading } = useLoader()

  const [categories, setCategories] = useState([])

  const getCategoriesData = async() => {
    // setLoading(true)
    try {
      const response = await getCategories()
      setCategories(response?.data?.data)
    } catch (error) {
      toast.error('Category not available')
    } finally {
      // setLoading(false)
    }
  }

  const deleteCategories = async(id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) return
    // setLoading(true)
    try {
      const response = await deleteCategory(id)
      const newCategory = categories.filter((category) => category._id != id)
      setCategories(newCategory)
    } catch (error) {
      toast.error('Category not deleted')
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
        <div className='pl-20 pt-14'> 
          <div className="grid grid-cols-7 gap-6">
            <Link href={routes.CATEGORYFORMPAGE}>
              <div className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition">
                <FaPlus className="w-8 h-8 text-gray-200" />
                <p className="text-gray-200 text-xs mt-2">Add New Category</p>
              </div>
            </Link>
              {categories?.map((category) => (
                <Fragment key={category._id}>
                    <CategoryCard
                      imgUrl={category.imageUrl}
                      title={category.name}
                      onClick={() => deleteCategories(category._id)}
                    />
                </Fragment>
              ))}
          </div>
        </div>
    </Layout>
    </>
  )
}

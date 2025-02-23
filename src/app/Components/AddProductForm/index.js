'use client'
import { getCategories } from '@/app/apiService'
import { routes } from '@/app/utils/routes'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddProductForm() {

  const router = useRouter()
  // const { setLoading } = useLoader()

  const [data, setData] = useState({
    title: '',
    summary: '',
    desc: '',
    images: [],
    quantity: '',
    featured: '',
    category: '',
    sizes: [] 
  })
  const [categories, setCategories] = useState([])
  
  const getCategoriesData = async () => {
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

  useEffect(() => {
    getCategoriesData()
  }, [])

  return (
    <>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title:</label>
          <input 
            type="text" 
            onChange={(e) => setData({...data, title: e.target.value})}
            placeholder="Enter product title..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Summary:</label>
          <input 
            type="text" 
            onChange={(e) => setData({...data, summary: e.target.value})}
            placeholder="Short summary of the product..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Description:</label>
          <textarea 
            placeholder="Enter full product description..." 
            onChange={(e) => setData({...data, desc: e.target.value})}
            rows="4"
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Upload Images:</label>
          <input 
            type="file" 
            multiple
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:text-sm file:bg-gray-800 file:text-white hover:file:bg-gray-900"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Quantity:</label>
            <input 
              type="number" 
              onChange={(e) => setData({...data, quantity: e.target.value})}
              min="1"
              placeholder="Enter quantity..." 
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Featured Product:</label>
            <select 
              onChange={(e) => setData({...data, featured: e.target.value})}
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Select Category:</label>
          <select 
            onChange={(e) => setData({...data, category: e.target.value})}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          >
            {categories?.map((category) => (
              <Fragment key={category._id}>
                <option value={category._id}>{category.name}</option>
              </Fragment>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Price:</label>
          <input 
            type="number" 
            min="1"
            placeholder="Enter price..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Select Size:</label>
          <select className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none">
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>
        <button className="w-full bg-lime-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-lime-600 transition">
          Add Product
        </button>
      </form>
    </div>  
    </>
  )
}

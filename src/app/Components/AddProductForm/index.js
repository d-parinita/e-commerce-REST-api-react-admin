'use client'
import { getCategories, getPresignUrl } from '@/app/apiService'
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
  const [selectedSizes, setSelectedSizes] = useState([])
  const [img, setImg] = useState([])
  const [presignData, setPresignData] = useState({
      bucketName: 'ecom-store-products',
      fileName: ''
    })
    const [file, setFile] = useState(null)
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImg((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files]
    }))
  }

  // const addProduct = () => {
  //   for (let i = 0; i < img.length; i++) {
  //     getPresignUrl(presignData).then((response) => {
          
  //     })
  //   }
  // }

  const handleSizeChange = (i, field, value) => {
    const updatedSizes = [...selectedSizes]
    updatedSizes[i][field] = value
    setSelectedSizes(updatedSizes)
    setData({ ...data, sizes: updatedSizes })
  }

  const addSize = () => {
    setSelectedSizes([...selectedSizes, { name: '', price: '' }])
  }

  useEffect(() => {
    getCategoriesData()
  }, [])

  useEffect(() => {
    console.log(data);
    
  }, [data])

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
            accept="image/*"
            onChange={handleImageUpload} 
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
              <option value={true}>Select feature...</option>
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
            <option value='select'>Select category...</option>
            {categories?.map((category) => (
              <Fragment key={category._id}>
                <option value={category._id}>{category.name}</option>
              </Fragment>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Sizes & Prices:</label>
          {selectedSizes.map((size, i) => (
            <div key={i} className="flex space-x-2 mb-2">
              <input 
                type="text" 
                placeholder="Enter Size" 
                value={size.name} 
                onChange={(e) => handleSizeChange(i, 'name', e.target.value)} 
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none" 
              />
              <input 
                type="number" 
                placeholder="Enter Price" 
                value={size.price} 
                min="1" 
                onChange={(e) => handleSizeChange(i, 'price', e.target.value)} 
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none" 
              />
            </div>
          ))}
          <button type="button" onClick={addSize} className="bg-lime-500 text-white py-1 px-4 rounded-md">+ Add Size</button>
        </div>
        <button className="w-full bg-lime-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-lime-600 transition">
          Add Product
        </button>
      </form>
    </div>  
    </>
  )
}

'use client'
import { addProducts, getCategories, getPresignUrl, updateProducts, uploadImg } from '@/app/apiService'
import { routes } from '@/app/utils/routes'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddProductForm({product, isEdit}) {

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
      images: Array.isArray(prevData?.images) ? [...prevData.images, ...files] : [...files]
    }))
  }

  const addProduct = (e) => {
    e.preventDefault()
    const urls = []
    for (let i = 0; i < img?.images?.length; i++) {
      const payload = {
        bucketName: 'ecom-store-products',
        fileName: img?.images[i]?.name
      }
      getPresignUrl(payload).then((response) => {
        const formattedUrl = response?.data?.url.split('?')[0]
        urls.push(formattedUrl)
        uploadImg(img?.images[i], formattedUrl, img?.images[i]?.type).then((res) => {
          const productPayload = {...data, images: urls}
          if (i == img?.images?.length - 1) {
            addProducts(productPayload).then((result) => {
              router.push(routes.PRODUCT)
            }).catch((error) => {
                toast.error('Some error in adding data!')
            })
          }
        }).catch((error) => {
            toast.error('Some error in adding data!')
        })
      }).catch((error) => {
          toast.error('Some error in adding data!')
      })
    }
  }

  const updateProduct = (e) => {
    e.preventDefault()
    const urls = []
    for (let i = 0; i < img?.images?.length; i++) {
      const payload = {
        bucketName: 'ecom-store-products',
        fileName: img?.images[i]?.name
      }
      getPresignUrl(payload).then((response) => {
        const formattedUrl = response?.data?.url.split('?')[0]
        urls.push(formattedUrl)
        uploadImg(img?.images[i], formattedUrl, img?.images[i]?.type).then((res) => {
          const productPayload = {...data, images: urls}
          if (i == img?.images?.length - 1) {
            updateProducts(product._id, productPayload).then((result) => {
              router.push(routes.PRODUCT)
            }).catch((error) => {
                toast.error('Some error in adding data!')
            })
          }
        }).catch((error) => {
            toast.error('Some error in adding data!')
        })
      }).catch((error) => {
          toast.error('Some error in adding data!')
      })
    }
  }

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
    setData({
      title: product?.title,
      summary: product?.summary,
      desc: product?.desc,
      quantity: product?.quantity,
      featured: product?.featured,
      category: product?.category,
    })
  }, [product])

  return (
    <>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form onSubmit={(e) => isEdit ? updateProduct(e) : addProduct(e)} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title:</label>
          <input 
            type="text" 
            onChange={(e) => setData({...data, title: e.target.value})}
            value={data.title}
            placeholder="Enter product title..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Summary:</label>
          <input 
            type="text" 
            onChange={(e) => setData({...data, summary: e.target.value})}
            value={data.summary}
            placeholder="Short summary of the product..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Description:</label>
          <textarea 
            placeholder="Enter full product description..." 
            onChange={(e) => setData({...data, desc: e.target.value})}
            value={data.desc}
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
              value={data.quantity}
              min="1"
              placeholder="Enter quantity..." 
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Featured Product:</label>
            <select 
              onChange={(e) => setData({...data, featured: e.target.value})}
              value={data.featured}
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
            value={data.category}
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
          {isEdit ? 'Edit' : 'Add'} Product
        </button>
      </form>
    </div>  
    </>
  )
}

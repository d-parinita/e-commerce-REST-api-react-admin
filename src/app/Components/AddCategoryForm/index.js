'use client'
import { addCategory, getPresignUrl, updateCategories, uploadImg } from '@/app/apiService'
import { useLoader } from '@/app/context/LoaderContext'
import { routes } from '@/app/utils/routes'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddCategoryForm({category, isEdit}) {

  const router = useRouter()
  const { setLoading } = useLoader()

  const [name, setName] = useState('')
  const [url, setUrl] = useState(null)
  const [presignData, setPresignData] = useState({
    bucketName: 'ecom-store-categories',
    fileName: ''
  })
  const [file, setFile] = useState(null)

  const handleImageChange = (e) => {
    const value = e.target.files[0]
    setPresignData({...presignData, fileName: value.name})
    setFile(value)
  }

  const addData = (e) => {
    e.preventDefault()
    setLoading(true)
    getPresignUrl(presignData).then((response) => {
      const formattedUrl = response?.data?.url.split('?')[0]
      uploadImg(file, response?.data?.url, file.type).then((res) => {
        const payload = {
          name: name,
          imageUrl: formattedUrl
        }
        addCategory(payload).then((result) => {
          setLoading(false)
          router.push(routes.CATEGORY)
        }).catch((error) => {
          toast.error('Some error in adding data!')
          setLoading(false)
        })
      }).catch((error) => {
        toast.error('Some error in adding data!')
        setLoading(false)
      })
    }).catch((error) => {
      toast.error('Some error in adding data!')
      setLoading(false)
    })
  }

  const updateData = (e) => {
    e.preventDefault()
    setLoading(true)
    getPresignUrl(presignData).then((response) => {
      const formattedUrl = response?.data?.url.split('?')[0]
      uploadImg(file, response?.data?.url, file.type).then((res) => {
        const payload = {
          name: name,
          imageUrl: formattedUrl
        }
        updateCategories(category._id, payload).then((result) => {
          setLoading(false)
          router.push(routes.CATEGORY)
        }).catch((error) => {
          toast.error('Some error in adding data!')
          setLoading(false)
        })
      }).catch((error) => {
        toast.error('Some error in adding data!')
        setLoading(false)
      })
    }).catch((error) => {
      toast.error('Some error in adding data!')
      setLoading(false)
    })
  }

  useEffect(() => {
    setName(category?.name)
    setUrl(category?.imageUrl)
  }, [category])

  return (
    <>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add new Category</h2>
      
      <form onSubmit={(e) => isEdit ? updateData(e) : addData(e)} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title:</label>
          <input 
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text" 
            placeholder="Enter title..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Upload Image:</label>
          <input 
            onChange={handleImageChange}
            accept="image/*"
            type="file" 
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:text-sm file:bg-gray-800 file:text-white hover:file:bg-gray-900"
          />
          {isEdit ? (<>
            <div className="w-16 h-16 my-4 overflow-hidden rounded-lg">
              <img src={url} alt="Description" className="w-full h-full object-cover"/>
            </div>
          </>) : ''} 
        </div>        
        <button className="w-full bg-lime-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-lime-600 transition">
          {isEdit ? 'Edit' : 'Add'} Category
        </button>
      </form>
    </div>
    </>
  )
}

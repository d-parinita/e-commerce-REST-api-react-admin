'use client'
import React, { Fragment, use, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Layout from '../Components/Layout';
import { getProducts } from '../apiService';
import { toast } from 'react-toastify';
import ProductCard from '../Components/ProductCard';
import { getPrice } from '../utils/commonFunc';

export default function Page({params}) {

  const { id } = use(params) 
  // const { setLoading } = useLoader()

  const [products, setProducts] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [currentPageNo, setCurrentPageNo] = useState(1)

  const getProduct = async() => {
    // setLoading(true)
    const preparePayload = `pageNumber=${currentPageNo}&limit=50`
      try {
          const response = await getProducts(preparePayload)
          setProducts(response?.data?.products)
          setHasNextPage(response?.data?.hasNextPage)
      } catch (error) {
          toast.error('Product not available')
      } finally {
        // setLoading(false)
      }
  }

  useEffect(() => {
    getProduct()
  }, [currentPageNo])

  return (
    <>
    <Layout>
        <div className='pl-20 pt-14'>
          <div className="grid grid-cols-5 gap-6">
            <div className="w-[215px] h-[350px] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition">
              <FaPlus className="w-10 h-10 text-gray-200" />
              <p className="text-gray-200 font-medium mt-2">Add New Product</p>
            </div>
            {products?.map((item, i) => (
              <Fragment key={item._id}>
                  <ProductCard
                    img={item.images[0]}
                    title={item.title}
                    price={getPrice(item.sizes)}
                    summary={item.summary}
                  />
              </Fragment>
            ))}
          </div>
          <div className="flex justify-center space-x-2 py-12">
            {currentPageNo > 1 ? (
              <button onClick={() => setCurrentPageNo(currentPageNo - 1)} className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 transition">
                &lt; Previous
              </button>
            ) : ''}
            {hasNextPage ? (
              <button onClick={() => setCurrentPageNo(currentPageNo + 1)} className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 transition">
                Next &gt;
              </button>
            ) : ''}
          </div>
        </div>
    </Layout>
    </>
  )
}

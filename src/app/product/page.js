'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Layout from '../Components/Layout';
import { deleteProduct, getProducts } from '../apiService';
import { toast } from 'react-toastify';
import ProductCard from '../Components/ProductCard';
import { getPrice } from '../utils/commonFunc';
import Link from 'next/link';
import { routes } from '../utils/routes';

export default function Page() {

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

  const deleteProducts = async(id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) return
    // setLoading(true)
    try {
      const response = await deleteProduct(id)
      const newProduct = products.filter((product) => product._id != id)
      setProducts(newProduct)
    } catch (error) {
      toast.error('Product not deleted')
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
        <div className='px-20 pt-14'>
          <div className="grid grid-cols-4 gap-6">
            <Link href={routes.PRODUCTFORMPAGE}>
              <div className="w-[215px] h-[350px] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition">
                <FaPlus className="w-10 h-10 text-gray-200" />
                <p className="text-gray-200 font-medium mt-2">Add New Product</p>
              </div>
            </Link>
            {products?.map((item) => (
              <Fragment key={item._id}>
                  <ProductCard
                    img={item.images[0]}
                    title={item.title}
                    price={getPrice(item.sizes)}
                    summary={item.summary}
                    onClick={() => deleteProducts(item._id)}
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

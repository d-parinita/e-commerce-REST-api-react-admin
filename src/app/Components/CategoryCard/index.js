import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa"

export default function CategoryCard({ title, imgUrl, onClick }) {
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src={imgUrl}
            alt='women top'
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-white font-semibold text-md">
          {title}
        </span>
        <div className='flex space-x-2'>
          <button
            className="bg-blue-500 text-white p-1.5 rounded-full shadow-md hover:bg-blue-600 transition"
          >
            <FaEdit size={14} />
          </button>
          <button
            className="bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition"
            onClick={onClick}
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </>
  )
}
import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa"

export default function ProductCard({ title, summary, price, img, onClick, onEdit }) {
  return (
    <>
    <div className="bg-gray-800 shadow-lg w-[215px] h-[350px] hover:shadow-2xl">
      <div className="w-full h-[240px] overflow-hidden mb-4">
        <img
          src={img}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className='px-4 pb-4'>
        <div className='flex justify-between'>
          <h3 className="text-md font-bold text-white mb-1">{title}</h3>
          <div className='flex space-x-2'>
            <button
              className="bg-blue-500 text-white p-1.5 rounded-full shadow-md hover:bg-blue-600 transition"
              onClick={onEdit}
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
        <p className="text-sm text-gray-400 mb-2">
            {summary}
        </p>
        <p className="text-md font-semibold text-lime-400">Rs. {price}</p>
      </div>
    </div>
    </>
  )
}

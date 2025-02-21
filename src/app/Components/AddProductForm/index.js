import React from 'react'

export default function AddProductForm() {
  return (
    <>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title:</label>
          <input 
            type="text" 
            placeholder="Enter product title..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Summary:</label>
          <input 
            type="text" 
            placeholder="Short summary of the product..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Description:</label>
          <textarea 
            placeholder="Enter full product description..." 
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
              min="1"
              placeholder="Enter quantity..." 
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
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
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Featured Product:</label>
          <select className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Select Size:</label>
          <select className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none">
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Select Category:</label>
          <select className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none">
            <option>Men's Clothing</option>
            <option>Women's Clothing</option>
            <option>Kids' Clothing</option>
            <option>Accessories</option>
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

import React from 'react'

export default function AddCategoryForm() {
  return (
    <>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add new Category</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title:</label>
          <input 
            type="text" 
            placeholder="Enter title..." 
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Upload Image:</label>
          <input 
            type="file" 
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:text-sm file:bg-gray-800 file:text-white hover:file:bg-gray-900"
          />
        </div>        
        <button className="w-full bg-lime-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-lime-600 transition">
          Add Category
        </button>
      </form>
    </div>
    </>
  )
}

'use client'
import { signOut } from "@/app/apiService";
import { routes } from "@/app/utils/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function Sidebar() {

  const router = useRouter()

  const handleSignOut = async() => {
    // setLoading(true)
    try {
      const response = await signOut()
      toast.success('Sign out successfully')
      localStorage.clear()
      router.push(routes.SIGNIN)
    } catch (error) {
      toast.error(error.response?.data?.error)
    } finally {
      // setLoading(false)
    }
  }

  return (
    <div className="h-screen w-64 fixed bg-gray-900 text-white p-4 shadow-lg flex flex-col">
      <h2 className="text-xl font-bold text-center my-6">ShopEase</h2>

      <div className="space-y-4">
        <Link href={routes.CATEGORY} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
          <span>Categories</span>
        </Link>
        <Link href={routes.PRODUCT} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
          <span>Products</span>
        </Link>
        <Link href={routes.ORDERS} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
          <span>Orders</span>
        </Link>
      </div>

      <button onClick={handleSignOut} className="mt-8 border-2 border-gray-400 p-2 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
        Logout
      </button>
    </div>
  );
}

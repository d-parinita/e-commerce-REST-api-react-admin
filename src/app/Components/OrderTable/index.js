'use client'
import { ORDER_STATUS } from '@/app/utils/constVariable'
import React, { useState } from 'react'

export default function OrderTable({ orders, updateStatus }) {

    const getOrderStatusColor = (orderStatus) => {
        let color = ''
        if (orderStatus == ORDER_STATUS.RECEIVED) {
            color = 'bg-blue-500'
        } else if (orderStatus == ORDER_STATUS.PROCESSING || orderStatus == ORDER_STATUS.SHIPPED) {
            color = 'bg-yellow-500'
        } else if (orderStatus == ORDER_STATUS.DELIVERED) {
            color = 'bg-green-500'
        } else if (orderStatus == ORDER_STATUS.CANCELLED) {
            color = 'bg-red-500'
        }
        return color 
    }

    return (
        <>
            <div className="overflow-x-auto p-4">
                <table className="w-full border-collapse bg-gray-900 text-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-800 text-gray-300">
                            <th className="py-3 px-4 text-center">No. of Items</th>
                            <th className="py-3 px-4 text-left">Orders</th>
                            <th className="py-3 px-4 text-center">Quantity</th>
                            <th className="py-3 px-4 text-center">Amount</th>
                            <th className="py-3 px-4 text-center">Sizes</th>
                            <th className="py-3 px-4 text-center">Payment Mode</th>
                            <th className="py-3 px-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, i) => (
                            <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-800">
                                <td className="py-3 px-4 text-center">{order.products.length}</td>
                                <td className="py-4 px-4">
                                    <div className="space-y-3">
                                        {order.products.map((product) => (
                                            <div key={product._id}>
                                                <div className="font-medium">{product.title}</div>
                                                <div className="text-sm text-gray-400">{product.summary}</div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="space-y-3">
                                        {order.products.map((product) => (
                                            <div key={product._id} className="font-medium">{product.quantity}</div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="space-y-3">
                                        {order.products.map((product) => (
                                            <div key={product._id} className="font-medium">Rs. {product.amount}</div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="space-y-3">
                                        {order.products.map((product) => (
                                            <div key={product._id} className="font-medium">{product.size}</div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center">{order.paymentMode}</td>
                                <td className="py-3 px-4 text-center">
                                    <select onChange={(e) => updateStatus(e, order._id, i)} className="bg-gray-800 text-white text-sm mr-4 px-3 py-1 rounded-md border border-gray-600">
                                        <option value="Received">Received</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>{status}
                                    <span className={`${getOrderStatusColor(order.status)} text-white px-2 py-1 rounded-md text-xs`}>{order.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

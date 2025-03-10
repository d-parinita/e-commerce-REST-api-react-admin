
# E-Commerce Admin Project

## Overview

This project is a modern dynamic e-commerce admin frontend application built using Next.js, Tailwind CSS, and Context API for global state management. It provides a seamless user experience with optimized performance, responsive design and secure file uploads using AWS S3 pre-signed URLs.

## Technologies Used

**Next.js** - React framework for the frontend.

**Tailwind CSS** - Utility-first CSS framework for styling.

**AWS S3 Signed URL** - Secure file uploads using AWS S3 pre-signed URLs.

**REST API** - Communicates with the backend for fetching and managing data.

**Context API** - Handles global state management efficiently.

## Features

**User Authentication** - Secure login functionality.

**Product Catalog** - Displays, add and remove products.

**Categories Catalog** - Displays, add and remove categories.

**Order Management** - Users can view all orders and update order status.

**Image Uploads** - Uses AWS S3 signed URLs for secure image storage.

**Mobile Responsiveness** - Fully optimized for different screen sizes.

## Prerequisites for Setting Up the Project

### 1. Clone the Backend Repository

```sh
git clone https://github.com/babluroy/node.js-eCommerce-Backend.git
cd node.js-eCommerce-Backend 
```

### 2. Start the backend server by following the setup instructions from the backend repository.

Ensure the backend is running successfully.

### 3. Set Up the Frontend Environment Variables

In the frontend project, create a `.env.local` file and add the following environment variables:

```env
NEXT_PUBLIC_API_URL=<YOUR_BACKEND_URL>
NEXT_PUBLIC_RAZORPAY_TEST_KEY=<YOUR_RAZORPAY_TEST_KEY>
```

Replace `<YOUR_BACKEND_URL>` and `<YOUR_RAZORPAY_TEST_KEY>` with the actual values.

### 4. Install Dependencies and Start the Frontend

```sh
npm install
npm run dev
```

The application should now be running successfully.


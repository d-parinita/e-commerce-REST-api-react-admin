'use client'
import { useRouter } from "next/navigation";
import AddCategoryForm from "./Components/AddCategoryForm";
import AddProductForm from "./Components/AddProductForm";
import Layout from "./Components/Layout";
import { useEffect } from "react";
import { routes } from "./utils/routes";

export default function Home() {

  // const router = useRouter()

  // useEffect(() => {
  //   router.push(routes.SIGNIN)
  // }, [])

  return (
    <>
    <Layout>

    </Layout>
    </>
  );
}

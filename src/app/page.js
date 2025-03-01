'use client'
import { useEffect } from "react";
import Layout from "./Components/Layout";
import { routes } from "./utils/routes";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push(routes.CATEGORY)
  }, [])

  return (
    <>
    <Layout></Layout>
    </>
  );
}

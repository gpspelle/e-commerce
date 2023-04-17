import NavigationBar from "../components/NavigationBar/NavigationBar"
import HeroHeader from "../components/HeroHeader/HeroHeader"
import MemoizedProductContainer from "../components/Product/ProductContainer"
import Footer from "../components/Footer/Footer"
import React from "react"

export default function ProductsPage({ isDeals }) {
  return (
    <>
      <NavigationBar />
      <HeroHeader />
      <MemoizedProductContainer isDeals={isDeals} />
      <Footer />
    </>
  )
}

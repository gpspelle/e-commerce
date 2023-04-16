import React, { useState, useEffect, memo } from "react"
import { Spinner, Container } from "react-bootstrap"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

import {
  getProductsIdsByTagsFromDatabase,
  getSimilarProductsFromDatabase,
} from "../../../actions/database"
import "./SimilarProductsMobile.css"
import { convertProductFromDatabaseToProductEntity } from "../../../utils/convertProductFromDatabaseToProductEntity"
import Product from "../../Product/Product"

const SimilarProductsMobile = ({ id, tags }) => {
  const [items, setItems] = useState()
  const [similarProductsData, setSimilarProductsData] = useState({
    productsIds: [],
    products: [],
    productPagination: { key: undefined, fetch: false, isLoading: true },
  })

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
  }

  useEffect(() => {
    if (!similarProductsData.productPagination.fetch) {
      const components = similarProductsData.products.map((similarProduct) => {
        const productEntity = convertProductFromDatabaseToProductEntity({
          product: similarProduct,
        })
        return (
          <div key={similarProduct.id.S}>
            <Product
              productEntity={productEntity}
              phoneNumber={false}
              commercialName={false}
              productImageSize="120px"
              productCardSize="122px"
              isRelatedProduct={true}
            />
          </div>
        )
      })

      setItems(components)
    }
  }, [similarProductsData.products, similarProductsData.productPagination.fetch])

  useEffect(() => {
    if (similarProductsData.productPagination.fetch) {
      getSimilarProductsFromDatabase({
        similarProductsData,
        setSimilarProductsData,
        products: similarProductsData.products,
        productPagination: similarProductsData.productPagination,
        productsIds: similarProductsData.productsIds,
      })
    }
  }, [similarProductsData.productsIds, similarProductsData.productPagination.fetch])

  useEffect(() => {
    getProductsIdsByTagsFromDatabase({
      productId: id,
      tags,
      setSimilarProductsData,
    })
  }, [tags, id])

  return (
    <div
      className="similar-products"
      style={{ minHeight: "290px", marginBottom: "32px" }}
    >
      <Container style={{ minHeight: "290px" }}>
        <h6
          style={{ paddingTop: "32px", marginBottom: "16px" }}
          className="font-face-poppins-bold"
        >
          Produtos relacionados
        </h6>
        {similarProductsData.productPagination.isLoading ? (
          <div
            style={{
              height: "222.8px",
              display: "flex",
            }}
          >
            <Spinner
              style={{ margin: "auto", display: "flex" }}
              animation="border"
            />
          </div>
        ) : (
          <>
            {items.length > 0 ? (
              <AliceCarousel
                mouseTracking={true}
                items={items}
                responsive={responsive}
                controlsStrategy="responsive"
                disableButtonsControls={true}
                disableDotsControls={true}
                autoWidth
              />
            ) : (
              <p>Não foram encontrados produtos relacionados</p>
            )}
          </>
        )}
      </Container>
    </div>
  )
}

const MemoizedSimilarProductsMobile = memo(SimilarProductsMobile)
export default MemoizedSimilarProductsMobile

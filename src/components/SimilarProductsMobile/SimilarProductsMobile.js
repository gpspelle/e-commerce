import React, { useState, useEffect, memo } from "react"
import { Spinner, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad/ProgressiveBlurryImageLoad"
import scrollToTop from "../../utils/scrollToTop"
import {
  getProductsIdsByTagsFromDatabase,
  getSimilarProductsFromDatabase,
} from "../../actions/database"
import "./SimilarProductsMobile.css"
import { convertProductFromDatabaseToProductEntity } from "../../utils/convertProductFromDatabaseToProductEntity"

const SimilarProductsMobile = ({ id, tags }) => {
  const history = useHistory()
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
      const components = similarProductsData.products.map((similarProduct, i) => {
        const coverImage = similarProduct.PRODUCT_COVER_IMAGE?.S
        const firstImage = similarProduct.PRODUCT_IMAGES.L[0].S
        const productEntity = convertProductFromDatabaseToProductEntity({
          product: similarProduct,
        })
        return coverImage ? (
          <ProgressiveBlurryImageLoad
            width={128}
            height={128}
            small={`data:image/jpeg;base64,${coverImage}`}
            large={firstImage}
            onClick={() => openDetailPage(productEntity)}
            style={{
              cursor: "pointer",
              paddingRight:
                i === similarProductsData.products.lenght - 1 ? "0px" : "8px",
            }}
          />
        ) : (
          <img
            style={{
              width: 128,
              height: 128,
              cursor: "pointer",
              paddingRight:
                i === similarProductsData.products.lenght - 1 ? "0px" : "8px",
            }}
            src={firstImage}
            onClick={() => openDetailPage(similarProductJsonData)}
          />
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

  const openDetailPage = (state) => {
    scrollToTop()
    history.push({
      pathname: `/${state.id}/${PRODUCT_DESCRIPTION}`,
      state,
    })
  }

  return (
    <div className="similar-products" style={{ minHeight: "220px" }}>
      <Container>
        <h6
          style={{ paddingTop: "32px", marginBottom: "16px" }}
          className="font-face-poppins-bold"
        >
          Produtos relacionados
        </h6>
        {similarProductsData.productPagination.isLoading ? (
          <Spinner
            style={{ margin: "auto", display: "flex", color: "#212529" }}
            animation="border"
          />
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

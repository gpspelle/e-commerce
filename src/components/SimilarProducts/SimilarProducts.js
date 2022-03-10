import React, { useState, useEffect, memo } from "react"
import { Pagination, Container, Spinner } from "react-bootstrap"
import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import { useHistory } from "react-router-dom"

import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad/ProgressiveBlurryImageLoad"
import scrollToTop from "../../utils/scrollToTop"
import {
  getProductsIdsByTagsFromDatabase,
  getSimilarProductsFromDatabase,
} from "../../actions/database"
import "./SimilarProducts.css"
import { convertProductFromDatabaseToProductEntity } from "../../utils/convertProductFromDatabaseToProductEntity"

const SimilarProducts = ({ id, screenWidth, tags }) => {
  const history = useHistory()
  const numberOfVisibleSimilarProducts = parseInt(screenWidth / 150)
  const [similarProductsData, setSimilarProductsData] = useState({
    productsIds: [],
    products: [],
    productPagination: { key: undefined, fetch: false, isLoading: true },
  })
  const [positionSimilarProducts, setPositionSimilarProducts] = useState({
    start: 0,
    end: numberOfVisibleSimilarProducts,
  })

  useEffect(() => {
    if (
      screenWidth &&
      positionSimilarProducts.end !== numberOfVisibleSimilarProducts
    ) {
      setPositionSimilarProducts({ start: 0, end: numberOfVisibleSimilarProducts })
    }
  }, [screenWidth])

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

  const nextPagination = () => {
    var { start, end } = positionSimilarProducts

    if (
      start <
      similarProductsData.products.length - numberOfVisibleSimilarProducts
    ) {
      start = start + 1
      end = end + 1
    }

    setPositionSimilarProducts({ start, end })
  }

  const prevPagination = () => {
    var { start, end } = positionSimilarProducts

    if (start > 0) {
      start = start - 1
      end = end - 1
    }

    setPositionSimilarProducts({ start, end })
  }

  const { products, productPagination } = similarProductsData
  const { start, end } = positionSimilarProducts

  return (
    <div className="similar-products" style={{ minHeight: "220px" }}>
      <Container>
        <h4 style={{ paddingTop: "32px" }}>Produtos relacionados</h4>
        {productPagination.isLoading ? (
          <Spinner style={{ margin: "auto", display: "flex" }} animation="border" />
        ) : (
          <>
            {products.length > 0 ? (
              <Pagination size="sm">
                <Pagination.Prev
                  onClick={prevPagination}
                  style={{ position: "relative", margin: "auto" }}
                  disabled={start === 0}
                />
                {products.slice(start, end).map((similarProduct) => {
                  const coverImage = similarProduct.PRODUCT_COVER_IMAGE?.S
                  const firstImage = similarProduct.PRODUCT_IMAGES.L[0].S
                  const productEntity = convertProductFromDatabaseToProductEntity({
                    product: similarProduct,
                  })
                  return (
                    <Pagination.Item
                      style={{ position: "relative", margin: "auto" }}
                      key={similarProduct.id.S}
                      onClick={() => openDetailPage(productEntity)}
                    >
                      {coverImage ? (
                        <ProgressiveBlurryImageLoad
                          width={128}
                          height={128}
                          small={`data:image/jpeg;base64,${coverImage}`}
                          large={firstImage}
                        />
                      ) : (
                        <img style={{ width: 128, height: 128 }} src={firstImage} />
                      )}
                    </Pagination.Item>
                  )
                })}
                <Pagination.Next
                  onClick={nextPagination}
                  style={{ position: "relative", margin: "auto" }}
                  disabled={
                    end === products.length ||
                    products.length < numberOfVisibleSimilarProducts
                  }
                />
              </Pagination>
            ) : (
              <p>Não foram encontrados produtos similares</p>
            )}
          </>
        )}
      </Container>
    </div>
  )
}

const MemoizedSimilarProducts = memo(SimilarProducts)
export default MemoizedSimilarProducts

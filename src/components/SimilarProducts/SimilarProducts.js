import React, { useState, useEffect, memo } from "react"
import axios from "axios"
import { Pagination, Container, Spinner } from "react-bootstrap"
import {
  REST_API,
  PRODUCTS_ENDPOINT,
  TAGS_ENDPOINT,
  PRODUCT_DESCRIPTION,
} from "../../constants/constants"
import { useHistory } from "react-router-dom"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad.js/ProgressiveBlurryImageLoad"
import "./SimilarProducts.css"
import scrollToTop from "../../utils/scrollToTop"

const SimilarProducts = ({ id, screenWidth, tags }) => {
  const history = useHistory()
  const numberOfVisibleSimilarProducts = parseInt(screenWidth / 150)
  const [similarProductsData, setSimilarProductsData] = useState({
    productsIds: [],
    products: [],
    pagination: { key: undefined, fetch: true },
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
    const fetchProductsByIds = async () => {
      if (similarProductsData.productsIds.length > 0) {
        const body = {
          key: similarProductsData.pagination.key,
        }

        const config = {
          params: {
            body,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
        const response = await axios.get(`${REST_API}/${PRODUCTS_ENDPOINT}`, config)
        const { data, key } = response.data

        const products = data.filter((product) =>
          similarProductsData.productsIds.includes(product.id.S)
        )

        const productsFlat = products.flat(1)
        const concatProducts =
          similarProductsData.products.length > 0
            ? similarProductsData.products.concat(productsFlat)
            : productsFlat

        setSimilarProductsData({
          ...similarProductsData,
          products: concatProducts,
          pagination: { key, fetch: key ? true : false },
        })
      }
    }

    if (similarProductsData.pagination.fetch) {
      fetchProductsByIds()
    }
  }, [similarProductsData.productsIds, similarProductsData.pagination.fetch])

  useEffect(() => {
    const fetchProductIdsByTags = async () => {
      if (tags.length > 0) {
        const response = await axios.get(`${REST_API}/${TAGS_ENDPOINT}`)

        const sameTagProductIdsByTag = response.data.filter((productsByTag) =>
          tags.includes(productsByTag.TAG_NAME)
        )

        const sameTagProductIds = []
        sameTagProductIdsByTag.forEach((sameTagProductIdByTag) => {
          if (sameTagProductIdByTag.products) {
            sameTagProductIds.push(sameTagProductIdByTag.products)
          }
        })

        const sameTagProductIdsSet = new Set(sameTagProductIds.flat(1))
        sameTagProductIdsSet.delete(id)
        setSimilarProductsData({
          products: [],
          productsIds: [...sameTagProductIdsSet],
          pagination: { key: undefined, fetch: true },
        })
      }
    }

    fetchProductIdsByTags()
  }, [tags, id])

  const openDetailPage = ({
    id,
    name,
    description,
    price,
    images,
    tags,
    productOwnerId,
  }) => {
    scrollToTop()
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { id, name, description, price, images, tags, productOwnerId },
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

  const { products, productsIds, pagination } = similarProductsData

  if (productsIds.length === 0) {
    return <></>
  }

  const { start, end } = positionSimilarProducts

  return (
    <div className="similar-products" style={{ minHeight: "220px" }}>
      <Container>
        <hr
          style={{
            color: "gray",
            backgroundColor: "gray",
            height: 1,
          }}
        />
        <div className="my-4 mx-2">Produtos relacionados</div>
        {typeof numberOfVisibleSimilarProducts === undefined || pagination.fetch ? (
          <Spinner
            style={{ margin: "auto", display: "flex", color: "#212529" }}
            animation="border"
          />
        ) : (
          <Pagination size="sm">
            <Pagination.Prev
              onClick={prevPagination}
              style={{ position: "relative", margin: "auto" }}
              disabled={start === 0}
            />
            {products.slice(start, end).map((similarProduct) => {
              const coverImage = similarProduct.PRODUCT_COVER_IMAGE?.S
              const firstImage = similarProduct.PRODUCT_IMAGES.L[0].S
              return (
                <Pagination.Item
                  style={{ position: "relative", margin: "auto" }}
                  key={similarProduct.id.S}
                  onClick={() =>
                    openDetailPage({
                      id: similarProduct.id.S,
                      name: similarProduct.PRODUCT_NAME.S,
                      description: similarProduct.PRODUCT_DESCRIPTION.S,
                      price: similarProduct.PRODUCT_PRICE.N,
                      images: similarProduct.PRODUCT_IMAGES.L.map(
                        (image) => image.S
                      ),
                      productImagesResized:
                        similarProduct.PRODUCT_IMAGES_RESIZED?.L.map(
                          (image) => image.S
                        ),
                      tags: similarProduct.PRODUCT_TAGS
                        ? similarProduct.PRODUCT_TAGS.SS
                        : [],
                      productOwnerId: similarProduct.PRODUCT_OWNER_ID.S,
                      productType: similarProduct.PRODUCT_TYPE?.S,
                    })
                  }
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
        )}
      </Container>
    </div>
  )
}

const MemoizedSimilarProducts = memo(SimilarProducts)
export default MemoizedSimilarProducts

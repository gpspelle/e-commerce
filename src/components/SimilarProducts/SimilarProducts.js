import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, Pagination } from "react-bootstrap"
import {
  API,
  PRODUCTS_ENDPOINT,
  TAGS_ENDPOINT,
  PRODUCT_DESCRIPTION,
} from "../../constants/constants"
import { useHistory } from "react-router-dom"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export default function SimilarProducts({ tags }) {
  const history = useHistory()
  const { width } = useWindowDimensions()
  const [numberOfVisibleSimilarProducts, setNumberOfVisibleSimilarProducts] =
    useState()
  const [similarProductIds, setSimilarProductsIds] = useState()
  const [similarProducts, setSimilarProducts] = useState()
  const [positionSimilarProducts, setPositionSimilarProducts] = useState({
    start: 0,
    end: 0,
  })

  useEffect(() => {
    if (numberOfVisibleSimilarProducts) {
      setPositionSimilarProducts({ start: 0, end: numberOfVisibleSimilarProducts })
    }
  }, [numberOfVisibleSimilarProducts])

  useEffect(() => {
    const fetchProductsByIds = async () => {
      if (similarProductIds) {
        const response = await axios.get(`${API}/${PRODUCTS_ENDPOINT}`)

        const products = response.data.filter((product) =>
          similarProductIds.includes(product.id)
        )

        const productsFlat = products.flat(1)
        setSimilarProducts(productsFlat)
      }
    }

    fetchProductsByIds()
  }, [similarProductIds])

  useEffect(() => {
    const fetchProductIdsByTags = async () => {
      if (tags) {
        const response = await axios.get(`${API}/${TAGS_ENDPOINT}`)

        const sameTagProductIdsByTag = response.data.filter((productsByTag) =>
          tags.includes(productsByTag.TAG_NAME)
        )

        const sameTagProductIds = sameTagProductIdsByTag.map(
          (sameTagProductIdByTag) => sameTagProductIdByTag.products
        )

        const sameTagProductIdsSet = new Set(sameTagProductIds.flat(1))

        setSimilarProductsIds([...sameTagProductIdsSet])
      }
    }

    fetchProductIdsByTags()
  }, [tags])

  useEffect(() => {
    if (width) {
      setNumberOfVisibleSimilarProducts(parseInt((width - 130) / 114))
    }
  }, [width])

  const openDetailPage = (
    id,
    name,
    description,
    price,
    images,
    tags,
    productOwnerId
  ) => {
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { name, description, price, images, tags, productOwnerId },
    })
  }

  const firstPagination = () => {
    setPositionSimilarProducts({ start: 0, end: numberOfVisibleSimilarProducts })
  }

  const nextPagination = () => {
    var { start, end } = positionSimilarProducts

    if (start < similarProducts.length - numberOfVisibleSimilarProducts) {
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

  const lastPagination = () => {
    setPositionSimilarProducts({
      start: similarProducts.length - numberOfVisibleSimilarProducts,
      end: similarProducts.length,
    })
  }

  return (
    <Pagination size="sm">
      <Pagination.First onClick={firstPagination} />
      <Pagination.Prev onClick={prevPagination} />
      {similarProducts &&
        similarProducts
          .slice(positionSimilarProducts.start, positionSimilarProducts.end)
          .map((similarProduct, i) => (
            <Pagination.Item
              key={i}
              onClick={() =>
                openDetailPage(
                  similarProduct.id,
                  similarProduct.PRODUCT_NAME,
                  similarProduct.PRODUCT_DESCRIPTION,
                  similarProduct.PRODUCT_PRICE,
                  similarProduct.PRODUCT_IMAGES,
                  similarProduct.PRODUCT_TAGS,
                  similarProduct.PRODUCT_OWNER_ID
                )
              }
            >
              <Card style={{ width: "6rem" }}>
                <img
                  width="64px"
                  height="64px"
                  className="d-block w-100"
                  src={similarProduct.PRODUCT_IMAGES[0]}
                  alt={`produto similar ${i}`}
                />
              </Card>
            </Pagination.Item>
          ))}
      <Pagination.Next onClick={nextPagination} />
      <Pagination.Last onClick={lastPagination} />
    </Pagination>
  )
}

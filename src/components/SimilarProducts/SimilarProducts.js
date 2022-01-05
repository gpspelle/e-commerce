import React, { useState, useEffect } from "react"
import axios from "axios"
import { Pagination, Container, Spinner } from "react-bootstrap"
import {
  API,
  PRODUCTS_ENDPOINT,
  TAGS_ENDPOINT,
  PRODUCT_DESCRIPTION,
} from "../../constants/constants"
import { useHistory } from "react-router-dom"
import "./SimilarProducts.css"

export default function SimilarProducts({ id, screenWidth, tags }) {
  const history = useHistory()
  const [numberOfVisibleSimilarProducts, setNumberOfVisibleSimilarProducts] =
    useState()
  const [similarProductIds, setSimilarProductsIds] = useState()
  const [similarProducts, setSimilarProducts] = useState()
  const [positionSimilarProducts, setPositionSimilarProducts] = useState({
    start: 0,
    end: 0,
  })
  const [paginationToken, setPaginationToken] = useState(undefined)
  const [hasMoreDataToFetch, setHasMoreDataToFetch] = useState(true)

  useEffect(() => {
    if (numberOfVisibleSimilarProducts) {
      setPositionSimilarProducts({ start: 0, end: numberOfVisibleSimilarProducts })
    }
  }, [numberOfVisibleSimilarProducts])

  useEffect(() => {
    const fetchProductsByIds = async () => {
      if (similarProductIds) {
        const body = {
          key: paginationToken,
        }

        const config = {
          params: {
            body,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
        const response = await axios.get(`${API}/${PRODUCTS_ENDPOINT}`, config)
        const { data, key } = response.data
        const products = data.filter((product) =>
          similarProductIds.includes(product.id)
        )

        const productsFlat = products.flat(1)
        setSimilarProducts(productsFlat)
        setPaginationToken(key)
        setHasMoreDataToFetch(key ? true : false)
      }
    }

    if (hasMoreDataToFetch) {
      fetchProductsByIds()
    }
  }, [similarProductIds, paginationToken, hasMoreDataToFetch])

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
        sameTagProductIdsSet.delete(id)
        setSimilarProductsIds([...sameTagProductIdsSet])
      }
    }

    fetchProductIdsByTags()
  }, [tags])

  useEffect(() => {
    if (screenWidth) {
      setNumberOfVisibleSimilarProducts(parseInt(screenWidth / 150))
    }
  }, [screenWidth])

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

  if (!similarProducts || similarProducts.length === 0) {
    return <></>
  }

  const { start, end } = positionSimilarProducts
  console.log(start, end, similarProducts.length)
  console.log(similarProducts)
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
        {!numberOfVisibleSimilarProducts ? (
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
            {similarProducts &&
              similarProducts
                .slice(positionSimilarProducts.start, positionSimilarProducts.end)
                .map((similarProduct, i) => (
                  <Pagination.Item
                    style={{ position: "relative", margin: "auto" }}
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
                    <img
                      width="128px"
                      height="128px"
                      src={similarProduct.PRODUCT_IMAGES[0]}
                      alt={`produto similar ${i}`}
                    />
                  </Pagination.Item>
                ))}
            <Pagination.Next
              onClick={nextPagination}
              style={{ position: "relative", margin: "auto" }}
              disabled={
                end === similarProducts.length - 1 ||
                similarProducts.length < numberOfVisibleSimilarProducts
              }
            />
          </Pagination>
        )}
      </Container>
    </div>
  )
}

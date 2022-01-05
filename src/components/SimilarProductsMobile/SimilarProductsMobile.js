import React, { useState, useEffect } from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import { Spinner, Container } from "react-bootstrap"
import axios from "axios"
import {
  API,
  PRODUCTS_ENDPOINT,
  TAGS_ENDPOINT,
  PRODUCT_DESCRIPTION,
} from "../../constants/constants"
import { useHistory } from "react-router-dom"
import "./SimilarProductsMobile.css"

export default function SimilarProductsMobile({ id, screenWidth, tags }) {
  const history = useHistory()
  const [items, setItems] = useState()
  const [similarProductIds, setSimilarProductsIds] = useState()
  const [similarProducts, setSimilarProducts] = useState()
  const [paginationToken, setPaginationToken] = useState(undefined)
  const [hasMoreDataToFetch, setHasMoreDataToFetch] = useState(true)

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
  }

  useEffect(() => {
    if (similarProducts && !hasMoreDataToFetch) {
      const components = similarProducts?.map((product, i) => {
        return (
          <img
            className="item"
            key={i}
            src={product.PRODUCT_IMAGES[0]}
            style={{
              width: "128px",
              height: "128px",
              cursor: "pointer",
              paddingRight: i === similarProducts.lenght - 1 ? "0px" : "8px",
            }}
            onClick={() =>
              openDetailPage({
                id: product.id,
                name: product.PRODUCT_NAME,
                description: product.PRODUCT_DESCRIPTION,
                price: product.PRODUCT_PRICE,
                images: product.PRODUCT_IMAGES,
                tags: product.PRODUCT_TAGS,
                productOwnerId: product.PRODUCT_OWNER_ID,
              })
            }
          />
        )
      })
      setItems(components)
    }
  }, [similarProducts, hasMoreDataToFetch])

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

  const openDetailPage = ({
    id,
    name,
    description,
    price,
    images,
    tags,
    productOwnerId,
  }) => {
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { name, description, price, images, tags, productOwnerId },
    })
  }

  if (!items || items.length === 0) {
    return <></>
  }

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
        {!items ? (
          <Spinner
            style={{ margin: "auto", display: "flex", color: "#212529" }}
            animation="border"
          />
        ) : (
          <AliceCarousel
            mouseTracking={screenWidth < 1024 ? true : false}
            items={items}
            responsive={responsive}
            controlsStrategy="responsive"
            disableButtonsControls={true}
            disableDotsControls={true}
            autoWidth
          />
        )}
      </Container>
    </div>
  )
}

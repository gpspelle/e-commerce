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
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad.js/ProgressiveBlurryImageLoad"
import "./SimilarProductsMobile.css"

export default function SimilarProductsMobile({ id, screenWidth, tags }) {
  const history = useHistory()
  const [items, setItems] = useState()
  const [similarProductsData, setSimilarProductsData] = useState({
    productsIds: [],
    products: [],
    pagination: { key: undefined, fetch: true },
  })

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
  }

  useEffect(() => {
    if (
      similarProductsData.products.length > 0 &&
      !similarProductsData.pagination.fetch
    ) {
      const components = similarProductsData.products.map((similarProduct, i) => {
        const coverImage = similarProduct.PRODUCT_COVER_IMAGE
        const image = similarProduct.PRODUCT_IMAGES[0]
        return coverImage ? (
          <ProgressiveBlurryImageLoad
            width={128}
            height={128}
            small={`data:image/jpeg;base64,${coverImage}`}
            large={image}
            onClick={() =>
              openDetailPage({
                id: similarProduct.id,
                name: similarProduct.PRODUCT_NAME,
                description: similarProduct.PRODUCT_DESCRIPTION,
                price: similarProduct.PRODUCT_PRICE,
                images: similarProduct.PRODUCT_IMAGES,
                tags: similarProduct.PRODUCT_TAGS ? similarProduct.PRODUCT_TAGS : [],
                productOwnerId: similarProduct.PRODUCT_OWNER_ID,
              })
            }
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
            src={image}
            onClick={() =>
              openDetailPage({
                id: similarProduct.id,
                name: similarProduct.PRODUCT_NAME,
                description: similarProduct.PRODUCT_DESCRIPTION,
                price: similarProduct.PRODUCT_PRICE,
                images: similarProduct.PRODUCT_IMAGES,
                tags: similarProduct.PRODUCT_TAGS ? similarProduct.PRODUCT_TAGS : [],
                productOwnerId: similarProduct.PRODUCT_OWNER_ID,
              })
            }
          />
        )
      })
      setItems(components)
    }
  }, [similarProductsData.products, similarProductsData.pagination.fetch])

  useEffect(() => {
    const fetchProductsByIds = async () => {
      if (similarProductsData.productsIds) {
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
        const response = await axios.get(`${API}/${PRODUCTS_ENDPOINT}`, config)
        const { data, key } = response.data
        const products = data.filter((product) =>
          similarProductsData.productsIds.includes(product.id)
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
        const response = await axios.get(`${API}/${TAGS_ENDPOINT}`)

        const sameTagProductIdsByTag = response.data.filter((productsByTag) =>
          tags.includes(productsByTag.TAG_NAME)
        )

        const sameTagProductIds = sameTagProductIdsByTag.map(
          (sameTagProductIdByTag) => sameTagProductIdByTag.products
        )

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
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { name, description, price, images, tags, productOwnerId },
    })
  }

  if (similarProductsData.productsIds.length === 0) {
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
            mouseTracking={true}
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

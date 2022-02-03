import React, { useState, useEffect, memo } from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import { Spinner, Container } from "react-bootstrap"
import axios from "axios"
import {
  REST_API,
  PRODUCTS_ENDPOINT,
  TAGS_ENDPOINT,
  PRODUCT_DESCRIPTION,
} from "../../constants/constants"
import { useHistory } from "react-router-dom"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad.js/ProgressiveBlurryImageLoad"
import "./SimilarProductsMobile.css"
import scrollToTop from "../../utils/scrollToTop"

const SimilarProductsMobile = ({ id, tags }) => {
  const history = useHistory()
  const [items, setItems] = useState()
  const [similarProductsData, setSimilarProductsData] = useState({
    productsIds: [],
    products: [],
    pagination: { key: undefined, fetch: false, isLoading: true },
  })

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
  }

  useEffect(() => {
    if (!similarProductsData.pagination.fetch) {
      const components = similarProductsData.products.map((similarProduct, i) => {
        const coverImage = similarProduct.PRODUCT_COVER_IMAGE?.S
        const firstImage = similarProduct.PRODUCT_IMAGES.L[0].S
        const similarProductJsonData = {
          id: similarProduct.id.S,
          name: similarProduct.PRODUCT_NAME.S,
          description: similarProduct.PRODUCT_DESCRIPTION.S,
          price: similarProduct.PRODUCT_PRICE.N,
          images: similarProduct.PRODUCT_IMAGES.L.map((image) => image.S),
          productImagesResized: similarProduct.PRODUCT_IMAGES_RESIZED?.L.map(
            (image) => image.S
          ),
          productStock: similarProduct.PRODUCT_STOCK?.N
            ? parseInt(similarProduct.PRODUCT_STOCK.N)
            : 1,
          tags: similarProduct.PRODUCT_TAGS ? similarProduct.PRODUCT_TAGS.SS : [],
          productOwnerId: similarProduct.PRODUCT_OWNER_ID?.S,
        }

        return coverImage ? (
          <ProgressiveBlurryImageLoad
            width={128}
            height={128}
            small={`data:image/jpeg;base64,${coverImage}`}
            large={firstImage}
            onClick={() => openDetailPage(similarProductJsonData)}
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
  }, [similarProductsData.products, similarProductsData.pagination.fetch])

  useEffect(() => {
    const fetchProductsByIds = async () => {
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
        pagination: {
          key,
          fetch: key ? true : false,
          isLoading: key ? true : false,
        },
      })
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
          pagination: { key: undefined, fetch: true, isLoading: true },
        })
      }
    }

    fetchProductIdsByTags()
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
        <hr
          style={{
            color: "gray",
            backgroundColor: "gray",
            height: 1,
          }}
        />
        <h4>Produtos relacionados</h4>
        {similarProductsData.pagination.isLoading ? (
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

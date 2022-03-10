import axios from "axios"

import {
  ACCOUNTS_ENDPOINT,
  PRODUCTS_ENDPOINT,
  PRODUCT_ENDPOINT,
  REST_API,
  TAGS_ENDPOINT,
} from "../constants/constants"
import { convertProductFromDatabaseToProductEntity } from "../utils/convertProductFromDatabaseToProductEntity"

export const getAccountsFromDatabase = async ({
  setAccountsData,
  productOwnerIds,
}) => {
  if (productOwnerIds !== undefined && Array.isArray(productOwnerIds)) {
    const body = {
      productOwnerIds,
    }

    if (productOwnerIds.length === 0) {
      return
    }

    const { data, key } = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`, {
      params: body,
    })

    setAccountsData({
      accounts: data,
      accountsPagination: { key, fetch: key ? true : false },
    })
  } else {
    const { data, key } = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`)
    setAccountsData({
      accounts: data,
      accountsPagination: { key, fetch: key ? true : false },
    })
  }
}

export const getProductsFromDatabase = async ({
  setProductData,
  setProductOwnerIds,
  products,
  productPagination,
}) => {
  const body = {
    key: productPagination.key,
  }

  const config = {
    params: {
      body,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }

  const res = await axios.get(`${REST_API}/${PRODUCTS_ENDPOINT}`, config)
  const { data, key } = res.data
  const concatProducts = products.length > 0 ? products.concat(data) : data

  concatProducts.sort((a, b) => (a.PRODUCT_NAME.S > b.PRODUCT_NAME.S ? 1 : -1))

  if (setProductOwnerIds !== undefined) {
    const productOwnerIdsSet = new Set(
      concatProducts.map((product) => product.PRODUCT_OWNER_ID.S)
    )

    setProductOwnerIds([...productOwnerIdsSet])
  }

  setProductData({
    products: concatProducts,
    allProducts: concatProducts,
    productPagination: { key, fetch: key ? true : false },
  })
}

export const getAccountFromDatabase = async ({
  accountId,
  productData,
  setProductData,
}) => {
  if (accountId) {
    const body = {
      productOwnerIds: [accountId],
    }

    const response = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`, {
      params: body,
    })

    const {
      email,
      name,
      about_me,
      about_products,
      crop_profile_photo,
      commercial_name,
      phone_number,
      facebook_link,
      instagram_link,
    } = response.data[0]

    setProductData({
      ...productData,
      aboutMe: about_me,
      email: email,
      aboutProducts: about_products,
      cropProfilePhoto: crop_profile_photo,
      productOwnerName: name,
      commercialName: commercial_name,
      phoneNumber: phone_number,
      facebookLink: facebook_link,
      instagramLink: instagram_link,
    })
  }
}

export const getProductFromDatabase = async ({
  productId,
  setFailedToFetchProduct,
  productData,
  setProductData,
}) => {
  try {
    const body = {
      id: productId,
    }

    const response = await axios.get(`${REST_API}/${PRODUCT_ENDPOINT}`, {
      params: body,
    })

    setFailedToFetchProduct(false)

    const productEntity = convertProductFromDatabaseToProductEntity({
      product: response.data.Item,
    })

    setProductData({ ...productData, ...productEntity })
  } catch (e) {
    setFailedToFetchProduct(true)
  }
}

export const getSimilarProductsFromDatabase = async ({
  similarProductsData,
  setSimilarProductsData,
  products,
  productPagination,
  productsIds,
}) => {
  const body = {
    key: productPagination.key,
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

  const sameIdProducts = data.filter((product) => productsIds.includes(product.id.S))

  const productsFlat = sameIdProducts.flat(1)
  const concatProducts =
    products.length > 0 ? products.concat(productsFlat) : productsFlat

  setSimilarProductsData({
    ...similarProductsData,
    products: concatProducts,
    productPagination: {
      key,
      fetch: key ? true : false,
      isLoading: key ? true : false,
    },
  })
}

export const getProductsIdsByTagsFromDatabase = async ({
  productId,
  tags,
  setSimilarProductsData,
}) => {
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
    sameTagProductIdsSet.delete(productId)
    setSimilarProductsData({
      products: [],
      productsIds: [...sameTagProductIdsSet],
      productPagination: { key: undefined, fetch: true, isLoading: true },
    })
  }
}

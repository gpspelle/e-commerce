import axios from "axios"

import {
  ACCOUNTS_ENDPOINT,
  PRODUCTS_ENDPOINT,
  PRODUCT_ENDPOINT,
  PRODUCT_TYPES,
  REST_API,
  TAGS_ENDPOINT,
} from "../constants/constants"

export const getAccountsFromDatabase = async ({ setAccounts, productOwnerIds }) => {
  if (productOwnerIds !== undefined && Array.isArray(productOwnerIds)) {
    const body = {
      productOwnerIds,
    }

    if (productOwnerIds.length === 0) {
      return
    }

    const response = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`, {
      params: body,
    })

    setAccounts(response.data)
  } else {
    const response = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`)
    setAccounts(response.data)
  }
}

export const getProductsFromDatabase = async ({
  setProductData,
  setProductOwnerIds,
  products,
  pagination,
}) => {
  const body = {
    key: pagination.key,
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
    pagination: { key, fetch: key ? true : false },
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
    const data = {}
    data.id = response.data.Item.id.S
    data.name = response.data.Item.PRODUCT_NAME.S
    data.description = response.data.Item.PRODUCT_DESCRIPTION.S
    data.price = response.data.Item.PRODUCT_PRICE.N
    data.images = response.data.Item.PRODUCT_IMAGES.L.map((item) => item.S)
    data.productImagesResized = response.data.Item.PRODUCT_IMAGES_RESIZED?.L.map(
      (item) => item.S
    )
    data.productOwnerId = response.data.Item.PRODUCT_OWNER_ID?.S
    data.tags = response.data.Item?.PRODUCT_TAGS?.SS
    data.productType = response.data.Item?.PRODUCT_TYPE?.S
    data.productStock = response.data.Item.PRODUCT_STOCK?.N
      ? parseInt(response.data.Item.PRODUCT_STOCK.N)
      : 1
    if (data.productType === PRODUCT_TYPES.DEAL) {
      data.dealPrice = response.data.Item.DEAL_PRICE.N
    } else if (data.productType === PRODUCT_TYPES.LIGHTNING_DEAL) {
      data.dealPrice = response.data.Item.DEAL_PRICE.N
      data.lightningDealDuration = response.data.Item.LIGHTNING_DEAL_DURATION.S
      data.lightningDealStartTime = response.data.Item.LIGHTNING_DEAL_START_TIME.S
    }

    setProductData({ ...productData, ...data })
  } catch (e) {
    setFailedToFetchProduct(true)
  }
}

export const getSimilarProductsFromDatabase = async ({
  similarProductsData,
  setSimilarProductsData,
  products,
  pagination,
  productsIds,
}) => {
  const body = {
    key: pagination.key,
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
    pagination: {
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
      pagination: { key: undefined, fetch: true, isLoading: true },
    })
  }
}

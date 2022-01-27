export const REST_API =
  process.env.REACT_APP_REST_API ||
  "https://nlv53clpuf.execute-api.us-east-1.amazonaws.com/dev"

export const PAGE_TITLE = process.env.REACT_APP_PAGE_TITLE || "Lojinha"
export const PAGE_DESCRIPTION =
  process.env.REACT_APP_PAGE_DESCRIPTION || "A loja virtual"
export const APP_NAME = process.env.REACT_APP_APP_NAME || "Lojinha"

export const PRODUCTS_ENDPOINT = "customer-products"
export const PRODUCT_ENDPOINT = "customer-product"
export const ACCOUNTS_ENDPOINT = "accounts"
export const TAGS_ENDPOINT = "tags"
export const PRODUCT_DESCRIPTION = "descrição-produto"
export const DEALS = "ofertas"
export const PRODUCT_TYPES = {
  DEAL: "DEAL",
  LIGHTING_DEAL: "LIGHTING_DEAL",
  NORMAL: "NORMAL",
}

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

export const ADMIN_DESCRIPTION = "descrição-artesão"
export const PRODUCT_DESCRIPTION = "descrição-produto"
export const DEALS = "ofertas"
export const PRODUCTS = "produtos"
export const ABOUT_US = "sobre-nós"

export const PRODUCT_TYPES = {
  DEAL: "DEAL",
  LIGHTNING_DEAL: "LIGHTNING_DEAL",
  NORMAL: "NORMAL",
}

export const PRODUCT_STOCK_SELL_TYPE = "PRODUCT_STOCK"
export const PRODUCT_ORDER_SELL_TYPE = "PRODUCT_ORDER"

export const NAVIGATION_LINKS = {
  "Tela de início": "/",
  "Todos os produtos": `/${PRODUCTS}`,
  Ofertas: `/${DEALS}`,
  "Sobre nós": `/${ABOUT_US}`,
}

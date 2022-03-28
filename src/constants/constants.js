export const REST_API =
  process.env.REACT_APP_REST_API ||
  "https://nlv53clpuf.execute-api.us-east-1.amazonaws.com/dev"
export const PAGE_TITLE = process.env.REACT_APP_PAGE_TITLE || "Lojinha"
export const PAGE_DESCRIPTION =
  process.env.REACT_APP_PAGE_DESCRIPTION || "A loja virtual"
export const APP_NAME = process.env.REACT_APP_APP_NAME || "Lojinha"
export const PRODUCT_STOCK_SELL_TYPE =
  process.env.REACT_APP_PRODUCT_STOCK || "PRODUCT_STOCK"
export const PRODUCT_ORDER_SELL_TYPE =
  process.env.REACT_APP_PRODUCT_ORDER || "PRODUCT_ORDER"
export const APP_CITY = process.env.REACT_APP_APP_CITY || "Araras"
export const APP_STATE = process.env.REACT_APP_APP_STATE || "São Paulo"
export const HERO_HEADER_TEXT =
  process.env.REACT_APP_HERO_HEADER_TEXT ||
  `${APP_NAME}, trazendo o melhor do artesanato mais perto de você`

export const ADVANTAGES = (process.env.REACT_APP_ADVANTAGES &&
  JSON.parse(process.env.REACT_APP_ADVANTAGES)) || {
  advantage_0: {
    title: "Feito para você",
    text: "Comercializamos apenas produtos artesanais, pensados e sob medida para você",
  },
  advantage_1: {
    title: "Qualidade sem igual",
    text: "Nossos produtos são feitos somente com materiais de primeira linha",
  },
  advantage_2: {
    title: "Toque de carinho",
    text: "Comprar produtos artesanais cria uma relação mais próxima com quem desenvolve seus produtos",
  },
}

export const ABOUT_US_DESCRIPTION = (process.env.REACT_APP_ABOUT_US_DESCRIPTION &&
  JSON.parse(process.env.REACT_APP_ABOUT_US_DESCRIPTION)) || {
  description_0: `A ${APP_NAME} surgiu como uma ideia para reunir artesãos de ${APP_CITY} e
    ajudá-los a oferecer seus produtos e serviços por meio de uma plataforma
    unificada`,
  description_1: `Todos os produtos são feitos carinhosamente e são vendidos à pronta entrega
    ou sob encomenda`,
}

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

export const LARGE_SCREEN = 992

const aboutUsIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.25 10.5C5.25 10.5 4.5 10.5 4.5 9.75C4.5 9 5.25 6.75 8.25 6.75C11.25 6.75 12 9 12 9.75C12 10.5 11.25 10.5 11.25 10.5H5.25ZM8.25 6C8.84674 6 9.41903 5.76295 9.84099 5.34099C10.2629 4.91903 10.5 4.34674 10.5 3.75C10.5 3.15326 10.2629 2.58097 9.84099 2.15901C9.41903 1.73705 8.84674 1.5 8.25 1.5C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75C6 4.34674 6.23705 4.91903 6.65901 5.34099C7.08097 5.76295 7.65326 6 8.25 6Z"
      fill="#263F59"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.912 10.5C3.80082 10.2659 3.74537 10.0092 3.75 9.75002C3.75 8.73377 4.26 7.68752 5.202 6.96002C4.73182 6.81514 4.24196 6.7443 3.75 6.75002C0.75 6.75002 0 9.00002 0 9.75002C0 10.5 0.75 10.5 0.75 10.5H3.912Z"
      fill="#263F59"
    />
    <path
      d="M3.375 6C3.87228 6 4.34919 5.80246 4.70083 5.45083C5.05246 5.09919 5.25 4.62228 5.25 4.125C5.25 3.62772 5.05246 3.15081 4.70083 2.79917C4.34919 2.44754 3.87228 2.25 3.375 2.25C2.87772 2.25 2.40081 2.44754 2.04917 2.79917C1.69754 3.15081 1.5 3.62772 1.5 4.125C1.5 4.62228 1.69754 5.09919 2.04917 5.45083C2.40081 5.80246 2.87772 6 3.375 6Z"
      fill="#263F59"
    />
  </svg>
)

const dealsIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_215_1117)">
      <path
        d="M1.5 1.5C1.5 1.30109 1.57902 1.11032 1.71967 0.96967C1.86032 0.829018 2.05109 0.75 2.25 0.75H5.6895C5.8884 0.750042 6.07913 0.829088 6.21975 0.96975L11.4698 6.21975C11.6104 6.3604 11.6893 6.55113 11.6893 6.75C11.6893 6.94887 11.6104 7.1396 11.4698 7.28025L8.03025 10.7198C7.8896 10.8604 7.69887 10.9393 7.5 10.9393C7.30113 10.9393 7.1104 10.8604 6.96975 10.7198L1.71975 5.46975C1.57909 5.32913 1.50004 5.1384 1.5 4.9395V1.5ZM4.125 4.5C4.42337 4.5 4.70952 4.38147 4.9205 4.1705C5.13147 3.95952 5.25 3.67337 5.25 3.375C5.25 3.07663 5.13147 2.79048 4.9205 2.57951C4.70952 2.36853 4.42337 2.25 4.125 2.25C3.82663 2.25 3.54048 2.36853 3.3295 2.57951C3.11853 2.79048 3 3.07663 3 3.375C3 3.67337 3.11853 3.95952 3.3295 4.1705C3.54048 4.38147 3.82663 4.5 4.125 4.5Z"
        fill="#263F59"
      />
      <path
        d="M0.96975 5.84475C0.829088 5.70413 0.750042 5.5134 0.75 5.3145V1.5C0.551088 1.5 0.360322 1.57902 0.21967 1.71967C0.0790176 1.86032 0 2.05109 0 2.25L0 5.6895C4.24781e-05 5.8884 0.079088 6.07913 0.21975 6.21975L5.46975 11.4698C5.6104 11.6104 5.80113 11.6893 6 11.6893C6.19887 11.6893 6.3896 11.6104 6.53025 11.4698L6.5625 11.4375L0.96975 5.84475Z"
        fill="#263F59"
      />
    </g>
    <defs>
      <clipPath id="clip0_215_1117">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const productsIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_215_1115)">
      <path
        d="M5.99997 0.75C5.60215 0.75 5.22061 0.908035 4.93931 1.18934C4.65801 1.47064 4.49997 1.85218 4.49997 2.25V3.75H3.74997V2.25C3.74997 1.65326 3.98702 1.08097 4.40898 0.65901C4.83094 0.237053 5.40323 0 5.99997 0C6.59671 0 7.169 0.237053 7.59096 0.65901C8.01292 1.08097 8.24997 1.65326 8.24997 2.25V3.75H7.49997V2.25C7.49997 1.85218 7.34194 1.47064 7.06063 1.18934C6.77933 0.908035 6.3978 0.75 5.99997 0.75ZM3.74997 3.75H2.51997C2.25063 3.75006 1.99024 3.84675 1.78614 4.0225C1.58204 4.19825 1.44776 4.4414 1.40772 4.70775L0.63747 9.8475C0.597561 10.1142 0.615645 10.3863 0.690488 10.6454C0.765331 10.9045 0.895172 11.1443 1.07115 11.3487C1.24714 11.553 1.46512 11.7169 1.71023 11.8293C1.95534 11.9417 2.22181 11.9999 2.49147 12H9.50772C9.77744 12.0001 10.044 11.9419 10.2892 11.8296C10.5344 11.7172 10.7525 11.5533 10.9285 11.3489C11.1046 11.1446 11.2345 10.9047 11.3094 10.6456C11.3843 10.3865 11.4024 10.1142 11.3625 9.8475L10.5915 4.70775C10.5514 4.44153 10.4173 4.19848 10.2133 4.02275C10.0094 3.84701 9.74919 3.75024 9.47997 3.75H8.24997V4.875C8.24997 4.97446 8.21046 5.06984 8.14014 5.14016C8.06981 5.21049 7.97443 5.25 7.87497 5.25C7.77551 5.25 7.68013 5.21049 7.60981 5.14016C7.53948 5.06984 7.49997 4.97446 7.49997 4.875V3.75H4.49997V4.875C4.49997 4.97446 4.46046 5.06984 4.39014 5.14016C4.31981 5.21049 4.22443 5.25 4.12497 5.25C4.02551 5.25 3.93013 5.21049 3.85981 5.14016C3.78948 5.06984 3.74997 4.97446 3.74997 4.875V3.75Z"
        fill="#263F59"
      />
    </g>
    <defs>
      <clipPath id="clip0_215_1115">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const homeIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2.46975L10.5 6.96975V10.125C10.5 10.4234 10.3815 10.7095 10.1705 10.9205C9.95952 11.1315 9.67337 11.25 9.375 11.25H2.625C2.32663 11.25 2.04048 11.1315 1.8295 10.9205C1.61853 10.7095 1.5 10.4234 1.5 10.125V6.96975L6 2.46975ZM9.75 1.875V4.5L8.25 3V1.875C8.25 1.77554 8.28951 1.68016 8.35983 1.60984C8.43016 1.53951 8.52554 1.5 8.625 1.5H9.375C9.47446 1.5 9.56984 1.53951 9.64017 1.60984C9.71049 1.68016 9.75 1.77554 9.75 1.875Z"
      fill="#263F59"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.46974 1.12499C5.61038 0.984382 5.80111 0.905396 5.99999 0.905396C6.19886 0.905396 6.38959 0.984382 6.53024 1.12499L11.5155 6.10948C11.5859 6.1799 11.6255 6.2754 11.6255 6.37498C11.6255 6.47457 11.5859 6.57007 11.5155 6.64048C11.4451 6.7109 11.3496 6.75046 11.25 6.75046C11.1504 6.75046 11.0549 6.7109 10.9845 6.64048L5.99999 1.65524L1.01549 6.64048C0.945071 6.7109 0.849567 6.75046 0.749986 6.75046C0.650404 6.75046 0.5549 6.7109 0.484485 6.64048C0.41407 6.57007 0.374512 6.47457 0.374512 6.37498C0.374512 6.2754 0.41407 6.1799 0.484485 6.10948L5.46974 1.12499Z"
      fill="#263F59"
    />
  </svg>
)

export const NAVIGATION_LINKS = {
  "Página inicial": { path: "/", icon: homeIcon },
  Produtos: { path: `/${PRODUCTS}`, icon: productsIcon },
  Promoções: { path: `/${DEALS}`, icon: dealsIcon },
  "Sobre nós": { path: `/${ABOUT_US}`, icon: aboutUsIcon },
}

import { Col } from "react-bootstrap"

import Product from "../components/Product/Product"
import { convertProductFromDatabaseToProductEntity } from "./convertProductFromDatabaseToProductEntity"

export const convertProductArrayToDisplayProduct = ({
  productArray,
  productOwnerIdToOwnerData,
  productImageSize,
  productCardSize,
}) => {
  return productArray.map((product) => {
    const productEntity = convertProductFromDatabaseToProductEntity({
      product,
    })

    return (
      <Col
        key={
          product.id.S +
          productOwnerIdToOwnerData[product.PRODUCT_OWNER_ID.S]?.phoneNumber
        }
      >
        <Product
          productEntity={productEntity}
          phoneNumber={
            Object.keys(productOwnerIdToOwnerData).length !== 0
              ? productOwnerIdToOwnerData[product.PRODUCT_OWNER_ID.S]["phoneNumber"]
              : false
          }
          commercialName={
            Object.keys(productOwnerIdToOwnerData).length !== 0
              ? productOwnerIdToOwnerData[product.PRODUCT_OWNER_ID.S][
                  "commercialName"
                ]
              : false
          }
          productImageSize={productImageSize}
          productCardSize={productCardSize}
        />
      </Col>
    )
  })
}

import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import "./ProductPagination.css"

function PaginatedItems({ products, itemsPerPage, screenWidth }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(products.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(products.length / itemsPerPage))
  }, [products, itemOffset, itemsPerPage])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    setItemOffset(newOffset)
  }

  const responsiveConfiguration =
    screenWidth > 1024
      ? {
          marginPagesDisplayed: 2,
          pageRangeDisplayed: 3,
        }
      : {
          marginPagesDisplayed: -1,
          pageRangeDisplayed: -1,
        }

  return (
    <>
      {currentItems}
      <ReactPaginate
        previousLabel="< Anterior"
        nextLabel="Próximo >"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        {...responsiveConfiguration}
      />
    </>
  )
}

export default function ProductPagination({ products, screenWidth }) {
  return (
    <PaginatedItems
      products={products}
      itemsPerPage={12}
      screenWidth={screenWidth}
    />
  )
}

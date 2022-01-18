import React, { useEffect, useState, memo } from "react"
import ReactPaginate from "react-paginate"
import scrollToTop from "../../utils/scrollToTop"
import "./ProductPagination.css"

function PaginatedItems({ products, itemsPerPage, screenWidth }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(1)
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  const currentPage = Math.round(itemOffset / itemsPerPage)
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
    scrollToTop()
  }

  const responsiveConfiguration =
    screenWidth > 1024
      ? {
          marginPagesDisplayed: 2,
          pageRangeDisplayed: 3,
        }
      : {
          marginPagesDisplayed: 0,
          pageRangeDisplayed: 0,
        }

  return (
    <>
      {screenWidth < 1024 && (
        <ReactPaginate
          previousLabel="&#8592; Anterior"
          nextLabel="Próximo &#8594;"
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
          forcePage={currentPage}
          className="first-pagination-mobile pagination"
        />
      )}
      {currentItems}
      <ReactPaginate
        previousLabel="&#8592; Anterior"
        nextLabel="Próximo &#8594;"
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
        forcePage={currentPage}
        {...responsiveConfiguration}
      />
    </>
  )
}

const ProductPagination = ({ products, screenWidth }) => {
  return (
    <PaginatedItems
      products={products}
      itemsPerPage={12}
      screenWidth={screenWidth}
    />
  )
}

const MemoizedProductPagination = memo(ProductPagination)
export default MemoizedProductPagination

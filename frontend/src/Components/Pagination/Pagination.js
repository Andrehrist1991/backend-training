// Modules
import ReactPaginate from 'react-paginate';
import FormSelect from 'react-bootstrap/FormSelect';
import PropTypes from 'prop-types';

// Constants
import { ITEMS_PER_PAGE } from 'Engine/Orders/Constants/constants';

function Pagination(props) {
  const {
    handlePageClick,
    initialPage,
    setItemsPerPage,
    pageCount,
  } = props;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 pt-3">
          <div className="row d-flex align-items-start">
            <div className="col-md-3 d-flex align-items-center">
              Items per page:&nbsp; <FormSelect className="w-50" onChange={(event) => setItemsPerPage(event.target.value)} size="sm">{ITEMS_PER_PAGE.map((item) => <option value={item}>{item}</option>)}</FormSelect>
            </div>
            <div className="col-md-9 d-flex justify-content-end">
              <ReactPaginate
                activeClassName="active"
                breakClassName="page-item"
                breakLabel="..."
                breakLinkClassName="page-link"
                containerClassName="pagination"
                initialPage={initialPage}
                marginPagesDisplayed={2}
                nextClassName="page-item"
                nextLabel="next >"
                nextLinkClassName="page-link"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                pageRangeDisplayed={3}
                previousClassName="page-item"
                previousLabel="< prev"
                previousLinkClassName="page-link"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  handlePageClick: PropTypes.func,
  initialPage: PropTypes.number,
  pageCount: PropTypes.number,
  setItemsPerPage: PropTypes.func,
};

export default Pagination;
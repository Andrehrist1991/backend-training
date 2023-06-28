// Modules
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Pagination from "./Pagination";

// Engine
import { setActivePage, setPagination } from 'Engine/Orders/actions';
import activePageSelector from 'Engine/Orders/Selectors/activePageSelector';
import paginationSelector from 'Engine/Orders/Selectors/paginationSelector';
import totalCountSelector from 'Engine/Orders/Selectors/totalCountSelector';

function PaginationContainer() {
  const dispatch = useDispatch();

  const activePage = useSelector(activePageSelector);
  const totalCount = useSelector(totalCountSelector);
  const { take } = useSelector(paginationSelector);

  const [initialPage, setInitialPage] = useState(activePage);
  
  const items = useMemo(() => [...Array(totalCount).keys()], [totalCount]);
  const pageCount = Math.ceil(items.length / take);

  const handleItemsPerPage = useCallback((count) => {
    dispatch(setPagination({
      take: Number(count),
    }));
  }, [dispatch]);

  const handlePageClick = useCallback((event) => {
    const newOffset = event.selected * take % items.length;
    dispatch(setActivePage(event.selected));
    setInitialPage(event.selected);
    dispatch(setPagination({
      skip: newOffset,
      take: take,
    }));
  }, [dispatch, items, take]);

  return (
    <Pagination
      handlePageClick={handlePageClick}
      initialPage={initialPage}
      setItemsPerPage={handleItemsPerPage}
      pageCount={pageCount}
    />
  )
};

export default PaginationContainer;

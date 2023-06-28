// Modules
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sortBy from 'lodash/sortBy';

// Components
import OrdersTable from './OrdersTable';
import Pagination from 'Components/Pagination';

// Constants
import { ORDER_STATUS } from 'Constants/constants';
import { ROUTES } from 'Constants/routes';
import { SORT_DIRECTIONS } from 'Constants/constants';

// Engine
import { setActiveEditOrder } from 'Engine/Orders/actions';
import { getAllOrders, updateOrder } from 'Engine/Orders/async-actions';
import ordersSelector from 'Engine/Orders/Selectors/ordersSelector';
import paginationSelector from 'Engine/Orders/Selectors/paginationSelector';

const orderStatuses = Object.values(ORDER_STATUS);

function OrdersTableContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: orders } = useSelector(ordersSelector);
  const { skip, take } = useSelector(paginationSelector);

  const [sortColumn, setSortColumn] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc');

  const editOrder = useCallback((order) => {
    dispatch(setActiveEditOrder(order));
    navigate(ROUTES.editOrder);
  }, [dispatch, navigate]);

  const updateStatus = useCallback((id, status) => {
    const indexOfItem = orderStatuses.reduce((acc, item, idx, arr) => {
      if (item === status) {
        if (idx === arr.length - 1) {
          acc = 0;
        } else {
          acc = idx + 1 % arr.length;
        }
      } 
      return acc;
    }, 0);

    dispatch(updateOrder({ id, 
      data: { status: orderStatuses[indexOfItem] }
    }));
  }, [dispatch]);

  const renderSortArrow = useCallback((name) => {
    if (sortColumn === name) {
      if (sortDirection === SORT_DIRECTIONS.asc) return <span className="column-arrow">↓</span>;
      return <span className="column-arrow">↑</span>;
    }
  }, [sortColumn, sortDirection]);

  const handleSort = useCallback((column) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) => (prevDirection === SORT_DIRECTIONS.asc ? SORT_DIRECTIONS.desc : SORT_DIRECTIONS.asc));
    } else {
      setSortColumn(column);
      setSortDirection(SORT_DIRECTIONS.asc);
    }
  }, [sortColumn]);

  const sortedData = useMemo(() => {
    if (sortDirection === SORT_DIRECTIONS.asc) return sortBy(orders, [(item) => item[sortColumn]]);
    return sortBy(orders, [(item) => item[sortColumn]]).reverse();
  }, [orders, sortColumn, sortDirection]);

  useEffect(() => {
    dispatch(getAllOrders({
      skip,
      take,
    }));
  }, [dispatch, skip, take]);

  return (
    <>
      <OrdersTable
        editOrder={editOrder}
        orders={sortedData}
        renderSortArrow={renderSortArrow}
        sortColumn={handleSort}
        updateStatus={updateStatus}
      />
      <Pagination />
    </>
  );
}

export default OrdersTableContainer;

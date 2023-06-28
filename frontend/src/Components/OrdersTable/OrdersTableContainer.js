// Modules
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Components
import OrdersTable from './OrdersTable';
import Pagination from 'Components/Pagination';

// Constants
import { ORDER_STATUS } from 'Constants/constants';
import { ROUTES } from 'Constants/routes';

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

  useEffect(() => {
    dispatch(getAllOrders({
      skip,
      take,
    }));
  }, [dispatch, skip, take]);

  return (
    <>
      <OrdersTable editOrder={editOrder} orders={orders} updateStatus={updateStatus} />
      <Pagination />
    </>
  );
}

export default OrdersTableContainer;

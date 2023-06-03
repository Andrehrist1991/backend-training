// Modules
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import OrdersTable from './OrdersTable';

// Engine
// import {} from 'Engine/Orders/actions';
import { getAllOrders } from 'Engine/Orders/async-actions';
import ordersSelector from 'Engine/Orders/Selectors/ordersSelector';

function OrdersTableContainer() {
  const dispatch = useDispatch();

  const orders = useSelector(ordersSelector);

  console.log(orders);

  const editOrder = useCallback(() => {
    // dispatch(editOrder({

    // }));
  }, []);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <OrdersTable editOrder={editOrder} />
  );
}

export default OrdersTableContainer;

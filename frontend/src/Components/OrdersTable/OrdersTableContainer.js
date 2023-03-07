// Modules
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Components
import OrdersTable from './OrdersTable';

// Engine
import {} from 'Engine/Orders/actions';

function OrdersTableContainer() {
  const dispatch = useDispatch();

  const editOrder = useCallback(() => {
    // dispatch(editOrder({

    // }));
  }, [dispatch]);

  return (
    <OrdersTable editOrder={editOrder} />
  );
}

export default OrdersTableContainer;

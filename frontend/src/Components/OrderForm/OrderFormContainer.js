// Modules
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

// Components
import OrderForm from './OrderForm';

// Constants
import { FORM_FIELDS } from 'Constants/orderFormFields';
import { ORDER_STATUS, SALES_PROVIDERS, SALE_TYPES } from 'Constants/constants';
import { ROUTES } from 'Constants/routes';

// Engine
import { setActiveEditOrder } from 'Engine/Orders/actions';
import { addNewOrder, deleteOrder, updateOrder } from 'Engine/Orders/async-actions';
import activeEditOrderSelector from 'Engine/Orders/Selectors/activeEditOrderSelector';

function OrderFormContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeEditOrder = useSelector(activeEditOrderSelector);
  const isNewOrderMode = isEmpty(activeEditOrder);

  const editOrderId = get(activeEditOrder, 'id');

  const onFormSubmit = useCallback((data) => {
    if (isNewOrderMode) {
      dispatch(addNewOrder(data))
        .unwrap()
        .then(() => navigate(-1));
    } else {
      dispatch(updateOrder({ id: activeEditOrder.id, data }))
        .unwrap()
        .then(() => {
          navigate(ROUTES.orders);
          dispatch(setActiveEditOrder({}));
        });
    }
  }, [activeEditOrder, dispatch, isNewOrderMode, navigate]);

  const onCancel = useCallback(() => {
    dispatch(setActiveEditOrder({}));
    navigate(-1);
  }, [dispatch, navigate]);

  const onDeleteOrder = useCallback((id) => {
    dispatch(deleteOrder(id))
      .unwrap()
      .then(() => navigate(-1));
  }, [dispatch, navigate]);

  const initialValues = useMemo(() => {
    if (!isNewOrderMode) {
      return {
        [FORM_FIELDS.date]: activeEditOrder.date,
        [FORM_FIELDS.email]: activeEditOrder.email,
        [FORM_FIELDS.executed]: !!activeEditOrder.executed ? new Date(activeEditOrder.executed) : null,
        [FORM_FIELDS.id]: activeEditOrder.id,
        [FORM_FIELDS.lastName]: activeEditOrder.lastName,
        [FORM_FIELDS.message]: activeEditOrder.message,
        [FORM_FIELDS.name]: activeEditOrder.name,
        [FORM_FIELDS.phone]: activeEditOrder.phone,
        [FORM_FIELDS.position]: activeEditOrder.position,
        [FORM_FIELDS.provider]: activeEditOrder.provider,
        [FORM_FIELDS.status]: activeEditOrder.status,
        [FORM_FIELDS.type]: activeEditOrder.type,
      }
    }
    return {
      [FORM_FIELDS.date]: moment(),
      [FORM_FIELDS.position]: [{ [FORM_FIELDS.position]: "" }],
      [FORM_FIELDS.provider]: SALES_PROVIDERS.provider_1,
      [FORM_FIELDS.status]: ORDER_STATUS.new,
      [FORM_FIELDS.type]: SALE_TYPES.wholesale,
    }
  }, [activeEditOrder, isNewOrderMode]);

  return (
    <Form 
      component={OrderForm}
      editOrderId={editOrderId}
      initialValues={initialValues}
      isNewOrderMode={isNewOrderMode}
      mutators={{
        ...arrayMutators,
      }}
      onCancel={onCancel}
      onDeleteOrder={onDeleteOrder}
      onSubmit={onFormSubmit}
    />
  );
}

export default OrderFormContainer;

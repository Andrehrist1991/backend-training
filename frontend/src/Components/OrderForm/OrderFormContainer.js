// Modules
import { useCallback } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

// Components
import OrderForm from './OrderForm';

// Constants
import { FORM_FIELDS } from 'Constants/orderFormFields';

function OrderFormContainer() {
  const onFormSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Form 
      component={OrderForm}
      initialValues={{ [FORM_FIELDS.position]: [{ [FORM_FIELDS.position]: "" }] }}
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={onFormSubmit}
    />
  );
}

export default OrderFormContainer;

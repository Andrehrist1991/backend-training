// Modules
import { memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Field, useField } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import DatePicker from 'react-datepicker';
import cx  from 'classnames';
import get from 'lodash/get';
import size from 'lodash/size';

// Constants
import { FORM_FIELDS } from 'Constants/orderFormFields';

// Helpers
import cssModuleCXFactory from 'Helpers/cssModuleCXFactory';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import styles from './OrderForm.module.scss';

const getClassName = cssModuleCXFactory(styles);

function RequiredPrefix() {
  return (<span className={getClassName('required-prefix')}>* </span>);
}

function OrderForm(props) {
  const { form, handleSubmit } = props;
  const watchField = useField(FORM_FIELDS.position);

  const pop = get(form, 'mutators.pop');
  const push = get(form, 'mutators.push');
  const watchFieldValue = get(watchField, 'input.value');

  const isAddButtonDisabled = !watchFieldValue[size(watchFieldValue) - 1]?.position
    || !watchFieldValue[size(watchFieldValue) - 1];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 pt-3">
          <form onSubmit={handleSubmit}>
            <h2>Customer</h2>
            <hr />
            <Form.Group className="mb-3">
              <Form.Label>
                <RequiredPrefix />
                Email
              </Form.Label>
              <Field className="form-control" component="input" name={FORM_FIELDS.email} placeholder="Your email" type="email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <RequiredPrefix />
                Name
              </Form.Label>
              <Field className="form-control" component="input" name={FORM_FIELDS.name} placeholder="Your name" type="text" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <RequiredPrefix />
                Last Name
              </Form.Label>
              <Field className="form-control" component="input" name={FORM_FIELDS.lastName} placeholder="Your last name" type="text" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <RequiredPrefix />
                Phone
              </Form.Label>
              <Field className="form-control" component="input" name={FORM_FIELDS.phone} placeholder="Your phone" type="phone" />
            </Form.Group>

            <h2>Order</h2>
            <hr />
            <FieldArray name={FORM_FIELDS.position}>
              {({ fields }) => (
                <>
                  {fields.map((position, index) => (
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label>
                        <RequiredPrefix />
                        Position #{index + 1}
                      </Form.Label>
                      <Field
                        className="form-control"
                        component="input"
                        name={`${position}.${FORM_FIELDS.position}`}
                        placeholder="Pen"
                        type="text"
                      />
                      <span
                        className={cx(getClassName('remove-cross'), {
                          [getClassName('remove-cross--disabled')]: size(fields) < 2,
                        })}
                        onClick={() => fields.remove(index)}
                      >
                        ❌
                      </span>
                    </Form.Group>
                  ))}
                  <div className="d-flex">
                    <Button
                      className={`${getClassName('button')} mb-3 mr-3`}
                      disabled={isAddButtonDisabled}
                      onClick={() => push(FORM_FIELDS.position, undefined)}
                      variant="outline-primary"
                    >
                      Add Position
                    </Button>
                    {size(fields) > 1 && (<Button
                      className={`${getClassName('button')} mb-3`}
                      onClick={() => pop(FORM_FIELDS.position)}
                      variant="outline-danger"
                    >
                      Remove Position
                    </Button>)}
                  </div>
                </>
              )}
            </FieldArray>

            <Form.Group className="mb-3">
              <Form.Label>Type </Form.Label>
              <Field className="form-select" component="select" name={FORM_FIELDS.type}>
                <option value="1">Wholesale</option>
                <option value="2">Retail</option>
              </Field>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Provider </Form.Label>
              <Field className="form-select" component="select" name={FORM_FIELDS.provider}>
                <option value="1">Provider 1</option>
                <option value="2">Provider 2</option>
              </Field>
            </Form.Group>

            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Order ID </Form.Label>
              <Field className="form-control" component="input" name={FORM_FIELDS.id} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>
                <RequiredPrefix />
                Order date{' '}
              </Form.Label>
              <Field className={getClassName('date-picker')} component={DatePicker} name={FORM_FIELDS.performed} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Your message </Form.Label>
              <Field as="textarea" className="form-control" component="textarea" name={FORM_FIELDS.message} />
            </Form.Group>

            <div className="mb-3 d-flex justify-content-end">
              <Button className={getClassName('button')} variant="primary" type="submit">
                Submit
              </Button>
              <Button className={getClassName('button')} onClick={form.reset} variant="outline-danger">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderForm);

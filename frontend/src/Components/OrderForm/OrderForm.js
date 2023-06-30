// Modules
import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { Field, useField, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import DatePicker from 'react-datepicker';
import cx  from 'classnames';
import get from 'lodash/get';
import size from 'lodash/size';

// Components
import Input from 'Components/Input';

// Constants
import { FORM_FIELDS } from 'Constants/orderFormFields';
import { SALES_PROVIDERS, SALE_TYPES } from 'Constants/constants';

// Helpers
import cssModuleCXFactory from 'Helpers/cssModuleCXFactory';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import styles from './OrderForm.module.scss';

// Validators
import {
  composeValidators,
  isRequired,
  validateEmailWithMessage,
  validatePhoneByRange,
} from 'Validator/FormValidator';

const getClassName = cssModuleCXFactory(styles);

function RequiredPrefix() {
  return (<span className={getClassName('required-prefix')}>* </span>);
}

function OrderForm(props) {
  const {
    editOrderId,
    form,
    handleSubmit,
    isNewOrderMode,
    onCancel,
    onDeleteOrder,
  } = props;
  const [startDate, setStartDate] = useState(new Date());
  const watchField = useField(FORM_FIELDS.position);

  const pop = get(form, 'mutators.pop');
  const push = get(form, 'mutators.push');
  const watchFieldValue = get(watchField, 'input.value');

  const formState = useFormState();

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
              <Field
                name={FORM_FIELDS.email}
                validate={composeValidators(
                  isRequired(),
                  validateEmailWithMessage('"Email" field is not valid.'),
                )}
                render={({ input, meta }) => {
                  const hasError = !!meta.error && meta.touched;
                  return (
                    <Input
                      {...input}
                      errorMessage={meta.error}
                      hasError={hasError}
                      placeholder="Your email"
                      prefix="@"
                      type="email"
                    />
                  );
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <RequiredPrefix />
                Name
              </Form.Label>
              <Field
                name={FORM_FIELDS.name}
                validate={isRequired()}
                render={({ input, meta }) => {
                  const hasError = !!meta.error && meta.touched;
                  return (
                    <Input
                      {...input}
                      errorMessage={meta.error}
                      hasError={hasError}
                      placeholder="Your name"
                      type="text"
                    />
                  );
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <RequiredPrefix />
                Last Name
              </Form.Label>
              <Field
                name={FORM_FIELDS.lastName}
                validate={isRequired()}
                render={({ input, meta }) => {
                  const hasError = !!meta.error && meta.touched;
                  return (
                    <Input
                      {...input}
                      errorMessage={meta.error}
                      hasError={hasError}
                      placeholder="Your last name"
                      type="text"
                    />
                  );
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <RequiredPrefix />
                Phone
              </Form.Label>
              <Field
                name={FORM_FIELDS.phone}
                validate={validatePhoneByRange}
                render={({ input, meta }) => {
                  const hasError = !!meta.error && meta.touched;
                  return (
                    <Input
                      {...input}
                      errorMessage={meta.error}
                      hasError={hasError}
                      placeholder="Your phone"
                      type="text"
                    />
                  );
                }}
              />
            </Form.Group>

            <h2>Order</h2>
            <hr />
            <FieldArray name={FORM_FIELDS.position}>
              {({ fields }) => (
                <>
                  {fields.map((position, index) => (
                    <Form.Group
                      className="mb-3 position-relative"
                      key={position}
                    >
                      <Form.Label>
                        <RequiredPrefix />
                        Position #{index + 1}
                      </Form.Label>
                      <Field
                        name={`${position}.${FORM_FIELDS.position}`}
                        validate={isRequired()}
                        render={({ input, meta }) => {
                          const hasError = !!meta.error && meta.touched;
                          return (
                            <Input
                              {...input}
                              errorMessage={meta.error}
                              hasError={hasError}
                              placeholder="Pen"
                              type="text"
                            />
                          );
                        }}
                      />
                      <span
                        className={cx(getClassName('remove-cross'), {
                          [getClassName('remove-cross--disabled')]:
                            size(fields) < 2,
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
                    {size(fields) > 1 && (
                      <Button
                        className={`${getClassName('button')} mb-3`}
                        onClick={() => pop(FORM_FIELDS.position)}
                        variant="outline-danger"
                      >
                        Remove Position
                      </Button>
                    )}
                  </div>
                </>
              )}
            </FieldArray>

            <Form.Group className="mb-3">
              <Form.Label>Type </Form.Label>
              <Field
                className="form-select"
                component="select"
                name={FORM_FIELDS.type}
              >
                <option value={SALE_TYPES.wholesale}>
                  {SALE_TYPES.wholesale}
                </option>
                <option value={SALE_TYPES.retail}>{SALE_TYPES.retail}</option>
              </Field>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Provider </Form.Label>
              <Field
                className="form-select"
                component="select"
                name={FORM_FIELDS.provider}
              >
                <option value={SALES_PROVIDERS.provider_1}>
                  {SALES_PROVIDERS.provider_1}
                </option>
                <option value={SALES_PROVIDERS.provider_2}>
                  {SALES_PROVIDERS.provider_2}
                </option>
              </Field>
            </Form.Group>

            {!isNewOrderMode && (
              <>
                <Form.Group className="mb-3" controlId="id">
                  <Form.Label>Order ID </Form.Label>
                  <Field
                    className="form-control"
                    component="input"
                    disabled
                    name={FORM_FIELDS.id}
                    type="text"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>
                    <RequiredPrefix />
                    Executed date{' '}
                  </Form.Label>
                  <Field
                    className={getClassName('date-picker')}
                    name={FORM_FIELDS.executed}
                    render={({ input }) => {
                      return (
                        <DatePicker
                          onChange={(date) => setStartDate(date)}
                          selected={input.value}
                          {...input}
                        />
                      );
                    }}
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Your message </Form.Label>
              <Field
                as="textarea"
                className="form-control"
                component="textarea"
                name={FORM_FIELDS.message}
              />
            </Form.Group>

            <div className="mb-3 d-flex justify-content-end">
              <Button
                className={getClassName('button')}
                disabled={formState.pristine || formState.invalid}
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
              <Button
                className={getClassName('button')}
                disabled={formState.pristine || formState.invalid}
                onClick={form.reset}
                variant="outline-danger"
              >
                Reset
              </Button>
              <Button
                className={getClassName('button')}
                onClick={onCancel}
                variant="outline-primary"
              >
                Back
              </Button>
              {!isNewOrderMode && (
                <Button
                  className={getClassName('button')}
                  onClick={() => onDeleteOrder(editOrderId)}
                  variant="danger"
                >
                  Delete
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

OrderForm.propTypes = {
  editOrderId: PropTypes.string,
  isNewOrderMode: PropTypes.bool,
  onCancel: PropTypes.func,
  onDeleteOrder: PropTypes.func,
};

export default memo(OrderForm);

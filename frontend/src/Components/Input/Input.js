// Modules
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';

function Input(props) {
  const {
    errorMessage,
    hasError,
    meta,
    placeholder,
    prefix,
    type,
    ...rest
   } = props;

  return (
    <InputGroup hasValidation>
      {!!prefix && <InputGroup.Text>{prefix}</InputGroup.Text>}
      <Form.Control
        {...rest}
        isInvalid={hasError}
        placeholder={placeholder}
        required
        type={type}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </InputGroup>
  );
}

Input.propTypes = {
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  type: PropTypes.string,
};

export default Input;

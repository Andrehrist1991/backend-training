// Modules
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import size from 'lodash/size';

// Comstants
import { VALIDATION_MESSAGES } from './validation-messages';

export function composeValidators(...validators) {
  return function(value) {
    return validators.reduce((error, validator) => error || validator(value), undefined);
  }
};

export function isRequired(message = VALIDATION_MESSAGES.required) {
  return function(value) {
    switch (true) {
      case isString(value): {
        return isEmpty(value, { ignore_whitespace: true }) ? message : undefined;
      }
      case isArray(value) : {
        return size(value) === 0 ? message : undefined;
      }
      default: {
        return value ? undefined : message;
      }
    }
  }
};

export function validateEmail(email, errorMessage) {
  return isEmail(email) ? undefined : errorMessage;
};

export function validateEmailWithMessage(message) {
  return (email) => validateEmail(email, message);
};

export function validatePhoneByRange(value) {
  const rangeRegex = /\b([6-9]|1[0-8])\b/; // from 6 to 18 digits
  const phone = value?.replace(/[^\d]/g, '') || '';
  const isValid = !isEmpty(phone) && rangeRegex.test(size(phone));

  return isValid ? undefined : VALIDATION_MESSAGES.completePhone;
};

// Modules
import { memo } from 'react';

// Helpers
import cssModuleCXFactory from 'Helpers/cssModuleCXFactory';

// Styles
import styles from './OrderForm.module.scss';

const getClassName = cssModuleCXFactory(styles);

function OrderForm() {
  return (
    <div className="container">
      Order form
    </div>
  );
}

export default memo(OrderForm);

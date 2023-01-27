// Modules
import { memo } from 'react';

// Helpers
import cssModuleCXFactory from 'Helpers/cssModuleCXFactory';

// Styles
import styles from './OrdersTable.module.scss';

const getClassName = cssModuleCXFactory(styles);

function OrdersTable() {
  return (
    <div className="container">
      Orders table
    </div>
  );
}

export default memo(OrdersTable);

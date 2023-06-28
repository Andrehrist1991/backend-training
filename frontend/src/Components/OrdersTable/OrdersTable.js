// Modules
import { memo } from 'react';
import { Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import cx  from 'classnames';
import lowerCase  from 'lodash/lowerCase';
import map from 'lodash/map';

// Helpers
import cssModuleCXFactory from 'Helpers/cssModuleCXFactory';

// Styles
import styles from './OrdersTable.module.scss';

const getClassName = cssModuleCXFactory(styles);

function OrdersTable(props) {
  const { editOrder, orders, updateStatus } = props;
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 pt-3">
          <Table className={getClassName('table')} striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>ID</th>
                <th>Type</th>
                <th>Provider</th>
                <th>Executed</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {map(orders, (order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.fullName}</td>
                  <td>{order._id}</td>
                  <td>{order.type}</td>
                  <td>{order.provider}</td>
                  <td>{order.executed}</td>
                  <td className={cx(getClassName('status-item'), getClassName('clickable'), getClassName(lowerCase(order?.status)))} onClick={() => updateStatus(order.id, order.status)}>{order.status}</td>
                  <td><Button onClick={() => editOrder(order)} variant="dark">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

OrdersTable.defaultProps = {
  orders: [],
};

OrdersTable.propTypes = {
  editOrder: PropTypes.func,
  orders: PropTypes.array,
  updateStatus: PropTypes.func,
};

export default memo(OrdersTable);

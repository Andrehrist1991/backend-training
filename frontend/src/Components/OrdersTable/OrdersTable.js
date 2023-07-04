// Modules
import { memo } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
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
  const { editOrder, orders, renderSortArrow, sortColumn, updateStatus } = props;
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 pt-3">
          {!!orders ? (<Table className={getClassName('table')} striped>
            <thead>
              <tr>
                <th onClick={() => sortColumn('date')}>Date {renderSortArrow('date')}</th>
                <th onClick={() => sortColumn('fullName')}>Name {renderSortArrow('fullName')}</th>
                <th onClick={() => sortColumn('_id')}>ID {renderSortArrow('_id')}</th>
                <th onClick={() => sortColumn('type')}>Type {renderSortArrow('type')}</th>
                <th onClick={() => sortColumn('provider')}>Provider {renderSortArrow('provider')}</th>
                <th onClick={() => sortColumn('executed')}>Executed {renderSortArrow('executed')}</th>
                <th onClick={() => sortColumn('status')}>Status {renderSortArrow('status')}</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {map(orders, (order) => (
                <tr key={order._id}>
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
          </Table>) : (
            <div className="d-flex justify-content-center mb-3 mt-3">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
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
  renderSortArrow: PropTypes.func,
  sortColumn: PropTypes.func,
  updateStatus: PropTypes.func,
};

export default memo(OrdersTable);

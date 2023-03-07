// Modules
import { memo } from 'react';
import { Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Helpers
import cssModuleCXFactory from 'Helpers/cssModuleCXFactory';

// Styles
import styles from './OrdersTable.module.scss';

const getClassName = cssModuleCXFactory(styles);

const ordersData = [
  {
    date: '22/11/63',
    name: 'John Doe',
    id: 'p-009989',
    type: 'Retail',
    customer: 'Joe Biden',
    provider: 'Provider 1',
    performed: '22/11/63',
    status: 'Waiting',
  },
];

function OrdersTable(props) {
  const { editOrder } = props;
  
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
                <th>Customer</th>
                <th>Provider</th>
                <th>Executed</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.name}</td>
                  <td>{order.id}</td>
                  <td>{order.type}</td>
                  <td>{order.customer}</td>
                  <td>{order.provider}</td>
                  <td>{order.performed}</td>
                  <td>{order.status}</td>
                  <td><Button onClick={editOrder} variant="dark">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

OrdersTable.propTypes = {
  editOrder: PropTypes.func,
};

export default memo(OrdersTable);

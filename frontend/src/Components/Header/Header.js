// Modules
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

// Constants
import { ROUTES } from 'Constants/routes';

// Helpers
import cssModuleCXFactory from 'Helpers/cssModuleCXFactory';

// Styles
import styles from './Header.module.scss';

const getClassName = cssModuleCXFactory(styles);

function Header() {
  return (
    <Nav className="d-flex justify-content-center" variant="tabs" defaultActiveKey="/">
      <Nav.Item className={getClassName('item')}>
        <NavLink className="nav-link" to={ROUTES.congratulations}>Congratulations</NavLink>
      </Nav.Item>
      <Nav.Item className={getClassName('item')}>
        <NavLink className="nav-link" to={ROUTES.orders} href={ROUTES.orders}>Orders</NavLink>
      </Nav.Item>
      <Nav.Item className={getClassName('item')}>
        <NavLink className="nav-link" to={ROUTES.newOrder}>New Order</NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default Header;

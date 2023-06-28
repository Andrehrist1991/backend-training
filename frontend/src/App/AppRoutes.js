// Modules
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Constants
import { ROUTES } from 'Constants/routes';

// Screens
const CongratsScreen = lazy(() => import('Components/Congrats'));
const OrderForm = lazy(() => import('Components/OrderForm'));
const OrdersTable = lazy(() => import('Components/OrdersTable'));

const routes = [
  {
    Component: CongratsScreen,
    route: ROUTES.congratulations,
  },
  {
    Component: OrdersTable,
    route: ROUTES.orders,
  },
  {
    Component: OrderForm,
    route: ROUTES.newOrder,
  },
  {
    Component: OrderForm,
    route: ROUTES.editOrder,
  },
];

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {routes.map((el) => (
          <Route
            element={<el.Component />}
            exact
            key={el.route}
            path={el.route}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;

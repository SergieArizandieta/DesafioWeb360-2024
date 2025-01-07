import { Routes, Route, HashRouter } from 'react-router-dom'
import LayoutLading from '../components/layouts/LayoutLading/LayoutLading'
import LayoutAuth from '../components/layouts/LayoutAuth/LayoutAuth'

import LandingPage from '../pages/Users/LandingPage/LandingPage'
import SingIn from '../pages/Users/SingIn/SingIn'
import { PrivateRoute } from '../interceptors/PrivateRoute'
import Store from '../pages/Client/Store/Store'
import { useAuthStore } from '../storage/auth'
import { PrivateRouteClient } from '../interceptors/PrivateRouteClient'
import LayoutClient from '../components/layouts/LayoutClient/LayoutClient'
import ProductSearch from '../pages/Client/ProductSearch/ProductSearch'
import ShoppingCart from '../pages/Client/ShoppingCart/ShoppingCart'
import ClientOrders from '../pages/Client/ClientOrders/ClientOrders'
import SingUp from '../pages/Users/SingUp/SingUp'
import { PrivateRouteOperator } from '../interceptors/PrivateRouteOperator'
import DashBoard from '../pages/Operator/DashBoard/DashBoard'
import LayoutOperator from '../components/layouts/LayoutOperator/LayoutOperator'

export default function AppNavigator() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const rolIdRol = useAuthStore((state) => state.rolIdRol);

  return (
    <HashRouter>
      <Routes>

        <Route element={<LayoutLading />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<PrivateRoute isAuth={isAuth} rolIdRol={rolIdRol}/>}>
          <Route element={<LayoutAuth />}>
            <Route path="/SingIn" element={<SingIn />} />
            <Route path="/SingUp" element={<SingUp />} />
          </Route>
        </Route>

        <Route element={<PrivateRouteClient  isAuth={isAuth} rolIdRol={rolIdRol} />}>
          <Route element={<LayoutClient />}>
            <Route path="/Store" element={<Store />} />
            <Route path="/s/:searchTerm" element={<ProductSearch />} />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/ClientOrders" element={<ClientOrders />} />
          </Route>
        </Route>

        <Route element={<PrivateRouteOperator  isAuth={isAuth} rolIdRol={rolIdRol} />}>
          <Route element={<LayoutOperator />}>
            <Route path="/DashBoard" element={<DashBoard />} />
          </Route>
        </Route>

      </Routes>
    </HashRouter>
  )
}
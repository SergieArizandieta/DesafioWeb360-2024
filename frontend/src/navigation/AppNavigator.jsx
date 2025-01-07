import { Routes, Route, HashRouter } from 'react-router-dom'
import LayoutLading from '../components/layouts/LayoutLading/LayoutLading'
import LayoutAuth from '../components/layouts/LayoutAuth/LayoutAuth'

import LandingPage from '../pages/Users/LandingPage/LandingPage'
import SingIn from '../pages/Users/SingIn/SingIn'
import { PrivateRoute } from '../interceptors/PrivateRoute'
import Store from '../pages/Client/Store/Store'
import { useAuthStore } from '../store/auth'
import { PrivateRouteClient } from '../interceptors/PrivateRouteClient'

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
          </Route>
        </Route>

        <Route element={<PrivateRouteClient  isAuth={isAuth} rolIdRol={rolIdRol} />}>
          <Route path="/Store" element={<Store />} />
        </Route>

      </Routes>
    </HashRouter>
  )
}
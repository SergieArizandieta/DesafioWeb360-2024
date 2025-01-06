import { Routes, Route, HashRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import LayoutLading from '../components/LayoutLading/LayoutLading'

export default function AppNavigator() {
  return (
    <HashRouter>
      <Routes>

      {/* <Route path="/" element={<LandingPage/>} /> */}

      <Route element={<LayoutLading />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* <Route element={<BasePage />}>
          <Route path="/" element={<Home />} />
        </Route> */}

        {/* <Route element={<BasePage />}>
          <Route path="/pensum/:id/" element={<Pensum/>} />
        </Route> */}

      </Routes>
    </HashRouter>
  )
}
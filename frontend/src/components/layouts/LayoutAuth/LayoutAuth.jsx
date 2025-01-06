import "./styles.css"

import { Outlet } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

export default function LayoutAuth() {


  return (
      <main className="LayoutAuth">
        <Header />
        <main><Outlet/></main>
        <Footer/>
      </main>
  )
}
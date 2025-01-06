import "./styles.css"

import { Outlet } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import HeaderButtons from "./components/HeaderButtons/HeaderButtons";

export default function LayoutLading() {


  return (
      <main className="LayoutLading">
        <Header Right={HeaderButtons}/>
        <main><Outlet/></main>
        <Footer/>
      </main>
  )
}
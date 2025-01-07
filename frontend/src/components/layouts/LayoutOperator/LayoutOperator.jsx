import "./styles.css"

import { Outlet } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import HeaderButtons from "./components/HeaderButtons/HeaderButtons";

export default function LayoutOperator() {


  return (
      <main className="LayoutOperator">
        <Header Right={HeaderButtons} link={"/DashBoard"} />
        <main><Outlet/></main>
        <Footer/>
      </main>
  )
}
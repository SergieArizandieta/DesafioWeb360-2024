import "./styles.css"

import { Outlet } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import HeaderButtons from "./components/HeaderButtons/HeaderButtons";
import HeaderSearchBar from "./components/HeaderSearchBar/HeaderSearchBar";

export default function LayoutClient() {


  return (
      <main className="layoutClient">
        <Header Right={HeaderButtons} link={"/Store"} Center={HeaderSearchBar}/>
        <main><Outlet/></main>
        <Footer/>
      </main>
  )
}
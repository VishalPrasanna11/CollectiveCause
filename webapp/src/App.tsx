import "./App.css"
import Footer from "./components/footer"
import NavBar from "./components/navbar"
import Routers from "./router/routers"
import { BrowserRouter } from "react-router-dom";
import ContactUs from "./components/contact";
import CampaignSettings from "./views/UpdateFundRaise";
import Home from "./views/Home";
function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routers/>
    {/* <ContactUs/> */}
    {/* <CampaignSettings/> */}
    <Footer/>
    {/* <Home/> */}
    </BrowserRouter>
      </>
    
  )
}

export default App

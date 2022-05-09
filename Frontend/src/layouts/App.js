import "../styles/styles.scss";
import React from "react";
import Page from "./Page";
import Footer from "./Footer";
import NavBar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => { 
    return (
      <Router>
        <div className="App">
          {<NavBar />}
          <main>
         <Page />
          </main>       
          <footer>{<Footer />}</footer>
        </div>
      </Router>
    );
  }
export default App;

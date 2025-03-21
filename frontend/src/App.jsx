import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import "./App.css";
import TransactionWindow from "./components/TransactionWindow";
import TransactionTable from "./components/TransactionTable";
function App(){
  return(
    <Router>
      <Routes>
      <Route>
      <Route path="/" element={<TransactionWindow />} />
      <Route path="/dash" element={<TransactionTable/>}/>
      </Route>
      </Routes>
    </Router>
  )
}

export default App;
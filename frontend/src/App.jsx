import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import "./App.css";
import TransactionWindow from "./components/TransactionWindow";
import TransactionTable from "./components/TransactionTable";
import TransactionResult from "./components/TransactionResult";
function App(){
  return(
    <Router>
      <Routes>
      <Route>
      <Route path="/" element={<TransactionWindow />} />
      <Route path="/dash" element={<TransactionTable/>}/>
      <Route path="/result" element={<TransactionResult />} />
      </Route>
      </Routes>
    </Router>
  )
}

export default App;
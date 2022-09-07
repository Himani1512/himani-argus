import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import View from "./Components/View";
import Edit from "./Components/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/view/:id' element={<View/>} />
          <Route exact path='/edit/:id' element={<Edit/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
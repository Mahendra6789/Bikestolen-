import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import 'react-datepicker/dist/react-datepicker.css'
// import Dateselection from './Components/DateComponent';
import Header from './Components/Header';
import Datafetch from './Components/Datafetch';

function App() {
  return (
    <Fragment>
      <Header />
      <Datafetch />
    </Fragment>
  );
}

export default App;

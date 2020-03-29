import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import Header from './components/Header'
import DashboardContent from './components/DashboardContent';
import Contador from './components/Contador';


function App() {
  return (
    <React.Fragment>

    <Header />

    <Contador inicial={0} />

    <DashboardContent />

    </React.Fragment>
  );
}

export default App;

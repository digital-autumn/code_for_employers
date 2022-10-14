import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import './App.css';
import Home from './pages/Home';
import CryptoCoins from './pages/CryptoCoins';
import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "white",
    color: "black",
    minHeight: "100vh",
  },
}));

export default function App() {

  const classes = useStyles();

  return (   
    <Router>
      <div className={classes.App}>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/coins/:id' element={<CryptoCoins />} />
          </Routes>
      </div>
    </Router>
  );
}



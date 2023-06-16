// import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.scss';
import './main.scss'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:3001/api')
  //   .then((response) => response.json())
  //   .then((response) => setData(response.message))
  // }, [])

  return (
    <div className="page">
      <Header />
      <Footer />
    </div>
  );
}

export default App;

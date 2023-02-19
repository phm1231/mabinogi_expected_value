import React from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Section from './components/layout/section';
import Aside from './components/layout/aside';
import Nav from './components/layout/nav';
import './components/layout/layout.css';

function App(){
  return (
    <div id='wapper'>
      <Header/>
      <Nav/>
      <Section/>
      <Aside/>
      <Footer/>
    </div>
  )
}



export default App;
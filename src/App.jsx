// import { useState } from 'react'
import { useState } from 'react'
import './App.css'
import Certificate from './components/Certificate'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Popup from './components/Popup'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Story from './components/Story'

function App() {
  const [popupState, setPopupState] = useState("")
  return (
    <>
    <Header/>
    <Hero/>
    <Projects setter={setPopupState}/>
    <Skills/>
    <Certificate/>
    <Story/>
    <Contact/>
    <Footer/>
    <Popup setter={setPopupState} getter={popupState}/>
    </>
  )
}

export default App

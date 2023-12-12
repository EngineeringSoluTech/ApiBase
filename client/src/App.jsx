import React,{ useState, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

import InicioPage from './views/InicioPage'
import InicialPage from './views/NavbarModules/InicialPage'
import Album from './views/NavbarModules/ProductsAlmbum'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Fragment>   
     <BrowserRouter>
      <Routes>
        <Route path='/' element = {<InicioPage/>}/>
        <Route path='/inicio' element = {<InicialPage/>}/>
        <Route path='/productos' element = {<Album/>}/>
      </Routes>
     </BrowserRouter>
   </Fragment>
  )
}

export default App

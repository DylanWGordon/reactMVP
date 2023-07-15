import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar.jsx'
import Header from './Header.jsx'
import Body from './Body.jsx'



function App() {
  const [data, setData] = useState([])
  const URL = 'https://kane-cv-web-service.onrender.com'
  useEffect(() => {
    const getData = async () => {
      const res = axios.get(`${URL}/`)
      console.log(res)
      setData(res)
    }
    getData()
}, [])

  return (
    <>
      <div id="left">
        <div id="icon">icon</div>
      <Navbar />
      </div>
      <div id='right'>
      <Header />
      <Body />
      </div>
    </>
  )
}

export default App

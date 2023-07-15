const URL = 'https://kane-cv-web-service.onrender.com'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar.jsx'
import Header from './Header.jsx'
import Body from './Body.jsx'



function App() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState('')


  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${URL}/`)
      setData(res.data[0])
    }
    getData()
  }, [])
  
  console.log(data)
  return (
    <>
      <div id="left">
        <div id="icon" onClick={() => { setCurrentPage(''); }}>
          <img  id='iconIMG' src={data.image_url}></img>
        </div>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <div id='right'>
      <Header />
      <Body />
      </div>
    </>
  )
}

export default App

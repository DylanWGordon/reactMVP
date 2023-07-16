const URL = 'https://kane-cv-web-service.onrender.com'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar.jsx'
import Header from './Header.jsx'
import Body from './Body.jsx'
import IconItems from './IconItems.jsx'



function App() {
  const [artData, setArtData] = useState([])
  const [currentPage, setCurrentPage] = useState('')
  


  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${URL}/`)
      setArtData(res.data)
    }
    getData()
  }, [])
  console.log(artData())

  
  


  return (
    <>
      <div id="left">
        <div id="icon" onClick={() => { setCurrentPage(''); }}>
          <IconItems />
        </div>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <div id='right'>
      <Header />
      <Body currentPage={currentPage} />
      </div>
    </>
  )
}

export default App

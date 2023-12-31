import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import Body from './components/Body.jsx'
import IconItems from './components/IconItems.jsx'




function App() {
  // const URL = '/server.js/'
  const URL = 'https://kane-cv-web-service.onrender.com/pieces'
  const [artData, setArtData] = useState([])
  const [currentPage, setCurrentPage] = useState('About')



  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(URL)
      setArtData(res.data)
    }
    getData()
  }, [])
  console.log(artData)

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
        <Body currentPage={currentPage} setCurrentPage={setCurrentPage} artData={artData} setArtData={setArtData} />
      </div>
    </>
  )
}

export default App

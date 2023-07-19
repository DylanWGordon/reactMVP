import { useState } from 'react'
import Contact from './Contact.jsx'
import Portfolio from './Portfolio.jsx';
import Single from './Single.jsx'
import Filters from './Filters.jsx'
import About from './About.jsx'


const Body = ({ currentPage, setCurrentPage, artData, setArtData }) => {
    const [currentId, setCurrentId] = useState(0)
    const [singleData, setSingleData] = useState({})
    

    if (currentPage === 'Contact') {
        return (
            <div id='mainBody'>
                <div id='bodyBody' className="rounded noscroll" >
                    <div className='thumbs'>
                        <Contact />
                    </div>
                </div>
            </div>
        )
    } else if (currentPage === 'Portfolio') {
        return (
            <div id='mainBody'>
                <div id='bodyBody' className="rounded">
                    <Filters  setArtData={setArtData} currentPage={currentPage} setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} />
                    <div className='thumbs'>
                        <Portfolio setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} currentPage={currentPage} />
                    </div>
                </div>
            </div>
        )
    } else if (currentPage === 'single') {
        return (
            <div id='mainBody'>
                <div id='bodyBody' className="rounded noscroll" >
                    <Filters setSingleData={setSingleData} setCurrentPage={setCurrentPage} currentPage={currentPage} currentId={currentId} setArtData={setArtData}  />
                    <div className='thumbs'>
                        <Single artData={artData} setSingleData={setSingleData} singleData={singleData} setCurrentPage={setCurrentPage} currentId={currentId} setCurrentId={setCurrentId} />
                    </div>
                </div>
            </div>
        )
    } else if (currentPage === 'About Me') {
        return (
            <div id='mainBody'>
                <div id='bodyBody' className="rounded noscroll" >
                    <div className='thumbs'>
                        <About />
                    </div>
                </div>
            </div>
        )
    }
}
    
    
    export default Body
import useState from 'react'
import Contact from './Contact.jsx'
import Portfolio from './Portfolio.jsx';

const Body = ({ currentPage, artData }) => {

    //get 1 functionality up next


    if (currentPage === 'Contact') {
        return (
            <div id='mainBody'>
            <div id='bodyBody' className='rounded'>
                <Contact currentPage={currentPage} />
            </div>
            </div>
        )
    } else if (currentPage === 'Portfolio') {
        return (
            <div id='mainBody'>
            <div id='bodyBody' className="rounded">
                <div className='thumbs'>
                    <Portfolio artData={artData} />
                </div>
            </div>
            </div>
        )
    }
}


export default Body
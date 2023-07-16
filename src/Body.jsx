import Contact from './Contact.jsx'
import Home from './Home.jsx';

const Body = ({ currentPage }) => {
    
    if (currentPage === 'Contact') {
        return <div id='mainBody'>
            <div id='bodyBody'>
            <Contact currentPage={currentPage} />
            </div>
        </div>
    } else {
        return <div id='mainBody'>
            <div id='bodyBody'>
                <Home />
            </div>
        </div>
    }

}

export default Body
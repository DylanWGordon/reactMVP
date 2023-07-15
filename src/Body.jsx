import Test from './Test.jsx'

const Body = ({ currentPage }) => {
    
    if (currentPage !== 'Contact') {
        return <div id='mainBody'>
            <div id='bodyBody'>
            </div>
        </div>
    } else {
        return <div id='mainBody'>
            <div id='bodyBody'>
            <Test currentPage={currentPage} />
            </div>
        </div>
    }

}

export default Body
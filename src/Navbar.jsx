import NavbarItems from './NavbarItems.jsx'

const Navbar = ({ currentPage, setCurrentPage }) => {
  

    return <div id='navbar'>
        <div id='navbarBody' className='rounded'>
        <NavbarItems currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    </div>
}
    
export default Navbar
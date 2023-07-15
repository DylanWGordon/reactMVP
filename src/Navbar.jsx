import NavbarItems from './NavbarItems.jsx'

const Navbar = ({ currentPage, setCurrentPage }) => {
  

    return <div id='navbar'>
        <div id='navbarBody'>
        <NavbarItems currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    </div>
}
    
export default Navbar
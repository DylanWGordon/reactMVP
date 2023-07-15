import NavbarItems from './NavbarItems.jsx'

const Navbar = ({ currentPage, setCurrentPage }) => {
  

    return <div id='navbar'>
        <NavbarItems currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
}
    
export default Navbar
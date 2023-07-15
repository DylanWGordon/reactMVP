

const NavbarItems = ({ currentPage, setCurrentPage }) => {
    const handleClick= (e)=>{
        setCurrentPage(e.target.innerHTML)
        console.log(currentPage)
    }

    return <ul onClick={handleClick} id='navList'>
        <li className='navListItem'>Portfolio</li>
        <li className='navListItem'>About Me</li>
        <li className='navListItem'>Contact</li>
        <li className='navListItem'>Store</li>
    </ul>
    
}

export default NavbarItems
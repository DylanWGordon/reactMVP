

const NavbarItems = ({ currentPage, setCurrentPage }) => {
    const handleClick= (e)=>{
        setCurrentPage(e.target.innerHTML)
        console.log(currentPage)
    }

    return <ul onClick={handleClick} id='navList'>
        <li className='navListItem'><button className='navBtn' style={{ color: '#f3738a', border: '2px', slant: '.5em' }}>Portfolio</button></li>
        <li className='navListItem'><button className='navBtn' style={{color:'#f3738a', border:'2px', slant:'.5em'}} >About</button></li>
        <li className='navListItem'><button className='navBtn' style={{color:' #f3738a', border:'2px', slant:'.5em'}}>Contact</button></li>
    </ul>
    
}

export default NavbarItems
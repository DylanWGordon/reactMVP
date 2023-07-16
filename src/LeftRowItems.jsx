

const LeftRowItems = ({ leftArr, setCurrentId, setCurrentPage })=>{
    
    const handleClick = (item) => {
        setCurrentId(parseInt(item.art_id))
        setCurrentPage('single')
    }

    return (
    <>
        {
            leftArr.map((item) => (
                <div className='thumbnailDiv' key={item.art_id} onClick={()=>{handleClick(item)}}>
                    <img src={item.image_url} className='imageThumb' />
                    </div >
                
            ))
        }
    </>
    )

}

export default LeftRowItems
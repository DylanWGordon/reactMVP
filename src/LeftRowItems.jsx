

const LeftRowItems = ({ leftArr, setCurrentId, setCurrentPage })=>{
    
    const handleClick = (item) => {
        setCurrentId(item.art_id)
        setCurrentPage('single')
    }

    return (
    <>
        {
            leftArr.map((item) => (
                <div className='thumbnailDiv' key={item.art_id} onClick={() => handleClick(item)}>
                    <div class='thumbBorder'>
                    <img src={item.image_url} className='imageThumb' />
                    </div >
                </div>
                
            ))
        }
    </>
    )

}

export default LeftRowItems
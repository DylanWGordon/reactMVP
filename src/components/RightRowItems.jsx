

const RightRowItems = ({ rightArr, setCurrentId, setCurrentPage })=>{
    
    const handleClick = (item) => {
        setCurrentId(item.art_id)
        setCurrentPage('single')
    }

    return (
    <>
        {
            rightArr.map((item) => (
                <div className='thumbnailDiv' key={item.art_id} onClick={()=>handleClick(item)} >
                    <div className='thumbBorder'>
                        <img src={item.image_url} className='imageThumb' />
                    </div >
                    </div >
                
            ))
        }
    </>
    )

}

export default RightRowItems
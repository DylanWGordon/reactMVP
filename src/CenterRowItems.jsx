

const CenterRowItems = ({ centerArr, setCurrentId, setCurrentPage })=>{
    
    const handleClick = (item) => {
        setCurrentId(item.art_id)
        setCurrentPage('single')
    }

    return (
    <>
        {
            centerArr.map((item) => (
                <div className='thumbnailDiv' key={item.art_id} onClick={()=>handleClick(item)}>
                    <img src={item.image_url} className='imageThumb'/>
                    </div >
                
            ))
        }
    </>
    )

}

export default CenterRowItems


const RightRowItems = ({ rightArr, setCurrentPage, setCurrentId })=>{
    
    const handleClick = (item) => {
        setCurrentId(item.art_id)
        setCurrentPage('single')
    }

    return (
    <>
        {
            rightArr.map((item) => (
                <div className='thumbnailDiv' key={item.art_id} onClick={()=>handleClick(item)} >
                    <img src={item.image_url} className='imageThumb' />
                    <p>{item.art_id}</p>
                    </div >
                
            ))
        }
    </>
    )

}

export default RightRowItems
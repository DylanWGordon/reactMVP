

const RightRowItems = ({ rightArr, setCurrentPage, setCurrentId })=>{
    
    const handleClick = (item) => {
        console.log(item)
        setCurrentId(item.art_id)
        setCurrentPage('single')
    }

    return (
    <>
        {
            rightArr.map((item) => (
                <div className='thumbnailDiv' key={item.art_id} onClick={()=>handleClick(item)} >
                    <img src={item.image_url} className='imageThumb' />
                    </div >
                
            ))
        }
    </>
    )

}

export default RightRowItems
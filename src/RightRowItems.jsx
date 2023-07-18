

const RightRowItems = ({ rightArr, setCurrentPage, setCurrentId })=>{
    
    const handleClick = (item) => {
        setCurrentId(item.art_id)
        setCurrentPage('single')
        console.log(item.art_id)
    }

    return (
    <>
        {
            rightArr.map((item) => (
                <div className='thumbnailDiv' key={item.art_id} onClick={()=>handleClick(item)} >
                    <div class='thumbBorder'>
                        <img src={item.image_url} className='imageThumb' />
                    </div >
                    </div >
                
            ))
        }
    </>
    )

}

export default RightRowItems
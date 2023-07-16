

const CenterRowItems = ({ centerArr })=>{
    
    return (
    <>
        {
            centerArr.map((item) => (
                <div className='thumbnailDiv' thumbId={item.art_id}>
                    <img src={item.image_url} className='imageThumb'/>
                    </div >
                
            ))
        }
    </>
    )

}

export default CenterRowItems
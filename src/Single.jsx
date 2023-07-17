const Single = ({ artData, currentId, setCurrentId, setCurrentPage }) => {
    const single = artData[currentId - 1];

    const tagLister = ()=>{
        // let tags = ''
        // artData.art_tags.map((tag) => {
        //     tags+=tag
        // })
        // tags.pop()
        // return tags

        tag
}
    
    

    return (
        <div id='singleDiv'>
            <img src={single.image_url} id='singleImg' />
            <div id="singleInfo">
                <h4 id='singleHeader'>{single.art_name}</h4>
                <p className='singleYear'>{single.art_year}</p>
                <p className='singlePar'>{single.about}</p>
                <p className='singleTags'>Tags: {single.art_tags}</p>
            </div>
      </div>
)

}

export default Single
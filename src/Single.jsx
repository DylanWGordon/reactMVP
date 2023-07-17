import axios from 'axios'
const Single = ({ artData, currentId, setCurrentId, setCurrentPage }) => {

    const single = artData[currentId - 1];

    const tagLister = ()=>{
        // let tags = ''
        // artData.art_tags.map((tag) => {
        //     tags+=tag
        // })
        // tags.pop()
        // return tags
    }
    let piece
    const currentImage = async () => {
        let id= parseInt(currentId)
        let result = await axios.get(`https://kane-cv-web-service.onrender.com/${id}`)
        piece = result.json
        console.log(piece)
    } 
    currentImage()
    

    return (
        <div id='singleDiv'>
            <img src={single.image_url} id='singleImg' />
            <div id="singleInfo">
                <h4 id='singleHeader'>{single.art_name}_{single.art_id}</h4>
                <p className='singleYear'>{single.art_year}</p>
                <p className='singlePar'>{single.about}</p>
                <p className='singleTags'>Tags: {single.art_tags}</p>
            </div>
      </div>
)

}

export default Single
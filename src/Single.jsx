import axios from 'axios'
import { useEffect, useState } from 'react'

const Single = ({ artData, currentId, setCurrentId, setCurrentPage }) => {

  
    const URL = 'https://kane-cv-web-service.onrender.com/'
    const [singleData, setSingleData] = useState({})
        const getData = async () => {
            const res = await axios.get(`${URL}${currentId}`)
            setSingleData(res.data)
        }
    getData()
    
    
    

    return (
        <div id='singleDiv'>
            <img src={singleData.image_url} id='singleImg' />
            <div id="singleInfo">
                <h4 id='singleHeader'>{singleData.art_name}</h4>
                <p className='singleYear'>{singleData.art_year}</p>
                <p className='singlePar'>{singleData.about}</p>
                <p className='singleTags'>Tags: {singleData.art_tags}</p>
            </div>
      </div>
)

}

export default Single
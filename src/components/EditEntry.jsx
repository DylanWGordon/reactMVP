import axios from 'axios'

const EditEntry = ({ currentId, setSingleData, setCurrentPage, setArtData }) => {
    let nameStr;
    let yearNum = 0;
    let tagStr = [];
    let aboutStr;
    let imgFile;

    const nameHandler = (e) => {
        if (e.target.value.length <= 20) { 
            nameStr = e.target.value;
        } else {
            e.target.value=nameStr
        }
        console.log(nameStr)
    }

    const yearHandler = (e) => {
        
        if (e.target.value < 9999) {
            yearNum = e.target.value
        } else {
            e.target.value = yearNum
        }
        console.log(yearNum)
    }

    const tagHandler = (e) => {
        tagStr = e.target.value
        console.log(tagStr)
    }

    const aboutHandler = (e) => {
        if (e.target.value.length <= 255) {
            aboutStr = e.target.value;
        } else {
            e.target.value = aboutStr
        }
        console.log(aboutStr)
    }

    const imgHandler = (e) => {
        imgFile = e.target.files[0]
console.log(imgFile)
    }

    const handleSubmit = async () => {

        try {
            const inputData = {}
            if (nameStr) {
                inputData.art_name= nameStr
            } if (yearNum > 0) {
                inputData.art_year = yearNum
            } if (tagStr.length > 0) {
                inputData.art_tags = tagStr
            } if (aboutStr) {
                inputData.about = aboutStr
            } if (imgFile) {
                inputData.image = imgFile
            }
            console.log(inputData)
            const formData = new FormData();

            for (const key in inputData) {
                formData.append(key, inputData[key])
            }
            const response = await axios.patch(`https://kane-cv-web-service.onrender.com/pieces/${currentId}`, formData)
            console.log(response.data)
            setSingleData(response.data)
        } catch(err) {
            console.error(err)
        }
    }

    const handleDelete = async() => {
        const response = await axios.delete(`https://kane-cv-web-service.onrender.com/pieces/${currentId}`)
        

        const resetData = async () => {
            const res = await axios.get(`https://kane-cv-web-service.onrender.com/pieces/${currentId}`)
            setArtData(res.data)
        }
        
        resetData()
        setCurrentPage('Portfolio')

        }
    
    


    return (
        <>
        <form>
            
            <label for="editName">Name:</label>
            <input type="text" id="value1" name="editName" maxLength="20" onChange={nameHandler}  required></input>

                
                <label for="editYear">Year:</label>
                <input type="number" id="editYear" name="editYear" onChange={yearHandler} required></input>

                  
                    <label for="editTags">Tags:</label>
                    <input type="text" id="editTags" name="editTags" pattern="^[a-zA-Z]+(,[a-zA-Z]+)*$" title="Enter values separated by commas" onChange={tagHandler} required></input>

                       
                        <label for="editAbout">About:</label>
            <input type="text" id="editAbout" name="editAbout" maxLength="255" onChange={aboutHandler} required></input>

                         
                            <label for="editImage">Image:</label>
            <input type="file" id="editImage" name="image" accept=".png, .gif, .jpg, .jpeg" onChange={imgHandler} required></input>

              
                                <input type="button" value="Submit" onClick={handleSubmit}></input>
        </form>
        
                    <button onClick={()=>{handleDelete()}}>Delete</button>
        </>
)

}

export default EditEntry
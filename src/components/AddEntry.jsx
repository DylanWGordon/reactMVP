import axios from 'axios'

const AddEntry = ({ currentId, setCurrentId, setSingleData, setCurrentPage }) => {
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
            const inputData = {
                art_name: nameStr,
                art_year: yearNum,
                art_tags: tagStr,
                about: aboutStr,
                image: imgFile,
            }
            const formData = new FormData();
            for (const key in inputData) {
                formData.append(key, inputData[key])
            }
            const response = await axios.post(`https://kane-cv-web-service.onrender.com/pieces`, formData)
            console.log(response.data)
            setCurrentId(response.data.id)
        } catch(err) {
            console.error(err)
        }
        const getData = async () => {
            console.log(currentId)
            const res = await axios.get(`https://kane-cv-web-service.onrender.com/pieces/${currentId}`)
            console.log(res.data)
            setSingleData(res.data)
            setCurrentPage('single')
        }
        getData()
    }
    


    return (
        <form>
            <div className='formRow'>Add New Entry:</div>
            <div className='formRow'>

            <label htmlFor="uploadName">Name:</label>
            <input placeholder='name' type="text" id="uploadName" name="uploadName" maxLength="20" onChange={nameHandler}  required></input>

                
                <label htmlFor="uploadYear">Year:</label>
                <input placeholder='Year' type="number" id="uploadYear" name="uploadYear" onChange={yearHandler} required></input>

                  
                    <label htmlFor="uploadTags">Tags:</label>
                <input placeholder='Tags' type="text" id="uploadTags" name="uploadTags" pattern="^[a-zA-Z]+(,[a-zA-Z]+)*$" title="Enter values separated by commas" onChange={tagHandler} required></input>

                       
                        <label htmlFor="uploadAbout">About:</label>
                <input placeholder='About' type="text" id="uploadAbout" name="uploadAbout" maxLength="255" onChange={aboutHandler} required></input>
            </div>
            <div className='formRow'>


                         
                            <label htmlFor="uploadImage">Image:</label>
            <input type="file" id="uploadImage" name="image" accept=".png, .gif, .jpg, .jpeg" onChange={imgHandler} required></input>

              
                                <input type="button" value="Submit" onClick={handleSubmit}></input>
            </div>
                                </form>
)

}

export default AddEntry
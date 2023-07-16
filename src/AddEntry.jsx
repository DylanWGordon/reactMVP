const AddEntry = () => {

    return (
        <form>
            
            <label for="uploadName">Name:</label>
            <input type="text" id="value1" name="uploadName" maxlength="20" required></input>

                
                <label for="uploadYear">Year:</label>
                <input type="number" id="uploadYear" name="uploadYear" required></input>

                  
                    <label for="uploadTags">Tags:</label>
                    <input type="text" id="uploadTags" name="uploadTags" pattern="^[a-zA-Z]+(,[a-zA-Z]+)*$" title="Enter values separated by commas" required></input>

                       
                        <label for="uploadAbout">About:</label>
                        <input type="text" id="uploadAbout" name="uploadAbout" maxlength="255" required></input>

                         
                            <label for="uploadImage">Image:</label>
                            <input type="file" id="uploadImage" name="uploadImage" accept=".png, .gif, .jpg, .jpeg" required></input>

              
                                <input type="submit" value="Submit"></input>
                                </form>
)

}

export default AddEntry
import LeftRowItems from './LeftRowItems'
import CenterRowItems from './CenterRowItems'
import RightRowItems from './RightRowItems'


const Portfolio = ({ artData, setCurrentPage, setCurrentId }) => {
    let leftArr = [];
    let centerArr = [];
    let rightArr = [];
    let j;
    for (let i = 0; i < artData.length; i++){
        j = i + 1;
        if (j % 3 === 0) {
            rightArr.push(artData[i])
        } else if ((j + 1) % 3 === 0) {
            centerArr.push(artData[i])      
        } else if ((j + 2) % 3 === 0) {
            leftArr.push(artData[i])   
        }
          
    }
   
   

        
    

    return (
        <>
        <div className='rowDiv' id='leftRow'>
                <LeftRowItems setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} leftArr={leftArr} />
        </div>
        <div className='rowDiv' id='centerRow'>
                <CenterRowItems setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} centerArr={centerArr} />
        </div>
        <div className='rowDiv' id='rightRow'>
                <RightRowItems setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} rightArr={rightArr} />
        </div>
    </>
    )
}

export default Portfolio;
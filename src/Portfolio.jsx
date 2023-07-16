import LeftRowItems from './LeftRowItems'
import CenterRowItems from './CenterRowItems'
import RightRowItems from './RightRowItems'


const Portfolio = ({ artData }) => {
    let leftArr = [];
    let centerArr = [];
    let rightArr = [];
    let j;
    for (let i = 0; i < artData.length; i++){
        j = i + 1;
        if (j % 3 === 0) {
            rightArr.push(artData[i])
            console.log('3')
        } else if ((j + 1) % 3 === 0) {
            centerArr.push(artData[i])
            console.log('2')
        } else if ((j + 2) % 3 === 0) {
            leftArr.push(artData[i])
            console.log('1')
        }
            console.log(i)
    }
    // if (newData.length < 9) {
    //     newData.push(...[...leftArr, ...centerArr, ...rightArr])
    //     leftArr = [];
    //     centerArr = [];
    //     rightArr = [];
        
    

    return (
        <>
        <div className='rowDiv' id='leftRow'>
                <LeftRowItems leftArr={leftArr} />
        </div>
        <div className='rowDiv' id='centerRow'>
                <CenterRowItems centerArr={centerArr} />
        </div>
        <div className='rowDiv' id='rightRow'>
                <RightRowItems rightArr={rightArr} />
        </div>
    </>
    )
}

export default Portfolio;
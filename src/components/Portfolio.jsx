import axios from 'axios';
import { useState, useEffect } from 'react';
import LeftRowItems from './LeftRowItems'
import CenterRowItems from './CenterRowItems'
import RightRowItems from './RightRowItems'


const Portfolio = ({ currentPage, setCurrentPage, setCurrentId }) => {
    let leftArr = [];
    let centerArr = [];
    let rightArr = [];
    let j;
    const [reloadData, setReloadData] = useState({})
    const getUpdate = async () => {
        const res = await axios.get('https://kane-cv-web-service.onrender.com/pieces')
        setReloadData(res.data)
    }
    useEffect(()=>{
        getUpdate()
    }, [])
        for (let i = 0; i < reloadData.length; i++) {
            j = i + 1;
            if (j % 3 === 0) {
                rightArr.push(reloadData[i])
            } else if ((j + 1) % 3 === 0) {
                centerArr.push(reloadData[i])
            } else if ((j + 2) % 3 === 0) {
                leftArr.push(reloadData[i])
            }
        }

    return (
        <>
        <div className='rowDiv' id='leftRow'>
                <LeftRowItems  setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} leftArr={leftArr} currentPage={currentPage} />
        </div>
        <div className='rowDiv' id='centerRow'>
                <CenterRowItems  setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} centerArr={centerArr} currentPage={currentPage} />
        </div>
        <div className='rowDiv' id='rightRow'>
                <RightRowItems  setCurrentPage={setCurrentPage} setCurrentId={setCurrentId} rightArr={rightArr} currentPage={currentPage} />
        </div>
    </>
    )
}

export default Portfolio;
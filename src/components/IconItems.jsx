import { useState } from 'react'

function IconItems() {
    const [hi, setHi] = useState(false)

    const inHi = () => {
        setHi(true)
    }
    const outHi = () => {
        setHi(false)
    }

    if (hi === true) {
        return <img id='iconIMG' src='https://fieryramencv.s3.us-west-2.amazonaws.com/static/fieryramenIcon4.png' onMouseOut={outHi}></img>
    } else {
        return <img id='iconIMG' src='https://fieryramencv.s3.us-west-2.amazonaws.com/static/fieryramenIcon5.png' onMouseOver={inHi}></img>
    }
}
export default IconItems
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
        return <img id='iconIMG' src='src/assets/fieryramenIcon4.png' onMouseOut={outHi}></img>
    } else {
        return <img id='iconIMG' src='src/assets/fieryramenIcon5.png' onMouseOver={inHi}></img>
    }
}
export default IconItems
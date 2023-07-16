import { useState } from 'react'
import AddEntry from './AddEntry.jsx'

const Filters = () => {
    const [expanded, setExpanded] = useState(false)

    const toggle = () => {
        setExpanded(!expanded)
    }

    if (expanded === false) {
        return <button id='collapsedFilter' onClick={() => toggle()}>v</button>
    } else {
        return (
            <div>
                <AddEntry />
                <button onClick={()=>toggle()}>^</button>
            </div>
        )
    }



}

export default Filters
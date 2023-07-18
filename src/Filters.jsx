import { useState } from 'react'
import AddEntry from './AddEntry.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import EditEntry from './EditEntry.jsx'

const Filters = ({ currentPage, setArtData }) => {
    const [expanded, setExpanded] = useState(false)

    const toggle = () => {
        setExpanded(!expanded)
    }
    if (currentPage !== 'single') {
        if (expanded === false) {
            return <div id='collapsedFilter'>
                <Breadcrumbs />
                <button onClick={() => toggle()}>v</button>
            </div>
        } else {
            return (
                <div id='filterBar' class='rounded'>
                    <Breadcrumbs />
                    <AddEntry setArtData={setArtData} />
                    <button onClick={() => toggle()}>^</button>
                </div>
            )
        }
    } else {
        if (expanded === false) {
            return <div id='collapsedFilter'>
                <Breadcrumbs />
                <button onClick={() => toggle()}>v</button>
            </div>
        } else {
            return (
                <div id='filterBar' class='rounded'>
                    <Breadcrumbs />
                    <EditEntry />
                    <button onClick={() => toggle()}>^</button>
                </div>
            )
        }
    }



}

export default Filters
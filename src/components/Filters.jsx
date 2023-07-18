import { useState } from 'react'
import AddEntry from './AddEntry.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import EditEntry from './EditEntry.jsx'

const Filters = ({ setCurrentPage, currentPage, setArtData, setSingleData, currentId, crumb }) => {
    const [expanded, setExpanded] = useState(false)
    const toggle = () => {
        setExpanded(!expanded)
    }
    if (currentPage !== 'single') {
        if (expanded === false) {
            return <div id='collapsedFilter'>
                <Breadcrumbs setCurrentPage={setCurrentPage} crumb={crumb} />
                <button onClick={() => toggle()}>v</button>
            </div>
        } else {
            return (
                <div id='filterBar' class='rounded'>
                    <Breadcrumbs setCurrentPage={setCurrentPage} crumb={crumb} />
                    <AddEntry setArtData={setArtData} />
                    <button onClick={() => toggle()}>^</button>
                </div>
            )
        }
    } else {
        if (expanded === false) {
            return <div id='collapsedFilter'>
                <Breadcrumbs setCurrentPage={setCurrentPage} />
                <button onClick={() => toggle()}>v</button>
            </div>
        } else {
            return (
                <div id='filterBar' class='rounded'>
                    <Breadcrumbs setCurrentPage={setCurrentPage} />
                    <EditEntry setSingleData={setSingleData} currentId={currentId} setCurrentPage={setCurrentPage} />
                    <button onClick={() => toggle()}>^</button>
                </div>
            )
        }
    }



}

export default Filters
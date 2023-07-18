import { useState } from 'react'
import AddEntry from './AddEntry.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import EditEntry from './EditEntry.jsx'
import ToggleButton from './ToggleButton.jsx'

const Filters = ({ setCurrentPage, currentPage, setArtData, setSingleData, setCurrentId, currentId, crumb }) => {
    const [expanded, setExpanded] = useState(false)
    const toggle = () => {
        setExpanded(!expanded)
    }

    if (currentPage !== 'single') {
        if (expanded === false) {
            return <div id='collapsedFilter'>
                <Breadcrumbs setCurrentPage={setCurrentPage} crumb={crumb} />
                <ToggleButton toggle={toggle} inner='v' />
            </div>
        } else {
            return (
                <div id='filterBar' className='rounded'>
                    <Breadcrumbs setCurrentPage={setCurrentPage} crumb={crumb} />
                    <AddEntry setArtData={setArtData} setCurrentId={setCurrentId} setCurrentPage={setCurrentPage} />
                    <ToggleButton toggle={toggle} inner='^'/>
                </div>
            )
        }
    } else {
        if (expanded === false) {
            return <div id='collapsedFilter'>
                <Breadcrumbs setCurrentPage={setCurrentPage} />
                <ToggleButton toggle={toggle} inner='v'/>
            </div>
        } else {
            return (
                <div id='filterBar' className='rounded'>
                    <Breadcrumbs setCurrentPage={setCurrentPage} />
                    <EditEntry setArtData={setArtData} setSingleData={setSingleData} currentId={currentId} setCurrentPage={setCurrentPage} />
                    <ToggleButton toggle={toggle} inner='^' />
                </div>
            )
        }
    }



}

export default Filters
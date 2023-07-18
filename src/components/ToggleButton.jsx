const ToggleButton = ({ toggle, inner }) => {
    

    return <button onClick={() => toggle()}>{inner}</button>

}

export default ToggleButton;
const WidgetLabel = ({ labelText, labelFor, inputFunc, placeholder, defaults }) => {
    return (
        <div className="pDiv">
            <label className="listingP boldFont" htmlFor={labelFor}>{labelText}</label> <input type="text" maxLength={50} placeholder={placeholder ? placeholder : null} defaultValue={defaults ? defaults : null} id={labelFor} onChange={(e) => inputFunc(e.target.value)} />
        </div>
    )
}
export default WidgetLabel

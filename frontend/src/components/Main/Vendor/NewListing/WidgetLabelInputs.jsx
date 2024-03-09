const WidgetLabel = ({ labelText, labelFor, inputFunc, placeholder }) => {
    return (
        <div className="pDiv">
            <label className="listingP boldFont" htmlFor={labelFor}>{labelText}</label> <input type="text" maxLength={50} placeholder={placeholder ? placeholder : null} id={labelFor} onChange={(e) => inputFunc(e.target.value)} />
        </div>
    )
}
export default WidgetLabel

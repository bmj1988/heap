const WidgetLabel = ({ labelText, labelFor, inputFunc }) => {
    return (
        <div className="pDiv">
            <label className="listingP boldFont" htmlFor={labelFor}>{labelText}</label> <input type="text" maxLength={50} id={labelFor} onChange={(e) => inputFunc(e.target.value)} />
        </div>
    )
}
export default WidgetLabel

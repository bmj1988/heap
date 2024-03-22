const PriceInput = ({ setPrice }) => {

    const handleChange = (e) => {
        e.preventDefault();
        setPrice(e.target.value)
    }

    return (
        <div className="pDiv">
            <label htmlFor={"askingPrice"} className="listingP boldFont">
                {"Asking Price"}
            </label>
            <input type="number" placeholder="Optional" min={0} max={5000} step={20} id={"askingPrice"} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default PriceInput

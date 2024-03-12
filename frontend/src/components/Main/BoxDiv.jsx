const PurpleOutlineDiv = ({ boldText, smallText, logo, css, clicker, widget, topClick }) => {
    return (
        <div className={css} >
            <div style={{ cursor: "pointer" }} onClick={clicker ? () => clicker() : () => console.log('click')}>
                {logo ? logo : null}
                {boldText.length > 0 && <p>{boldText}</p>}
            </div>
            <div className="divBorderBottom"></div>
            {smallText.length > 0 && <p className="smallText">{smallText}</p>}
            <div>
                {widget}
            </div>
        </div>
    )
}

export default PurpleOutlineDiv

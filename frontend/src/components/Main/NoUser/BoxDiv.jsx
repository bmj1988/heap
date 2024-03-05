const PurpleOutlineDiv = ({ boldText, smallText, logo, css, clicker }) => {
    return (
        <div className={css} onClick={clicker ? () => clicker() : () => console.log('click')}>
            {logo}
            <p>{boldText}</p>
            <div className="divBorderBottom"></div>
            <p className="smallText">{smallText}</p>
        </div>
    )
}

export default PurpleOutlineDiv

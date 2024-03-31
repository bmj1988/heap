import './listing.css'

const ListingDetail = ({ css, text, value }) => {
    return (
        <div className={css || null}>
            <p className='boldFont slpBold'>{text}</p> <p className='slpValue'>{value}</p>
        </div>
    )
}

export default ListingDetail;

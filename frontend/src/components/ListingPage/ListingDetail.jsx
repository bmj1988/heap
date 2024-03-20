import './listing.css'

const ListingDetail = ({ css, text, value }) => {
    return (
        <div className={css || null}>
            <p className='boldFont'>{text}</p> <p>{value}</p>
        </div>
    )
}

export default ListingDetail;

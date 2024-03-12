import '../../main.css'

const SingleMessageDiv = ({ message }) => {
    return (
        <div className="smdMain">
            <div className="listingSection">
                <div className='pDiv'>
                    <p className="listingP boldFont">From:</p><p className='listingP'>{`Agent ${message.fromId}`} </p>
                </div>
                <div className='pDiv'>
                    <p className="listingP boldFont">Sent:</p><p className='listingP'> {new Date(message.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='pDiv'>
                    <p className="listingP boldFont">Bid:</p><p className='listingP'> {`no. ${message.bidId}`}</p>
                </div>
                <div className='pDiv'>
                    <p className="listingP boldFont">Message: </p><p className='listingP message'>{message.content}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleMessageDiv;

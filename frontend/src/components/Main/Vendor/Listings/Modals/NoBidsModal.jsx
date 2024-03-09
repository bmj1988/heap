import '../../../main.css'

const NoBidsModal = ({ closeModal }) => {
    return (
        <div className='camMain nbmMain textmark'>
            <header>No bids</header>
            <p>This listing currently has no bids to accept.</p>
            <div className='ok' onClick={(e) => {
                e.preventDefault()
                closeModal()
            }}><button className='textmark'>OK</button></div>
        </div>
    )
}

export default NoBidsModal;

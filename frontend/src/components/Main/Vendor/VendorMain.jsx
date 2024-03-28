import { FaCube, FaCubes, FaEnvelope, FaHistory } from 'react-icons/fa'
import '../main.css'
import PurpleOutlineDiv from '../BoxDiv.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messagesArray, thunkVendorHome } from '../../../redux/owner.js'
import ListingsWidget from './Listings/ListingsWidget.jsx'
import NewListingWidget from './NewListing/NewListingWidget.jsx'
import Spinner from '../../Spinner.jsx'
import MessagesWidget from './Messages/MessagesWidget.jsx'
import ListingHistoryWidget from './Listings/History/ListingHistoryWidget.jsx'

const OwnerMain = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const messages = useSelector(messagesArray)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        dispatch(thunkVendorHome()).then(() => setLoaded(true))
    }, [])

    if (!loaded) return (<Spinner />)

    return (
        <div className='mpd'>
            <PurpleOutlineDiv boldText={'Create a new listing'} smallText={""} logo={<FaCube className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv firstDiv flex-start'} clicker={() => navigate('/listings/new')} widget={<NewListingWidget />} />
            <PurpleOutlineDiv boldText={'Current listings'} smallText={""} logo={<FaCubes className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv flex-start'} clicker={() => navigate('/my-listings')} widget={<ListingsWidget />} />
            <PurpleOutlineDiv boldText={'Messages'} smallText={""} logo={<FaEnvelope className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv flex-start'} clicker={() => navigate('/messages')} widget={<MessagesWidget messages={messages} />} />
            <PurpleOutlineDiv boldText={'Past listings'} smallText={""} logo={<FaHistory className='cube heapPurple' />} css={"purpleOutlineDiv colorDiv lastDiv flex-start"} clicker={() => navigate('/history')} widget={<ListingHistoryWidget />} />
        </div>
    )
}

export default OwnerMain

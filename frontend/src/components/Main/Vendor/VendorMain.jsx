import { FaCube, FaCubes, FaEnvelope, FaHistory } from 'react-icons/fa'
import '../main.css'
import PurpleOutlineDiv from '../BoxDiv.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkVendorHome } from '../../../redux/owner.js'
import ListingsWidget from './Listings/ListingsWidget.jsx'
import NewListingWidget from './NewListing/NewListingWidget.jsx'
import Spinner from '../../Spinner.jsx'

const OwnerMain = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        dispatch(thunkVendorHome()).then(() => setLoaded(true))
    })

    if (!loaded) return (<Spinner />)

    return (
        <div className='mpd'>
            <PurpleOutlineDiv boldText={'Create a new listing'} smallText={""} logo={<FaCube className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv firstDiv flex-start'} widget={<NewListingWidget />} />
            <PurpleOutlineDiv boldText={'Current listings'} smallText={""} logo={<FaCubes className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv flex-start'} clicker={null} widget={<ListingsWidget />} />
            <PurpleOutlineDiv boldText={'Messages'} smallText={""} logo={<FaEnvelope className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv flex-start'} clicker={null} />
            <PurpleOutlineDiv boldText={'Past listings'} smallText={""} logo={<FaHistory className='cube heapPurple' />} css={"purpleOutlineDiv colorDiv lastDiv flex-start"} clicker={null} />
        </div>
    )
}

export default OwnerMain

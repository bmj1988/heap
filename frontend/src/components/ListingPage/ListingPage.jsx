import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { thunkListingDetails } from '../../redux/listing'
import './listing.css'
import AgentListingPage from './Agent/AgentListingPage'

const VendorListingPage = React.lazy(() => import('./Vendor/VendorListingPage'))

const ListingPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user)
    const listing = useSelector((state) => state.listings.listing)

    useEffect(() => {
        const loadDetailsFirst = async () => {
            const response = await dispatch(thunkListingDetails(id))
            if (response) {
                navigate('/404')
            }
        }
        loadDetailsFirst();
    }, [dispatch, navigate, id])

    return (
        <React.Suspense fallback={<Spinner />}>
            {user.owner && listing ? <VendorListingPage listing={listing} /> : null}
            {user.agent && listing ? <AgentListingPage listing={listing} agentId={user.Agent.id} /> : null}
        </React.Suspense>
    )
}

export default ListingPage;

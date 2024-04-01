import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'
import { useEffect, lazy, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { thunkListingDetails } from '../../redux/listing'
import './listing.css'

const VendorListingPage = lazy(() => import('./Vendor/VendorListingPage'))
const AgentListingPage = lazy(() => import('./Agent/AgentListingPage'))

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
        <Suspense fallback={<Spinner />}>
            {user.owner && listing ? <VendorListingPage listing={listing} /> : null}
            {user.agent && listing ? <AgentListingPage listing={listing} agentId={user.Agent.id} /> : null}
        </Suspense>
    )
}

export default ListingPage;

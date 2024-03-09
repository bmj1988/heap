import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { thunkListingDetails } from '../../redux/listing'
import './listing.css'

const VendorListingPage = React.lazy(() => import('./VendorListingPage'))

const ListingPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const [loaded, setLoaded] = useState(false)
    const listing = useSelector((state) => state.listings[id])

    useEffect(() => {
        const loadDetailsFirst = async () => {
            await dispatch(thunkListingDetails(id))
            setLoaded(true)
        }
        loadDetailsFirst();
    }, [dispatch, loaded, id])

    if (!loaded) return (<Spinner />)
    return (
        <React.Suspense fallback={<Spinner />}>
            {user.owner && listing ? <VendorListingPage listing={listing} func={setLoaded}/> : null}
            {/* {user.agent ? <AgentListingPage listing={listing} /> : null} */}
        </React.Suspense>
    )
}

export default ListingPage;

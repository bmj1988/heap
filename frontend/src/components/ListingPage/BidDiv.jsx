import React from 'react'

const SingleBid = React.lazy(() => import("./SingleBid"))

const BidDiv = ({ bids }) => {
    const showBids = bids.filter((bid) => bid.accepted === false)

    return (
        <>
            {showBids.length > 0 && <div className="bd">
                {showBids.map((bid) => {
                    return (
                        <React.Suspense fallback="Loading...">
                            <SingleBid bid={bid} key={bid.id} />
                        </React.Suspense>
                    )

                })}

            </div>}
        </>
    )
}

export default BidDiv;

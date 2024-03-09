import Spinner from "../Spinner"
import { useSelector } from "react-redux"
import React, { Suspense } from "react"

const MainNoUser = React.lazy(() => import("./NoUser/MainNoUser"))
const VendorMain = React.lazy(() => import("./Vendor/VendorMain"))
const AgentMain = React.lazy(() => import("./Agent/AgentMain"))

const MainPage = () => {
    const user = useSelector((state) => state.session.user)

    return (
        <Suspense fallback={<Spinner />}>
            {user === null ? <MainNoUser /> : null}
            {user?.owner === true ? <VendorMain user={user} /> : null}
            {user?.agent === true ? <AgentMain user={user} /> : null}
        </Suspense>
    )
}

export default MainPage

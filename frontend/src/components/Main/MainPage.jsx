import Spinner from "../Spinner"
import { useSelector } from "react-redux"
import MainNoUser from "./NoUser/MainNoUser"
import OwnerMain from "./Owner/OwnerMain"
import AgentMain from "./Agent/AgentMain"

const MainPage = () => {
    const user = useSelector((state) => state.session.user)

    if (user === undefined) return (<Spinner />)
    else if (user === null) return (<MainNoUser />)
    else if (user.owner) return (<OwnerMain user={user}/>)
    else if (user.agent) return (<AgentMain user={user}/>)

}

export default MainPage

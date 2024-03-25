import { useSelector } from "react-redux";

const ModalSingleReply = ({message, agent}) => {
    const user = useSelector((state) => state.session.user)
    const yours = message.fromId === user.id
    const them = user.agent ? "Vendor" : agent.name
    const sent = new Date(message.createdAt)

    return (
        <div className={yours ? "srmMain yours textmark" : "srmMain textmark"}>
            <p className="boldFont">{yours ? "You:" : `${them}:` }</p>
            <p> {message.content} </p>
            <p className="lastP"> {`${sent.getMonth()}/${sent.getDate()}, ${sent.getHours() > 12 ? sent.getHours() - 12 : sent.getHours()}:${sent.getMinutes() < 10 ? "0" + sent.getMinutes() : sent.getMinutes()} ${sent.getHours() < 12 ? "AM" : "PM"}`} </p>
        </div>
    )
}

export default ModalSingleReply;

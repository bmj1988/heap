import InboxMessageDiv from "./InboxMessageDiv";
import './message.css'


const Inbox = ({ inbox }) => {

    return (
        <div className="inboxMain textmark">
            <h2>Inbox</h2>
            {inbox.map((message) => {
                return (<InboxMessageDiv message={message} key={message.id} />)
            })}
        </div>
    )
}

export default Inbox;

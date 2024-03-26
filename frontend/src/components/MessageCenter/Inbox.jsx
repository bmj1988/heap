import InboxMessageDiv from "./InboxMessageDiv";
import './message.css'


const Inbox = ({ inbox }) => {

    return (
        <div className="inboxMain textmark">
            <h2>Inbox</h2>
            {!inbox.length && <p>You have no messages in your inbox at this time.</p>}
            {inbox.map((message) => {
                return (<InboxMessageDiv message={message} key={message.id} />)
            })}
        </div>
    )
}

export default Inbox;

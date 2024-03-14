import InboxMessageDiv from "./InboxMessageDiv";
import './message.css'


const Outbox = ({ outbox }) => {

    return (
        <div className="inboxMain textmark">
            <h2>Sent</h2>
            {outbox.map((message) => {
                return (<InboxMessageDiv message={message} />)
            })}
        </div>
    )
}

export default Outbox;

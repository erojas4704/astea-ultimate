import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { useInteractions } from "./hooks/serviceOrderHooks";

const InteractionsView = ({ serviceOrder }) => {
    const {interactions, loading, error} = useInteractions(serviceOrder);

    return (<>
        <div className="label">
            Interactions
        </div>
            {loading && <FontAwesomeIcon className="fa-spin sv-spinner" style={{ fontSize: "26px"}} icon={faCircleNotch} />}
        
        {interactions && interactions.map(interaction => (
            <div className="interaction" key={uuid()}>
                <div className="interaction-header">
                    <div className="interaction-author">{interaction.author}</div>
                    <div className="interaction-date">{moment(interaction.date).format('MM/DD/yyyy  h:mm a')}</div>
                </div>
                <div className="interaction-message">
                    {interaction.message}
                </div>
            </div>
        ))}
    </>);
}

export default InteractionsView;
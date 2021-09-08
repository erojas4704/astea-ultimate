import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useInteractions } from "./hooks/serviceOrderHooks";
import "./OrderView.css";

const InteractionsView = ({ serviceOrder }) => {
    const { interactions, loading, error } = useInteractions(serviceOrder);
    const [addingInteraction, setAddingInteraction] = useState(false);
    const [newInteractionText, setNewInteractionText] = useState("");
    const [postingInteraction, setPostingInteraction] = useState(false);

    useEffect(() => {
        //Reset everything.
        setNewInteractionText("");
        setAddingInteraction(false);
        setPostingInteraction(false);
    }, [serviceOrder]);

    const addBlankInteraction = () => {
        setAddingInteraction(true);
        //TBD
    }

    const submitInteraction = async (e) => {
        e.preventDefault();
        setPostingInteraction(true);
        console.log("Sending out new interaction");
        const resp = await axios.post("/ServiceOrder/Interactions",
            {
                id: serviceOrder.id,
                message: newInteractionText
            }
        );
        setPostingInteraction(false);
        console.log(resp);
    }

    //TODO allow adding rapid fire interactions. Maybe instead just add the new one to the thing with a red spinner for uploading.

    return (<>
        <div className="label">
            Interactions
        </div>
        {loading && <FontAwesomeIcon className="fa-spin sv-spinner" style={{ fontSize: "26px" }} icon={faCircleNotch} />}

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
        {addingInteraction &&
            <>
                <div>New Interaction: </div>
                <form className="add-interaction-form" onSubmit={submitInteraction}>
                    <textarea className="add-interaction-textarea" value={newInteractionText} onChange={(e) => setNewInteractionText(e.target.value)} disabled={postingInteraction}/>
                    <button className="btn btn-primary" type="submit" style={{ width: 'auto' }} disabled={postingInteraction}>Add</button>
                    <button className="btn btn-danger mx-2" onClick={() => setAddingInteraction(false)} style={{ width: 'auto' }} disabled={postingInteraction}>Cancel</button>
                </form>
            </>
        }
        <div className="" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!addingInteraction &&
                <button className="btn btn-success mx-3" onClick={addBlankInteraction} style={{ width: 'auto' }}> <FontAwesomeIcon icon={faPlus} /></button>
            }
        </div>
    </>);
}

export default InteractionsView;
import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useInteractions } from "../hooks/serviceOrderHooks";
import { addInteraction, retrieveInteractions } from "./orderSlice";
import "./OrderView.css";

const InteractionsView = ({ serviceOrder }) => {
    const [addingInteraction, setAddingInteraction] = useState(false);
    const [newInteractionText, setNewInteractionText] = useState("");
    const [postingInteraction, setPostingInteraction] = useState(false);
    const dispatch = useDispatch();

    const interactionsData = useSelector(state => state.orders[serviceOrder.id]?.interactions);

    const { interactions, status, error } = interactionsData || {};


    useEffect(() => {
        //Reset everything.
        setNewInteractionText("");
        setAddingInteraction(false);
        setPostingInteraction(false);

        dispatch(retrieveInteractions({ id: serviceOrder.id }));
    }, [serviceOrder.id]);

    const addBlankInteraction = () => {
        setAddingInteraction(true);
        //TBD
    }

    const submitInteraction = async (e) => {
        /*
        e.preventDefault();
        const message = newInteractionText;
        setNewInteractionText("");
        setPostingInteraction(true);
        setAddingInteraction(false);
        const newInteraction = { message, date: new Date(), author: "Me", uploading: true };
        //TODO Timeline.push(addInteraction etc.); For the undo functionality.
        interactions.push(newInteraction); //TODO make the author my name
        const resp = await axios.post("/ServiceOrder/Interactions",
            {
                id: serviceOrder.id,
                message: newInteractionText
            }
        );
        newInteraction.uploading = false;
        setPostingInteraction(false);
        */
       dispatch(addInteraction({ id: serviceOrder.id, message: newInteractionText }));
       setNewInteractionText("");
    }

    //TODO allow adding rapid fire interactions. Maybe instead just add the new one to the thing with a red spinner for uploading.

    return (<>
        <div className="label">
            Interactions
        </div>
        {error && <div className="error">{error.toString()}</div>}
        {status === "pending" && <FontAwesomeIcon className="fa-spin sv-spinner" style={{ fontSize: "26px" }} icon={faCircleNotch} />}

        {interactions && interactions.map(interaction => (
            <div className="interaction" key={uuid()}>
                <div className="interaction-header">
                    <div className="interaction-author">{interaction.author}</div>
                    <div className="interaction-date">{moment(interaction.date).format('MM/DD/yyyy  h:mm a')}</div>
                    {interaction.uploading && <FontAwesomeIcon className="fa-spin sv-spinner mx-2" style={{ fontSize: "26px", color: "#d63031" }} icon={faCircleNotch} />}
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
                    <textarea className="add-interaction-textarea" value={newInteractionText} onChange={(e) => setNewInteractionText(e.target.value)} />
                    <button className="btn btn-primary" type="submit" style={{ width: 'auto' }}>Add</button>
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
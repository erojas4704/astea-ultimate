import { faEdit, faExclamationTriangle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import useTechnicians from "../hooks/useTechnicians";
import "./interaction.css";
export default function Interaction({ interaction, onDelete, onEdit }) {
    const [editMode, setEditMode] = useState(false);
    const [interactionInput, setInteractionInput] = useState(interaction.message);
    const [deleteMode, setDeleteMode] = useState(false);

    //TODO refactor. No longer use a hook for technicians. use our store.
    const technicians = useTechnicians();
    console.log(technicians);
    console.log(interaction);
    const technician = interaction.author 
    //|| (!technicians.isLoadingTechnicians && technicians.technicians)?
    //     technicians.technicians.find(t => t.id === interaction.technicianId) :
    //     interaction.technicianId;

    const ageInDays = moment().diff(moment(interaction.date), "days");
    const strAge =
        ageInDays === 0 ? "today" :
            ageInDays === 1 ? "yesterday" :
                ageInDays < 60 ? `${ageInDays} days` :
                    ageInDays < 365 ? `${Math.round(ageInDays / 30)} m` :
                        `${Math.round(ageInDays / 365)} y`;

    const handleDelete = () => {
        if (deleteMode) {
            onDelete(interaction);
        } else {
            setDeleteMode(true);
            setTimeout(() => setDeleteMode(false), 3000);
        }
    }

    const handleEdit = () => {
        if (editMode) {
            setEditMode(false);
        } else {
            setEditMode(true);
            //setInteractionInput(interaction.message);
        }
    }

    return (
        <div className="interaction">
            <div className="interaction-title">
                {interaction.status && interaction.status === "updating" && <span><Spinner animation="border" role="status" variant="warning"/></span>}
                {interaction.status && interaction.status === "deleting" && <span><Spinner animation="border" role="status" variant="danger"/></span>}
                <span>{technician}</span>
                <span>
                    {moment(interaction.date).format('MM/DD/yyyy')} ({strAge})
                    <FontAwesomeIcon id="interaction-edit" className="interaction-nav" icon={faEdit} color="Gray" onClick={handleEdit} style={{ marginLeft: '1em' }} />
                    <FontAwesomeIcon id="interaction-trash" className={deleteMode ? "interaction-nav delete" : "interaction-nav"} icon={deleteMode ? faExclamationTriangle : faTrash} color="Gray" onClick={handleDelete} />
                </span>
            </div>
            <div className="interaction-content">
                {editMode ?
                    <div>
                        <Form.Control value={interactionInput} as="textarea" onChange={e => setInteractionInput(e.target.value)}>

                        </Form.Control>
                        <div className="d-flex flex-row justify-content-end m-1">
                            <Button className="mx-2" variant="primary" style={{ color: 'white', backgroundColor: '#3498db' }} onClick={() => onEdit(interactionInput)}>Save</Button>
                            <Button variant="warning" style={{ color: 'white', backgroundColor: '#e67e22' }} onClick={() => setEditMode(false)}>Cancel</Button>
                        </div>
                    </div> :
                    <>{interaction.message}</>
                }
            </div>
        </div>
    )
}
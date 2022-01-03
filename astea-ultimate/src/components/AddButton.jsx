import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AddButton.css";

export default function AddButton() {
    return (
        <FontAwesomeIcon
            className="add-button"
            size="lg"
            icon={faPlus}
        />
    )
}
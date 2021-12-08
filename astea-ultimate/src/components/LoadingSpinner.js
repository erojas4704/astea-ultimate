import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingSpinner() {
    return <FontAwesomeIcon className="fa-spin sv-spinner" icon={faCircleNotch} />
}
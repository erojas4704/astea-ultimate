import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingSpinner({ variant }) {
    return <FontAwesomeIcon className={`fa-spin sv-spinner text-${variant}`}  icon={faCircleNotch} />
}
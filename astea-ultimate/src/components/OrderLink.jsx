import { Link } from "react-router-dom";

export default function OrderLink({ id }) {
    return <Link to={{ pathname: `/astea/ServiceOrder2/${id}` }} >{id}</Link>
}
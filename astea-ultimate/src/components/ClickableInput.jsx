import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAuditOrder } from "../actions/audit";
import "./ClickableInput.css";

//TODO Make the dispatch part of an HOC
export default function ClickableInput({ order }) {
    const input = useRef(null);
    const [focused, setFocused] = useState(false);
    const dispatch = useDispatch(state => state.audit);

    const handleBlur = e => {
        setFocused(false);
        if (input.current.value !== order.audit?.location) {
            dispatch(updateAuditOrder(order.id, e.target.value, null, null, false));
        }
    }

    return (
        <div onClick={() => input.current.focus()} style={{ cursor: "text" }}>
            <input
                onFocus={() => setFocused(true)}
                onBlur={handleBlur}
                ref={input}
                className={focused ? "text" : "disabled"}
                type="text"
                style={{ width: '3em', cursor: 'text' }}
                defaultValue={order.audit?.location || ""}
            />
        </div>
    );
}
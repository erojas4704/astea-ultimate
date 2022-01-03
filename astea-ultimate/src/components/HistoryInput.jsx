import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import "./SearchInputs.css";

export default function HistoryInput({ name, id, onChange }) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { className: "text-muted", value: "" },
        { className: "text-success", value: "Y" },
        { className: "text-danger", value: "N" },
    ];

    function handleClick(e) {
        let nextStep = currentStep + 1;
        if(nextStep >= steps.length) nextStep = 0;
        setCurrentStep(nextStep);
        onChange(steps[nextStep].value);
    }

    return (
        <Form.Group
            className={`${steps[currentStep].className} search-input-mini`}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faHistory} size='lg' />
            <input type="hidden" id={id} name={name} value={steps[currentStep].value} />
        </Form.Group>
    );
}
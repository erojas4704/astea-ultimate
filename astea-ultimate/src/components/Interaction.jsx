import moment from "moment";
import useTechnicians from "../hooks/useTechnicians";
import "./interaction.css";
export default function Interaction({ interaction }) {
    const technicians = useTechnicians();
    const technician = technicians.technicians ?
        technicians.technicians.find(t => t.id === interaction.technicianId) :
        interaction.technicianId;

    const ageInDays = moment().diff(moment(interaction.date), "days");
    const strAge =
        ageInDays === 0 ? "earlier today" :
            ageInDays === 1 ? "yesterday" :
                ageInDays < 60 ? `${ageInDays} days ago` :
                    ageInDays < 365 ? `${Math.round(ageInDays / 30)} months ago` :
                        `${Math.round(ageInDays / 365)} years ago`;

    return (<div className="interaction">
        <div className="interaction-title">
            <span>{technician}</span>
            <span>{moment(interaction.date).format('MM/DD/yyyy')} ({strAge})</span>
        </div>
        <div className="interaction-content">
            {interaction.message}
        </div>
    </div>)
}
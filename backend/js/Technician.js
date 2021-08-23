class Technician {
    constructor(data) {
        this.parseTechnicianData(data);
    }

    parseTechnicianData(data) {
        this.id = data['sa_person_id'][0]._;
        this.name = data['person_search_name'][0]._;
        this.actionGroupID = data['person_actgr_id'][0]._;
        this.actionGroup = data['descr'][0]._;
    }
}

module.exports = Technician;
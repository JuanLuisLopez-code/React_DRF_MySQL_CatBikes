import Api from './Api';

const CreateIncident = (data) => {
    return Api().post('incidents', { 'incident': data });
};

const GetIncidentsUser = () => {
    return Api().get('incidentsUser');
}

const IncidentService = {
    CreateIncident,
    GetIncidentsUser,
};

export default IncidentService;
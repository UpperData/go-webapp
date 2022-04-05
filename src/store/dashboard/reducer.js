import {SET_MENU, SET_ROLE, SET_CIVIL_STATUS_TYPES, SET_PHONE_TYPES_LIST, SET_PATIENT_TYPES} from '../types'

const initialState = {
    menu:               null,
    role:               null,
    civilStatusTypes:   null,
    phoneTypesList:     null,
    patientTypes:       null
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MENU:
            return{
               ...state,
               menu: action.payload
            };

        case SET_ROLE:
            return{
                ...state,
                role: action.payload
            };

        case SET_CIVIL_STATUS_TYPES:
            return{
                ...state,
                civilStatusTypes: action.payload
            };

        case SET_PHONE_TYPES_LIST:
            return{
                ...state,
                phoneTypesList: action.payload
            };

        case SET_PATIENT_TYPES:
            return{
                ...state,
                patientTypes: action.payload
            };
        
        default: return state;
    }
}

export default dashboardReducer;
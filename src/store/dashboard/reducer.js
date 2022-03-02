import {SET_MENU, SET_ROLE} from '../types'

const initialState = {
    menu: null,
    role: null
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
        
        default: return state;
    }
}

export default dashboardReducer;
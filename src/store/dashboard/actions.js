import axios from '../../auth/fetch';
import {SET_MENU, SET_ROLE} from '../types'

export const set_menu = (role) => {
    let url = `/panel/mEnu/GeT/${role}`;

    return async dispatch => {
        await axios
          .get(url)
          .then(res => {
            console.log(res);

            if(res){
                dispatch({
                    type: SET_MENU,
                    payload: res
                })
            }
          })
          .catch(err => console.log(err + "action"))
    }
}

export const set_role = (role) => {
    let dataRole = role;
    localStorage.setItem("role", JSON.stringify(role));
    
    return async dispatch => {
        dispatch({
            type: SET_ROLE,
            payload: dataRole
        })
            
    }
}
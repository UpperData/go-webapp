import axios from '../../auth/fetch';
import {SET_MENU} from '../types'

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
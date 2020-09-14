import { userConstants } from '../constants';

const initState={
  "id":"",
  "detail":{}
}

export function getuser(state=initState, action){
  switch(action.type){
    case userConstants.GET_REQUEST:
      return{
        ...state, loading:true, deatil:initState};
    case userConstants.GET_SUCCESS:
      return {
        ...state, loading:true, detail:action.value};
    case userConstants.GET_FAILURE:
      return {};
    default:
      return state    
  }
}
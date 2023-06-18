
/* types */
export const SET_SOME_VAL = "SET_SOME_VAL";
export const GET_SOME_VAL = "GET_SOME_VAL";

/* action creator */
export function setSomeVal(v) {
  return { type: SET_SOME_VAL, v: v }
}

/* initial state */
export const initialState = {
  someVal: "",
}

/* reducers */
export const sample = (state = {}, action) => {
  switch(action.type) {
    case SET_SOME_VAL:
      return Object.assign({}, state, {
        someVal: action.payload
      });
    case GET_SOME_VAL:
      return state.someVal;
    default:
      return state;
  }
}

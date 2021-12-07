import * as t from "../types";

const initialState = {
  loggedIn: false,
  user: null,
  likedPokemon: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case t.REGISTER_SUCCESS:
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        likedPokemon: action.payload.likedPokemon,
      };

    case t.REGISTER_FAIL:
    case t.LOGIN_FAIL:
    case t.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null,
        likedPokemon: null,
      };

    case t.LIKE_SUCCESS:
      return {
        ...state,
        likedPokemon: action.payload,
      };

    case t.LIKE_FAIL:
      return {
        ...state,
        likedPokemon: null,
      };

    default:
      return state;
  }
}

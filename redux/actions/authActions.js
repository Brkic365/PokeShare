import * as t from "../types";
import fetcher from "./fetcher";
import { returnErrors } from "./errorActions";

export const login = (user) => async (dispatch) => {
  const res = await fetcher("/api/auth/login", "POST", user);

  if (res.ok) {
    res = await res.json();
    dispatch({
      type: t.LOGIN_SUCCESS,
      payload: res,
    });
  } else {
    res = await res.json();
    dispatch({
      type: t.LOGIN_FAIL,
    });
    dispatch(returnErrors(res.msg, 400, "AUTH_ERROR"));
  }
};

export const register = (user) => async (dispatch) => {
  const res = await fetcher("/api/auth/signup", "POST", user);

  if (res.ok) {
    res = await res.json();
    dispatch({
      type: t.REGISTER_SUCCESS,
      payload: res,
    });
  } else {
    res = await res.json();
    dispatch({
      type: t.REGISTER_FAIL,
    });
    dispatch(returnErrors(res.msg, 400, "AUTH_ERROR"));
  }
};

export const logout = () => {
  return {
    type: t.LOGOUT,
  };
};

export const like = (pokemonID, prevLiked) => async (dispatch, getState) => {
  if (!getState().auth.user) {
    dispatch(returnErrors("Not signed in", 400, "POKEMON_ERROR"));
    return;
  }

  const userID = getState().auth.user.id;

  const res = await fetcher("/api/pokemon/like", "POST", {
    userID,
    pokemonID,
    prevLiked,
  });

  if (res.ok) {
    res = await res.json();
    dispatch({
      type: t.LIKE_SUCCESS,
      payload: pokemonID,
    });
  } else {
    res = await res.json();
    dispatch({
      type: t.LIKE_FAIL,
    });
    dispatch(returnErrors(res.msg, 400, "POKEMON_ERROR"));
  }
};

export const dislike = (pokemonID) => async (dispatch, getState) => {
  if (!getState().auth.user) {
    dispatch(returnErrors("Not signed in", 400, "POKEMON_ERROR"));
    return;
  }

  const userID = getState().auth.user.id;

  const res = await fetcher("/api/pokemon/dislike", "POST", {
    userID,
    pokemonID,
  });

  if (res.ok) {
    res = await res.json();
    dispatch({
      type: t.LIKE_SUCCESS,
      payload: null,
    });
  } else {
    res = await res.json();
    dispatch({
      type: t.LIKE_FAIL,
    });
    dispatch(returnErrors(res.msg, 400, "POKEMON_ERROR"));
  }
};

import { useState, useReducer } from 'react';
import { FETCH_INIT, FETCH_FAILURE, FETCH_SUCCESS } from '../types';
import axios from '../../config/config';
import { useRouter } from 'next/router';

function fetchSignUpReducer(state, action) {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false, error: null };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      throw new Error();
  }
}

export default function useSignUp(onSuccessRedirect) {
  const [state, dispatch] = useReducer(fetchSignUpReducer, {
    isLoading: false,
    isError: false,
    error: null,
  });

  const { isLoading, isError, error } = state;

  const router = useRouter();

  const signUpUser = async userData => {
    try {
      dispatch({ type: FETCH_INIT });
      const res = await axios.post('/auth/signup', userData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        console.log(res);
        // router.push(onSuccessRedirect);
      }
    } catch (error) {
      const { message } = error.response.data;

      dispatch({ type: FETCH_FAILURE, payload: message });
      console.log(message);
    }
  };

  return { isLoading, isError, error, signUpUser };
}

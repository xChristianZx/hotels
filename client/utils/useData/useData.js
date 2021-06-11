import { useEffect, useState, useReducer, useRef } from 'react';
import axios from '../../config/config';
import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from '../types';

function fetchDataReducer(state, action) {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
}

/**
 * Fetches data from API
 *
 * @export
 * @param {string} urlPath - URL path to endpoint
 * @param {({}|string)} initialParams - Initial query params
 * @param {*} initialData - Initial data
 * @returns {[{ data, isLoading, isError }, Function]} Returns state object and setParams method
 */
export default function useData(urlPath, initialParams, initialData) {
  const [params, setParams] = useState(initialParams);

  const isInitialMount = useRef(true);

  const [state, dispatch] = useReducer(fetchDataReducer, {
    data: initialData,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        dispatch({ type: FETCH_INIT });
        try {
          const res = await axios(urlPath, { params });
          // console.log('HOOK RES', res);
          dispatch({ type: FETCH_SUCCESS, payload: res.data });
        } catch (err) {
          dispatch({ type: FETCH_FAILURE });
          console.error(err);
        }
      }
    };

    fetchData();
  }, [params['country[eq]'], params.start, params.end]);

  return [state, setParams];
}

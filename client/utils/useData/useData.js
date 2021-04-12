import { useEffect, useState } from 'react';
import axios from '../../config/config';

export default function useData(urlPath, initialParams, initialData) {
  const [data, setData] = useState(initialData);
  const [params, setParams] = useState(initialParams);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const res = await axios(urlPath, { params });
        // console.log('HOOK RES', res);
        setData(res.data);
      } catch (err) {
        setIsError(true);
        console.error(err);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [params]);

  return [{ data, isLoading, isError }, setParams];
}

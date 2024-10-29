import { useEffect, useState } from "react";
import { axiosWithToken } from "../api";

const useData = (endpoint, requestConfig, deps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      axiosWithToken
        .get(endpoint, { signal: controller.signal, ...requestConfig })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "CanceledError") return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;

import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../components/Interface";

const useFetch = (url: string) => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  console.log(isLoading, "isLoading isLoading");
  if (isLoading) {
    console.log("hello loading is true");
  }
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      await axios
        .get(url)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })

        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;

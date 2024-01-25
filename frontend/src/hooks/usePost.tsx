import React from "react";
import axios from "axios";
import { User } from "../components/Interface";

const usePost = (url: string) => {
  const [data, setData] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const makeRequestforPost = (requestData: User) => {
    setLoading(true);

    axios
      .post(url, requestData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for FormData
        },
      })
      .then((res) => {
        console.log("Success!", res.data);
        setLoading(false);
        setData(res.data.student);
      })
      .catch((error) => {
        console.log("Error in post data" + error.message);
      });
  };

  return { data, loading, makeRequestforPost };
};

export default usePost;

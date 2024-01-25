import React from "react";
import axios from "axios";
import { User } from "../components/Interface";

const usePatch = (url: string) => {
  const [patchData, setPatchData] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);

  const makeRequestForPatch = (requestData: User) => {
    setLoading(true);
    axios
      .patch(url, requestData)
      .then((res) => {
        setLoading(false);
        setPatchData(res.data.student);
      })
      .catch((error) => {
        console.log("Error in post data" + error.message);
      });
  };

  return { patchData, loading, makeRequestForPatch };
};

export default usePatch;

import React from "react";
import axios from "axios";
import { User } from "../components/Interface";

const useDelete = (url: string) => {
  const [deletedData, setDeletedData] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const deleteRequest = (requestDeleteData: number[]) => {
    setLoading(true);
    axios
      .delete(url, { data: requestDeleteData })
      .then((res) => {
        setLoading(false);
        setDeletedData(res.data.student);
      })
      .catch((error) => {
        console.log("Error in delete data" + error.message);
      });
  };

  return { deletedData, loading, deleteRequest };
};

export default useDelete;

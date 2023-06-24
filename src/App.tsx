import React from "react";
import { useGetStudentsQuery } from "./store";
import StudentList from "./components/StudentList";

const App = () => {
  const { data, isSuccess, isLoading } = useGetStudentsQuery(null, {
    // selectFromResult: (result) => {
    //   if (result.data) {
    //     result.data = result.data.filter((item) => item.attributes.age < 23);
    //   }
    //   return result;
    // },
    pollingInterval: 0,
    refetchOnMountOrArgChange: false,
  });

  return (
    <div>
      {isLoading && <p>data is loading</p>}
      {isSuccess && <StudentList stus={data} />}
    </div>
  );
};

export default App;

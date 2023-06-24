import { createContext } from "react";

const studentContext = createContext({
  fetchData: () => {
    console.log("");
  }

});

export default studentContext;

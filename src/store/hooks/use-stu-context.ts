import { useContext } from "react";
import studentContext from "./studentContext";

export const useStuContext = () => {
    return useContext(studentContext)
}
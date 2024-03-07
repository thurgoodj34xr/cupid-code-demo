import { useContext as context } from "react";
import AppContext from "../componets/app_context";

function useContext() {
    return context(AppContext);
}

export default useContext;
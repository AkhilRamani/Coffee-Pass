import { useContext } from "react";
import { AuthContext } from "./auth.context";

export const useAuth = () => {
    const data = useContext(AuthContext)
    return data
}
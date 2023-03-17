import {useToken} from "./useToken";
import {useEffect, useState} from "react";

export const useUser = () => {

    const[token] = useToken();

    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload))
    }

    const [user, setUser] = useState(() => {
        if(!token) return { id: null };
        return getPayloadFromToken(token);
    });

    useEffect(() => {
       if (!token) {
           setUser( { id: null } );
       } else {
           setUser(getPayloadFromToken(token));
       }
    }, [token]);

    return [user, setUser];
}
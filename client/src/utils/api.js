import { createContext } from "react";
import store from "../store/store";

export class Api {
    async makeRequest(uri, method, body) {
        const { auth } = store.getState();
        const options = {
            method,
            headers: {
                "Authorization": `${auth.token}`,
                "Content-Type": "application/json"
            },
        }

        if (body) {
            options.body = JSON.stringify(body);
        }
        const res = await fetch(uri, options);
        return res.json();
    }

    get(uri) {
        return this.makeRequest(uri, "GET")
    }

    post(uri, body) {
        return this.makeRequest(uri, "POST", body)
    }

    put(uri, body) {
        return this.makeRequest(uri, "PUT", body)
    }

    del(uri) {
        return this.makeRequest(uri, "DELETE")
    }
}

export const ApiContext = createContext(new Api());
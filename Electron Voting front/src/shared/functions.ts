import axios from "axios";
import { axios_instance } from "./constants"
import { store } from "./store";

export const post_request = async (url: string, data: any) => {
    const fd = new FormData();
    for (const key in data) {
        const element = data[key];
        fd.append(key, element)            
    }
    set_a_token()
    return await axios_instance.post(url, fd)
    .then(data => data.data)
    .catch(err => undefined)
}

export const get_request = async (url: string) => {
    set_a_token()
    return await axios_instance.get(url)
    .then(data => data.data)
    .catch(err => undefined)
}

export const set_a_token = (token?:string) => {
    console.log("store.getState().main.user_details.token", store.getState().main.user_details?.token);
    
    if (store.getState().main.user_details) {
        axios_instance.defaults.headers.common['Authorization'] = 'bearer ' + (store.getState().main.user_details?.token);
    }
}
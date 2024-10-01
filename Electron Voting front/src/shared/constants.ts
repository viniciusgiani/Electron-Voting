import axios from "axios";

export const axios_instance = axios.create({
    baseURL: 'http://localhost:8000/api'
});

export const user_data_db_name = "user_data_database_name"
import { ApiWrapper } from "./ApiWrapper.js";
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig.extra.API_URL;

console.log(API_URL);
export class ApiService {
    constructor() {
        this.api = new ApiWrapper(API_URL);
    }

    // Función auxiliar para manejar errores
    async _callApi(method, ...args) {
        try {
            return await this.api[method](...args);
        } catch (error) {
            console.error(`Error in ${method}:`, error);
            throw error;
        }
    }

    // Block from auth

    signIn(data) {
        return this._callApi("signIn", data);
    }

    signUp(data) {
        return this._callApi("signUp", data);
    }

}
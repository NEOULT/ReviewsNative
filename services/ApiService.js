import Constants from 'expo-constants';
import { ApiWrapper } from "./ApiWrapper.js";
const API_URL = Constants.expoConfig.extra.API_URL;

console.log(API_URL, "Holaa");
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

    setToken(token) {
        this.api.setToken(token);
    }
    // Block from auth

    signIn(data) {
        return this._callApi("signIn", data);
    }

    signUp(data) {
        return this._callApi("signUp", data);
    }

    // Block from movies
    getPaginatedMovies(currentPage = 1, limit = 10, sortByDate = false, sortByRating = false) {
        return this._callApi("getPaginatedMovies", currentPage, limit, sortByDate, sortByRating);
    }

    getMovieDetails(tmbd_id) {
        return this._callApi("getMovieDetails", tmbd_id);
    }

    // Block from series
    getPaginatedSeries(currentPage = 1, limit = 10, sortByDate = false, sortByRating = false) {
        return this._callApi("getPaginatedSeries", currentPage, limit, sortByDate, sortByRating);
    }

    getSeriesDetails(tmbd_id) {
        return this._callApi("getSeriesDetails", tmbd_id);
    }

    // Block from search
    searchMovies(name, page) {
        return this._callApi("searchMovies", name, page);
    }

    searchSeries(name, page) {
        return this._callApi("searchSeries", name, page);
    }

    searchByCategories(categories, page, type) {
        return this._callApi("searchByCategories", categories, page, type);
    }

    // Block from comments
    createComment(media_id, content, isMovie) {
        return this._callApi("createComment", media_id, content, isMovie);
    }

    deleteComment(comment_id) {
        return this._callApi("deleteComment", comment_id);
    }

    updateComment(comment_id, data) {
        return this._callApi("updateComment", comment_id, data);
    }

    getPaginatedComment(page, limit, media_id, role) {
        return this._callApi("getPaginatedComment", page, limit, media_id, role);
    }

    // Block from reviews
    createReview(media_id, score, isMovie) {
        return this._callApi("createReview", media_id, score, isMovie);
    }

    deleteReview(review_id) {
        return this._callApi("deleteReview", review_id);
    }

    updateReview(review_id, score) {
        return this._callApi("updateReview", review_id, score);
    }

    getUserReview(media_id, isMovie){
        return this._callApi("getUserReview", media_id, isMovie);
    }

    // Block from categories
    getMoviesCategories() {
        return this._callApi("getMoviesCategories");
    }

    getSeriesCategories() {
        return this._callApi("getSeriesCategories");
    }

    getAllCategories(){
        return this._callApi("getAllCategories");
    }

    // Block from profile
    getUserProfile() {
        return this._callApi("getUserProfile");
    }

    updateProfile(data) {
        return this._callApi("updateProfile",  data);
    }

    deleteProfile() {
        return this._callApi("deleteProfile");
    }

}
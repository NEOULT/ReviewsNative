export class ApiWrapper {
  constructor(host) {
    this.baseUrl = host;
    this.token = null;
  }

  async #_request(endpoint, method = 'GET', data) {

    console.log(`API base URL: ${this.baseUrl}`);

    const url = `${this.baseUrl}/${endpoint}`;

    const headers = { 'Content-Type': 'application/json' };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const options = {
      method,
      headers,
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    let responseBody;
    try {
      responseBody = await response.json();
    } catch {
      responseBody = null;
    }

    if (!response.ok) {
      // Muestra el mensaje de error del backend si existe
      const errorMsg = responseBody?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMsg);
    }

    return responseBody;
  }

  setToken(token) {
    this.token = token;
  }

  #getData(endpoint) {
    return this.#_request(endpoint, 'GET');
  }

  #postData(endpoint, data) {
    return this.#_request(endpoint, 'POST', data);
  }

  #putData(endpoint, data) {
    return this.#_request(endpoint, 'PUT', data);
  }

  #deleteData(endpoint) {
    return this.#_request(endpoint, 'DELETE');
  }

  // Block from auth

  signIn(data) {
    return this.#postData('auth/signin', data);
  }

  signUp(data) {
    return this.#postData('auth/signup', data);
  }

  // Block from movies

  getPaginatedMovies(currentPage = 1, limit = 10, sortByDate = false, sortByRating = false) {
    const data = { currentPage, limit, sortByDate, sortByRating };
    return this.#postData('movie/paginate', data);
  }

  getMovieDetails(tmbd_id) {
    return this.#getData(`movie/${tmbd_id}`);
  }

  // Block from series

  getPaginatedSeries(currentPage = 1, limit = 10, sortByDate = false, sortByRating = false) {
    const data = { currentPage, limit, sortByDate, sortByRating };
    return this.#postData('serie/paginate', data);
  }

  getSeriesDetails(tmbd_id) {
    return this.#getData(`serie/${tmbd_id}`);
  }

  // Block from search

  searchMovies(name,page) {
    const data = { name, page };
    return this.#postData(`search/movie`, data);
  }

  searchSeries(name,page) {
    const data = { name, page };
    return this.#postData(`search/serie`, data);
  }

  searchByCategories(categories,page,type) {
    const data = { categories, page, type };
    return this.#postData(`search/category`, data);
  }

  // Block from comments

  createComment(media_id, content, isMovie) {

    const data = {content}

    if (isMovie){
      data.movie_id = media_id;
    }else{
      data.serie_id = media_id;
    }

    return this.#postData('comment', data);
  }

  deleteComment(comment_id) {
    return this.#deleteData(`comment/${comment_id}`);
  }

  updateComment(comment_id, data) {
    return this.#putData(`comment/${comment_id}`, data);
  }


  getPaginatedComment(page, limit, media_id, role){
    const data = { page, limit, media_id, role };
    return this.#postData(`comment/paginate`, data);
  }

  // Block from reviews

  createReview(data) {
    return this.#postData('review', data);
  }

  deleteReview(review_id) {
    return this.#deleteData(`review/${review_id}`);
  }

  updateReview(review_id, data) {
    return this.#putData(`review/${review_id}`, data);
  }

  // Block from categories

  getMoviesCategories() {
    return this.#getData('categories/movies');
  }

  getSeriesCategories() {
    return this.#getData('categories/series');
  }

  getAllCategories() {
    return this.#getData('categories/all');
  }

  // Block from profile

  getUserProfile() {
    return this.#getData(`user`);
  }

  updateProfile(data) {
    return this.#putData(`user/profile`, data);
  }

  deleteProfile() {
    return this.#deleteData(`user`);
  }

}
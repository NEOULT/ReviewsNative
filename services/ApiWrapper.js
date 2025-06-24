export class ApiWrapper {
  constructor(host) {
    this.baseUrl = host;
  }
  
  async #_request(endpoint, method = 'GET', data) {
    console.log(`API base URL: ${this.baseUrl}`);
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
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

  getPaginatedMovies(currentPage = 1, limit = 10) {
    const data = { currentPage, limit };
    return this.#postData('movie/paginate', data);
  }

  getMovieDetails(tmbd_id) {
    return this.#getData(`movie/${tmbd_id}`);
  }

  // Block from series

  getPaginatedSeries(currentPage = 1, limit = 10) {
    const data = { currentPage, limit };
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

  createComment(data) {
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
    return this.#getData('category/movies');
  }

  getSeriesCategories() {
    return this.#getData('category/series');
  }

  // Block from profile

  getUserProfile(user_id) {
    return this.#getData(`user/${user_id}`);
  }

  updateProfile(user_id, data) {
    return this.#putData(`user/profile/${user_id}`, data);
  }

  deleteProfile(user_id) {
    return this.#deleteData(`user/${user_id}`);
  }

}
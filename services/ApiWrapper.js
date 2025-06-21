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

}
/**
 * @public @name Api
 * @description Used for calling backend API services
 * @license MIT
 */
export default class Api {
	constructor() {
		// any auth based stuffs here such as MSAL
	}

	setInstance() {
		// any auth based stuffs here such as MSAL
	}

	fetch(url: RequestInfo | URL, options: RequestInit | undefined): Promise<void | Response> {
		// no token, generate one and fetch
		// if (!this.token && this.instance) {
		// 	...
		// }

		// override headers to add in tokens etc... return fetch(url, { ...options, headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...options?.headers, Authorization: `Bearer ${this.token}` } }).then(
		return fetch(url, { ...options }).then((response) => {
			// retech if toen expired... force refresh of token by clearing, re-gen and send request again
			// if (response.status !== 200 && response.headers.get('Authorization') === 'expired') {
			// 	this.token = ''; // clear out token
			// 	return this.fetch(url, options);
			// }

			return response;
		});
	}
}

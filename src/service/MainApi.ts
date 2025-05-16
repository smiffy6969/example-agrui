import Api from '@/base/service/Api';

export type TemperatureData = {
	time: string;
	center_lat: number;
	center_lon: number;
	north: number;
	south: number;
	east: number;
	west: number;
	center: number;
};

/**
 * @public @name convert
 * @description service for talking to meridia API
 * @license MIT
 */
export default class MainApi extends Api {
	/**
	 * @public @name getTemperature
	 * @description get temperature data
	 * @returns {Promise<TemperatureData[]>} the temperature data
	 */
	async getTemperature(): Promise<TemperatureData[]> {
		return this.fetch(import.meta.env.VITE_PORTAL_API_ENDPOINT + ``, {
			method: 'GET',
		}).then((response) => {
			if (!response || !response.body) throw new Error('error::No valid response');
			else if (response.status == 401 || response.status == 403) throw new Error('error::You do not have permission for this action');
			else if (response.status >= 400) throw new Error('Unable to get project resource pdf');

			return response.json();
		});
	}

	/**
	 * @public @name refreshTemperature
	 * @description refresh temperature data
	 */
	async refreshTemperature() {
		return this.fetch(import.meta.env.VITE_PORTAL_API_ENDPOINT + ``, {
			method: 'POST',
		}).then((response) => {
			if (!response || !response.body) throw new Error('error::No valid response');
			else if (response.status == 401 || response.status == 403) throw new Error('error::You do not have permission for this action');
			else if (response.status >= 400) throw new Error('Unable to refresh temperature data');
		});
	}
}

export function useMainApiService() {
	return new MainApi();
}

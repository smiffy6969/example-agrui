import './dashboard.css';
import { useState, useEffect } from 'react';
import { TemperatureChart } from '@/component/common/temp-chart';
import { useMainApiService } from '@/service/MainApi';

// Mock temperature data for development
const mockTemperatureData = [
	{ time: '2024-06-01T12:00:00Z', center_lat: 51.0, center_lon: 0.0, north: 22.5, south: 23.1, east: 22.8, west: 22.3, center: 22.7 },
	{ time: '2024-06-01T13:00:00Z', center_lat: 51.0, center_lon: 0.0, north: 23.1, south: 23.8, east: 23.4, west: 22.9, center: 23.3 },
	{ time: '2024-06-01T14:00:00Z', center_lat: 51.0, center_lon: 0.0, north: 23.8, south: 24.2, east: 24.0, west: 23.5, center: 23.9 },
	{ time: '2024-06-01T15:00:00Z', center_lat: 51.0, center_lon: 0.0, north: 24.0, south: 24.5, east: 24.2, west: 23.8, center: 24.1 },
	{ time: '2024-06-01T16:00:00Z', center_lat: 51.0, center_lon: 0.0, north: 23.7, south: 24.1, east: 23.9, west: 23.4, center: 23.8 },
	{ time: '2024-06-01T17:00:00Z', center_lat: 51.0, center_lon: 0.0, north: 22.9, south: 23.4, east: 23.1, west: 22.6, center: 23.0 },
];

function Chart() {
	const [data, setData] = useState<any>(null);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const mainApiService = useMainApiService();

	const fetchData = () => {
		mainApiService
			.getTemperature()
			.then((data) => {
				if (Array.isArray(data) && data.length > 0) setData(data);
				else setData(mockTemperatureData);
			})
			.catch(() => {
				setData(mockTemperatureData);
			});
	};

	const handleRefresh = async () => {
		setIsRefreshing(true);
		try {
			await mainApiService.refreshTemperature();
			await fetchData();
		} catch (error) {
			console.error('Failed to refresh data:', error);
		} finally {
			setIsRefreshing(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="chart-container">
			<button onClick={handleRefresh} disabled={isRefreshing} className="refresh-button">
				{isRefreshing ? 'Refreshing, go make a brew, we could be a while, pulling 2025 data...' : 'Refresh 2025 Data'}
			</button>
			<TemperatureChart data={data} />
		</div>
	);
}

export default Chart;

import './temp-chart.css';
import { TemperatureChartType as Props } from './temp-chart.d';
import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { GooMap } from './goo-map';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const formatDate = (date: string, viewMode: 'month' | 'day') => {
	if (viewMode === 'month') {
		const [year, month] = date.split('-');
		return `${new Date(Number(year), Number(month) - 1).toLocaleString('en-US', { year: 'numeric', month: 'long' })}`;
	}
	return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function TemperatureChart({ data }: Props) {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [unit, setUnit] = useState<'K' | 'C'>('K');
	const [viewMode, setViewMode] = useState<'day' | 'month'>('day');

	// Extract unique dates or months from the data
	const uniqueDates = useMemo(() => {
		if (!Array.isArray(data)) return [];

		if (viewMode === 'month') {
			const months = data.map((d: any) => d.time?.slice(0, 7)).filter(Boolean);
			return Array.from(new Set(months));
		}

		const days = data.map((d: any) => d.time?.slice(0, 10)).filter(Boolean);

		return Array.from(new Set(days));
	}, [data, viewMode]);

	// Filter data by selected date or month
	const filteredData = useMemo(() => {
		if (!Array.isArray(data)) return [];

		if (!selectedDate) {
			if (uniqueDates.length === 0) return [];
			return data.filter((d: any) => (viewMode === 'month' ? d.time?.startsWith(uniqueDates[0]) : d.time?.startsWith(uniqueDates[0])));
		}

		return data.filter((d: any) => d.time?.startsWith(selectedDate));
	}, [data, selectedDate, uniqueDates, viewMode]);

	// Convert data to selected unit
	const chartData = useMemo(() => {
		if (unit === 'C') {
			return filteredData.map((d: any) => ({
				...d,
				north: d.north - 273.15,
				south: d.south - 273.15,
				east: d.east - 273.15,
				west: d.west - 273.15,
				center: d.center - 273.15,
			}));
		}

		return filteredData;
	}, [filteredData, unit]);

	const chartColors = {
		north: 'rgba(255, 99, 132, 1)', // Red
		south: 'rgba(54, 162, 235, 1)', // Blue
		east: 'rgba(75, 192, 192, 1)', // Teal
		west: 'rgba(255, 206, 86, 1)', // Yellow
		center: 'rgba(153, 102, 255, 1)', // Purple
	};

	return (
		<>
			{data ? (
				<Box sx={{ width: '1000px', margin: '2rem auto' }}>
					<Typography variant="h5" component="h2" gutterBottom>
						Temp Trends ({filteredData[0].center_lat}, {filteredData[0].center_lon}) - {formatDate(selectedDate || uniqueDates[0], viewMode)}
					</Typography>

					<Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
						<GooMap lat={filteredData[0].center_lat} lng={filteredData[0].center_lon} />

						<Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
							<FormControl sx={{ minWidth: 200 }}>
								<InputLabel id="unit-filter-label">Unit</InputLabel>
								<Select labelId="unit-filter-label" id="unit-filter" value={unit} label="Unit" onChange={(e) => setUnit(e.target.value as 'K' | 'C')}>
									<MenuItem value="K">Kelvin (K)</MenuItem>
									<MenuItem value="C">Celsius (°C)</MenuItem>
								</Select>
							</FormControl>

							<FormControl sx={{ minWidth: 200 }}>
								<InputLabel id="view-mode-filter-label">View</InputLabel>
								<Select
									labelId="view-mode-filter-label"
									id="view-mode-filter"
									value={viewMode}
									label="View"
									onChange={(e) => {
										setViewMode(e.target.value as 'day' | 'month');
										setSelectedDate('');
									}}
								>
									<MenuItem value="day">Day</MenuItem>
									<MenuItem value="month">Month</MenuItem>
								</Select>
							</FormControl>

							<FormControl sx={{ minWidth: 200 }}>
								<InputLabel id="date-filter-label">Filter by {viewMode}</InputLabel>
								<Select labelId="date-filter-label" id="date-filter" value={selectedDate} label={`Filter by ${viewMode}`} onChange={(e) => setSelectedDate(e.target.value)}>
									{uniqueDates.map((date) => (
										<MenuItem key={date} value={date}>
											{date}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</Box>

					{Array.isArray(chartData) && chartData.length > 0 && (
						<Box sx={{ width: '100%' }}>
							<Line
								data={{
									labels: chartData.map((d: any) => d.time),
									datasets: [
										{
											label: `North (${unit === 'K' ? '°K' : '°C'})`,
											data: chartData.map((d: any) => d.north),
											borderColor: chartColors.north,
											backgroundColor: chartColors.north.replace('1)', '0.2)'),
											tension: 0.3,
											fill: false,
										},
										{
											label: `South (${unit === 'K' ? '°K' : '°C'})`,
											data: chartData.map((d: any) => d.south),
											borderColor: chartColors.south,
											backgroundColor: chartColors.south.replace('1)', '0.2)'),
											tension: 0.3,
											fill: false,
										},
										{
											label: `East (${unit === 'K' ? '°K' : '°C'})`,
											data: chartData.map((d: any) => d.east),
											borderColor: chartColors.east,
											backgroundColor: chartColors.east.replace('1)', '0.2)'),
											tension: 0.3,
											fill: false,
										},
										{
											label: `West (${unit === 'K' ? '°K' : '°C'})`,
											data: chartData.map((d: any) => d.west),
											borderColor: chartColors.west,
											backgroundColor: chartColors.west.replace('1)', '0.2)'),
											tension: 0.3,
											fill: false,
										},
										{
											label: `Center (${unit === 'K' ? '°K' : '°C'})`,
											data: chartData.map((d: any) => d.center),
											borderColor: chartColors.center,
											backgroundColor: chartColors.center.replace('1)', '0.2)'),
											tension: 0.3,
											fill: false,
										},
									],
								}}
								options={{
									responsive: true,
									plugins: {
										legend: { position: 'top' as const },
										title: { display: true, text: 'Temperature Over Time' },
									},
									scales: {
										x: {
											title: { display: true, text: 'Time' },
											ticks: {
												callback: function (_value, index) {
													return chartData[index]?.time?.slice(0, 16).replace('T', ' ');
												},
											},
										},
										y: {
											title: { display: true, text: `Temperature (${unit === 'K' ? '°K' : '°C'})` },
										},
									},
								}}
							/>
						</Box>
					)}
				</Box>
			) : (
				''
			)}
		</>
	);
}

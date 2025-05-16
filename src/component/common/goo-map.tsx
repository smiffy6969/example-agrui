import './goo-map.css';
import { MapType as Props } from './goo-map.d';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function GooMap({ lat, lng }: Props) {
	const mapContainerStyle = {
		width: '400px',
		height: '300px',
	};

	const mapOptions = {
		disableDefaultUI: true,
		zoomControl: true,
	};

	return (
		<>
			<Box sx={{ width: { xs: '100%', md: '50%' } }}>
				<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
					<GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat, lng }} zoom={8} options={mapOptions}>
						<Marker position={{ lat, lng }} title="Temperature Monitoring Center" />
					</GoogleMap>
				</LoadScript>
			</Box>
		</>
	);
}

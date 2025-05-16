import './index.css';
import Dashboard from '@/component/view/dashboard';
import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import AppDrawer from '@/component/template/app-drawer';
import AppBarComponent from '@/component/template/app-bar';

const drawerWidth = 240;

function App() {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBarComponent drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
			<AppDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					mt: '0px',
				}}
			>
				<Dashboard />
			</Box>
		</Box>
	);
}

export default App;

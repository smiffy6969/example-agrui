import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Dashboard as DashboardIcon, Settings as SettingsIcon, Info as InfoIcon } from '@mui/icons-material';

const drawerWidth = 240;

interface AppDrawerProps {
	mobileOpen: boolean;
	handleDrawerToggle: () => void;
}

const menuItems = [
	{ text: 'Dashboard', icon: <DashboardIcon /> },
	{ text: 'Settings', icon: <SettingsIcon /> },
	{ text: 'About', icon: <InfoIcon /> },
];

const AppDrawer = ({ mobileOpen, handleDrawerToggle }: AppDrawerProps) => {
	const drawer = (
		<div>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
				}}
			>
				<Typography variant="h6" noWrap component="div">
					Agribot
				</Typography>
			</Toolbar>
			<List>
				{menuItems.map((item) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default AppDrawer;

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface AppBarProps {
	drawerWidth: number;
	handleDrawerToggle: () => void;
}

const AppBarComponent = ({ drawerWidth, handleDrawerToggle }: AppBarProps) => {
	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
			}}
		>
			<Toolbar>
				<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Dashboard
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default AppBarComponent;

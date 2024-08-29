import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { MenuList } from '../../utils/constant';

const drawerWidth = 240;

export default function Sidebar() {
    const navigate = useNavigate()
    const handleNavigation = (route: string) => {
        navigate(route)
    }
    return (

        <Drawer
            sx={{

                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'unset'
                },
            }}
            variant="permanent"
            anchor="left"

        >
            <Divider />
            <List>
                {MenuList.map((items, index) => (
                    <ListItem key={items.id} disablePadding >
                        <ListItemButton onClick={() => handleNavigation(items.route)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={items.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Drawer>


    );
}

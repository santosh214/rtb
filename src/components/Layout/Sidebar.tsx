import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminMenuList, UserMenuList } from '../../utils/constant';
import { getAdmin } from '../../utils/utlis';
import { useEffect, useState } from 'react';
import { UserInterface } from '../../pages/Admin/users/utils';

const drawerWidth = 240;

export default function Sidebar() {
  const list = getAdmin() ? AdminMenuList : UserMenuList;
  const navigate = useNavigate();
  const handleNavigation = (route: string) => {
    navigate(route);
  };
  const [user, setUser] = useState<UserInterface | null>(null);
  const location = useLocation();
  useEffect(() => {
    console.log('useeff sidebar');
    const handleStorageChange = () => {
      console.log('useeff sidebar 2');

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('uu ---', parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user:', error);
        }
      }
    };
    handleStorageChange();
  }, [location.pathname]);

  console.log('uuu', user);

  return (
    <>
      {user && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'unset',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />
          <List>
            {list.map((items, index) => (
              <ListItem key={items.id} disablePadding>
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
      )}
    </>
  );
}

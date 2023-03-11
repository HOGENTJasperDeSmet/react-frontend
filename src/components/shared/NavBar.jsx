import { useAuth0 } from '@auth0/auth0-react';
import { Badge, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { useShoppingCart } from '../../context/users/ShoppingCartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { amber } from '@mui/material/colors';
import AuthenticationButton from '../authentication/ProfileDropdown';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const { isAuthenticated } = useAuth0();

    const image = require('../../assets/volledig-logo.png');

    const theme = useTheme();
    const { cartQuantity } = useShoppingCart();

    return (
        <div
            id="navBar"
            style={{
                width: '100%',
                height: '64px',
                position: 'sticky',
                top: 0,
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                backgroundColor: 'white',
                zIndex: 10000,
                marginBottom: '2rem',
                borderBottom: '1px solid #cfcfcf',
            }}
        >
            <Stack width="70%" direction="row" gap={2}>
                <img
                    style={{ height: '50px' }}
                    src={image}
                    alt="volledig logo"
                />
                <NavLink
                    data-cy="btn_products"
                    to="/products"
                    className={({ isActive }) =>
                        isActive ? 'navbar-item-active' : 'navbar-item'
                    }
                >
                    PRODUCTEN
                </NavLink>
                {isAuthenticated && (
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive ? 'navbar-item-active' : 'navbar-item'
                        }
                    >
                        BESTELLINGEN
                    </NavLink>
                )}
            </Stack>
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignContent="center"
                width="30%"
                gap={2}
            >
                {isAuthenticated && (
                    <IconButton aria-label="notificaties">
                        <Badge badgeContent={3} color="primary">
                            <NotificationsIcon style={{ color: amber[700] }} />
                        </Badge>
                    </IconButton>
                )}
                <IconButton aria-label="winkelwagen" href="/cart">
                    <Badge badgeContent={cartQuantity} color="primary">
                        <ShoppingCartIcon
                            style={{ color: theme.palette.text.primary }}
                        />
                    </Badge>
                </IconButton>

                <AuthenticationButton />
            </Stack>
        </div>
    );
};

window.onscroll = function () {
    if (window.scrollY > 10) {
        window.document.getElementById('navBar').classList.add('floatingNav');
    } else {
        window.document
            .getElementById('navBar')
            .classList.remove('floatingNav');
    }
};

export default NavBar;

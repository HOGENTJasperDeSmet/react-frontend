import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function LogoutButton() {
    const { logout } = useAuth0();
    return (
        <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={() =>
                logout({
                    returnTo: window.location.origin,
                })
            }
            sx={{ textTransform: 'initial' }}
        >
            Logout
        </Button>
    );
}

export default LogoutButton;

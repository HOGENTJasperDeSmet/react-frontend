import { useAuth0 } from '@auth0/auth0-react';
import { Stack } from '@mui/material';
import { useState } from 'react';
import Dropdown from '../shared/Dropdown';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function AuthenticationButton() {
    const { isAuthenticated, user } = useAuth0();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    if (isAuthenticated) {
        const { name, picture, givenName } = user;
        return (
            <Stack direction="row" gap={1} alignItems="center">
                <p style={{ fontWeight: 500, fontSize: '14px' }}>
                    Welkom, {name}
                </p>

                <Dropdown
                    open={open}
                    trigger={
                        <img
                            onClick={handleOpen}
                            src={picture}
                            alt={givenName}
                            className="navbar-avatar"
                        />
                    }
                    menu={[<LogoutButton />]}
                />
            </Stack>
        );
    }

    return <LoginButton />;
}

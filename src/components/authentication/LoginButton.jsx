import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useCallback } from 'react';

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = useCallback(async () => {
        loginWithRedirect();
    }, [loginWithRedirect]);

    return (
        <Button variant="outlined" onClick={handleLogin}>
            Log In
        </Button>
    );
}

export default LoginButton;

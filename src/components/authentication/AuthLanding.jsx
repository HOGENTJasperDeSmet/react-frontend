import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import { Alert, Container, LinearProgress, Stack } from '@mui/material';

export default function AuthLanding() {
    const { error, isAuthenticated, isLoading } = useAuth0();

    if (error) {
        <Container>
            <Stack direction="column" gap={3}>
                <h1>Login gefaald</h1>
                <p>
                    Sorry, we konden je niet inloggen, the foutboodschap
                    hieronder is misschien handig.
                </p>
                <Alert severity="error">Hier komt de error</Alert>
                <div>
                    <LoginButton />
                </div>
            </Stack>
        </Container>;
    }

    if (!isLoading && isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (!isLoading && !isAuthenticated) {
        return (
            <Container>
                <Stack gap={3}>
                    <h1>Inloggen vereist</h1>
                    <p>Je kan deze pagina niet bekijken zonder in te loggen.</p>
                    <div>
                        <LoginButton />
                    </div>
                </Stack>
            </Container>
        );
    }

    return (
        <Container>
            <Stack gap={3}>
                <h1>Aan het inloggen...</h1>
                <p>Wacht even tot we klaar zijn.</p>
                <LinearProgress />
            </Stack>
        </Container>
    );
}

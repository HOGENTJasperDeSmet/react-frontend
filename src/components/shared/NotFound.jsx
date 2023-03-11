import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <Stack gap={3}>
            <h1>404 - Not Found!</h1>
            <span style={{ color: 'red' }}>{pathname}</span>
        </Stack>
    );
};

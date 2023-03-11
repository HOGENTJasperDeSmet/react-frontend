import { Alert, Stack } from '@mui/material';

export default function Error({ error }) {
    if (error) {
        return (
            <Stack gap={3}>
                <h4>An error occured</h4>
                <Alert severity="error">
                    {error.message || JSON.stringify(error)}
                </Alert>
            </Stack>
        );
    }
    return null;
}

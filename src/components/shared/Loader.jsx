import { CircularProgress } from '@mui/material';

export default function Loader({ loading }) {
    if (loading) {
        return <CircularProgress />;
    }
    return null;
}

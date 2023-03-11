function parseErrorCode(code) {
    if (!code || code === 'INTERNAL_SERVER_ERROR') return 'Validation failed';
    if (code === 'UNAUTHORIZED') return 'Not authorized';
    if (code === 'FORBIDDEN') return 'No permission';

    return 'Unknown error';
}

function parseError(error) {
    let title = 'Unknown error';
    let message =
        error || 'Oopsie, something went wrong, please try again later';

    if (typeof error === 'object' && error.response?.data) {
        title = parseErrorCode(error.response.data.code);
        message = error.response.data.message;
    }

    return {
        title,
        message,
    };
}

export default function ErrorMessage({ error }) {
    if (!error) {
        return null;
    }

    const { title, message } = parseError(error);

    return (
        <p data-cy="labelInput_error">
            <span style={{ color: 'pink', fontSize: 'medium' }}>
                {title}
                {message}
            </span>
        </p>
    );
}

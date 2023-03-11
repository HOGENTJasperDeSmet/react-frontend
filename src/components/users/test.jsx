import { Link } from 'react-router-dom';

function Test() {
    return (
        <div>
            <Link className="btn btn-primary " to="/products">
                Products{' '}
            </Link>
        </div>
    );
}

export default Test;

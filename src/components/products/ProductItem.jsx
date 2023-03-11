import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Divider,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useShoppingCart } from '../../context/users/ShoppingCartContext';
import Lottie from 'react-lottie';
import animationData from '../../lotties/correct.json';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default memo(function ProductItem({
    productId,
    name,
    price,
    quantityInStock,
    picture,
}) {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const { increaseCartQuantity, isItemInCart } = useShoppingCart();
    const navigate = useNavigate();

    return (
        <Card data-cy="product">
            <CardMedia
                component="img"
                image={picture}
                title={name}
                style={{ height: '200px', cursor: 'pointer' }}
                onClick={() => navigate(`/products/${productId}`)}
            />
            <CardContent
                onClick={() => navigate(`/products/${productId}`)}
                style={{ cursor: 'pointer' }}
            >
                <Typography gutterBottom variant="h7" component="div">
                    <h3
                        style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: '200px',
                        }}
                        data-cy="product_name"
                    >
                        {name}
                    </h3>
                    <p data-cy="product_price">€ {price}</p>
                </Typography>
                <Typography variant="body1" color="text.secondary"></Typography>
                <p data-cy="product_stock">
                    Aantal op voorraad: {quantityInStock}
                </p>
            </CardContent>
            <Divider />
            <CardActions>
                {isItemInCart(productId) ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            gap: '1rem',
                        }}
                    >
                        <Lottie
                            options={defaultOptions}
                            height={36}
                            width={36}
                            style={{ margin: 0 }}
                        />
                        <p
                            style={{
                                color: green[400],
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            IN WINKELWAGEN
                        </p>
                    </div>
                ) : (
                    <Button
                        fullWidth
                        color="primary"
                        variant="text"
                        sx={{ height: '36px' }}
                        onClick={() => increaseCartQuantity(productId)}
                        data-cy="btn_order"
                    >
                        Bestel
                    </Button>
                )}
            </CardActions>
        </Card>
    );
});

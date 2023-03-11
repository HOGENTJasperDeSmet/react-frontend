import { useShoppingCart } from '../../context/users/ShoppingCartContext';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Divider, IconButton } from '@mui/material';
import { Stack } from '@mui/system';

function calculateTotalPrice(quantity, unitPrice) {
    return (quantity * unitPrice).toFixed(2);
}

const CartItem = ({ item, quantity }) => {
    const {
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        setItemQuantity,
    } = useShoppingCart();

    return (
        <>
            <div className="cart-item">
                <img
                    className="cart-item-product-section-image"
                    src={item.picture}
                    alt="Product"
                />
                <div className="cart-item-information-container">
                    <div className="cart-item-product-section">
                        <div className="cart-item-product-section-info">
                            <h3>{item.name}</h3>
                            <p style={{ color: '#707070' }}>{item.productId}</p>
                            <p className="cart-item-product-section-info-description">
                                {item.description}
                            </p>
                        </div>
                    </div>
                    <div className="cart-item-price-section">
                        <IconButton
                            color="primary"
                            aria-label="verwijder uit winkelwagen"
                            onClick={() => removeFromCart(item.productId)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Stack
                            direction="column"
                            alignItems="flex-end"
                            gap={1.5}
                        >
                            <p>€{item.price}</p>
                            <Stack direction="row">
                                <input
                                    type="number"
                                    style={{
                                        border: '1px solid #9e9e9e',
                                        width: '50px',
                                        borderRadius: '5px',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                    }}
                                    value={quantity}
                                    onChange={(e) =>
                                        setItemQuantity(
                                            item.productId,
                                            e.target.value
                                        )
                                    }
                                    onBlur={(e) => {
                                        if (
                                            e.target.value === '' ||
                                            e.target.value < 1
                                        )
                                            setItemQuantity(item.productId, 1);
                                    }}
                                />
                                <Stack direction="column">
                                    <IconButton
                                        color="primary"
                                        aria-label="vermeerder met 1"
                                        sx={{ padding: 0 }}
                                        onClick={() => {
                                            increaseCartQuantity(
                                                item.productId
                                            );
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        aria-label="verminder met 1"
                                        sx={{ padding: 0 }}
                                        onClick={() => {
                                            decreaseCartQuantity(
                                                item.productId
                                            );
                                        }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <h3>
                                €{calculateTotalPrice(quantity, item.price)}
                            </h3>
                        </Stack>
                    </div>
                </div>
            </div>
            <Divider />
        </>
    );
};

export default CartItem;

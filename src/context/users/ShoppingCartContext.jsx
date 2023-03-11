import { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ShoppingCartContext = createContext();

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useLocalStorage('shopping-cart', []);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    function isItemInCart(id) {
        return cartItems.find((item) => item.productId === id) != null;
    }

    function increaseCartQuantity(id) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.productId === id) == null) {
                return [...currItems, { productId: id, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.productId === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(id) {
        setCartItems((currItems) => {
            return currItems.map((item) => {
                if (item.productId === id) {
                    if (item.quantity - 1 < 1) {
                        return item;
                    }
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            });
        });
    }

    function removeFromCart(id) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.productId !== id);
        });
    }

    function setItemQuantity(id, amount) {
        setCartItems((currItems) => {
            return currItems.map((item) => {
                if (item.productId === id) {
                    if (amount !== '') amount = +amount;
                    return { ...item, quantity: amount };
                } else {
                    return item;
                }
            });
        });
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                setItemQuantity,
                isItemInCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}

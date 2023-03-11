import './App.css';
import { NotFound } from './components/shared/NotFound';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { Routes, Route, Navigate } from 'react-router-dom';

import Cart from './pages/Cart';
import { ShoppingCartProvider } from './context/users/ShoppingCartContext';
import NavBar from './components/shared/NavBar';
import ProductsList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import Orders from './pages/Orders';
import AuthLanding from './components/authentication/AuthLanding';
import RequireAuth from './components/authentication/RequireAuth';

function App() {
    return (
        <ShoppingCartProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <NavBar />
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/products" replace />}
                        />
                        <Route path="/products">
                            <Route index element={<ProductsList />} />
                            <Route
                                path="/products/:productId"
                                element={<ProductDetail />}
                            />
                        </Route>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                        <Route
                            path="/orders"
                            element={
                                <RequireAuth>
                                    <Orders />
                                </RequireAuth>
                            }
                        />
                        <Route path="/login" element={<AuthLanding />} />
                    </Routes>
                </CssBaseline>
            </ThemeProvider>
        </ShoppingCartProvider>
    );
}

export default App;

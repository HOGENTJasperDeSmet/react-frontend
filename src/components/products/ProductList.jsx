import ProductItem from './ProductItem';
import { memo, useCallback, useState, useEffect, useMemo } from 'react';
import Error from '../shared/Error';
import Loader from '../shared/Loader';
import * as productsApi from '../../api/products';
import { Container, Grid, Input, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default memo(function ProductsList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchMinCost, setSearchMinCost] = useState();
    const [searchMaxCost, setSearchMaxCost] = useState();

    const fetchProducts = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await productsApi.getAll();
            setProducts(data);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const filteredProducts = useMemo(
        () =>
            products.filter((p) => {
                return p.name.toLowerCase().includes(searchName.toLowerCase());
            }),
        [searchName, products]
    );

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container>
            <Stack direction="row" gap={3}>
                <div style={{ width: '30%' }}>
                    <Grid item lg={2}>
                        <Stack mt={2}>
                            <Typography variant="h6">
                                Zoek een product
                            </Typography>
                            <Input
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="Zoeken..."
                            />

                            <Stack direction={'row'} spacing={2} mt={2}>
                                <Stack>
                                    <Typography variant="h6">
                                        Min. prijs
                                    </Typography>
                                    <Input
                                        value={searchMinCost}
                                        type="number"
                                        onChange={(e) =>
                                            setSearchMinCost(e.target.value)
                                        }
                                        placeholder="€ 0"
                                    />
                                </Stack>

                                <Stack>
                                    <Typography variant="h6">
                                        Max. prijs
                                    </Typography>
                                    <Input
                                        value={searchMaxCost}
                                        type="number"
                                        onChange={(e) =>
                                            setSearchMaxCost(e.target.value)
                                        }
                                        placeholder="€ 0"
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </div>
                <div style={{ width: '70%' }}>
                    <Grid item lg={10}>
                        <Loader loading={loading} />
                        {error && !loading ? (
                            <Error error={error} />
                        ) : !error && !loading ? (
                            filteredProducts.length === 0 ? (
                                <div className="alert alert-info">
                                    Geen producten gevonden op zoekresultaat.
                                </div>
                            ) : (
                                <Grid container spacing={1} margin={'auto'}>
                                    {' '}
                                    {filteredProducts.map((p) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            lg={4}
                                            key={p.productId}
                                        >
                                            <ProductItem {...p} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )
                        ) : null}
                    </Grid>
                </div>
            </Stack>
        </Container>
    );
});

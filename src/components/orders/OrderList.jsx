import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useOrders from '../../api/orders';
import { useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import Error from '../shared/Error';

export default function OrderList() {
    const ordersApi = useOrders();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await ordersApi.getAll();
                setOrders(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
        // eslint-disable-next-line
    }, []);

    const rows = [];
    orders.forEach((order) => {
        rows.push({
            id: order.trackAndTraceNumber,
            col2: new Date(order.orderDate).toLocaleDateString('en-GB'),
            col3: order.orderStatus,
        });
    });

    const columns = [
        { field: 'id', headerName: 'OrderId', flex: 1.5 },
        { field: 'col2', headerName: 'Datum', flex: 0.5 },
        { field: 'col3', headerName: 'Status', flex: 0.5 },
    ];

    return (
        <>
            <Loader loading={loading} />
            <Error error={error} />
            {!loading && !error ? (
                <div style={{ height: 800, width: '100%', margin: 'auto' }}>
                    <DataGrid
                        style={{
                            backgroundColor: 'white',
                            borderColor: 'transparent',
                        }}
                        rows={rows}
                        columns={columns}
                        disableColumnFilter
                        disableColumnMenu
                        disableColumnSelector
                        disableDensitySelector
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                style: { backgroundColor: 'white' },
                                csvOptions: { disableToolbarButton: true },
                                printOptions: { disableToolbarButton: true },
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                    />
                </div>
            ) : null}
        </>
    );
}

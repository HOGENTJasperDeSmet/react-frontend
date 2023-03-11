import { Divider, Stack } from '@mui/material';

function CaculatePercentage(totalPrice, percentage) {
    return (totalPrice * percentage).toFixed(2);
}

const PriceTotal = ({ totalPrice }) => {
    const BTW = 0.21;

    return (
        <Stack direction="column" gap={2} sx={{ padding: '0 0 1rem 1rem' }}>
            <h2 style={{ position: 'sticky', bottom: '0' }}>
                Totaalprijs: €{totalPrice}
            </h2>
            <Divider />
            <div className="price-row">
                <p>BTW (21%): </p>
                <p>€{CaculatePercentage(totalPrice, BTW)}</p>
            </div>
        </Stack>
    );
};

export default PriceTotal;

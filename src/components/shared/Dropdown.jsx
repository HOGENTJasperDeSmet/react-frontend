import { Divider } from '@mui/material';

const Dropdown = ({ open, trigger, menu }) => {
    return (
        <div className="dropdown">
            {trigger}
            {open ? (
                <ul className="menu">
                    {menu.map((menuItem, index) => (
                        <li key={index}>
                            {menuItem}
                            <Divider />
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};
export default Dropdown;

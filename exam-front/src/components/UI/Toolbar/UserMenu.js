import React, {useState} from 'react';

import Menu from "@material-ui/core/Menu";

import {NavLink} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
const UserMenu = ({user, logout}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton  color='inherit' onClick={handleClick} name='drop'>
                <AccountCircleIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}

            >
                <ListItem disabled>Hello {user.username}!</ListItem>
                <Divider/>

                <MenuItem onClick={handleClose} component={NavLink} to='/addPlace'>Добавить заведение</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
};
export default UserMenu;
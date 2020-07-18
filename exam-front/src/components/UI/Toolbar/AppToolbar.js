import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {logoutUser} from "../../../store/actions/usersAction";
import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    }
}));

const AppToolbar = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const classes = useStyles();
  return (
      <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" className={classes.title}>
                  <Link to='/' className={classes.mainLink}>Case Critic</Link>
              </Typography>
              {user ? (<UserMenu user={user} logout={() => dispatch(logoutUser())}/>): (<AnonymousMenu/>)}
          </Toolbar>
      </AppBar>
  );
};

export default AppToolbar;
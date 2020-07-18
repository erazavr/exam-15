 import React, {Component} from 'react';

import FormElement from "../../components/UI/FormElement/FormElement";
import Alert from "@material-ui/lab/Alert";
import {loginUser} from "../../store/actions/usersAction";

import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state})
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render() {
        return (
            <>
                <Grid container justify='center'>
                    <Grid item xs={12} lg={6}>
                        <Box pt={2} pb={2}>
                            <Typography variant='h4'>Вход</Typography>
                        </Box>
                    {this.props.error &&
                        <Grid item xs>
                            <Alert severity='error'>{this.props.error.error}</Alert>
                        </Grid>
                    }

                    <form onSubmit={this.submitFormHandler}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    propertyName='username'
                                    title='Имя пользователя'
                                    value={this.state.username}
                                    onChange={this.inputChangeHandler}
                                    type='text'
                                    autoComplete="current-username"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName='password'
                                    title='Ваш пароль'
                                    value={this.state.password}
                                    onChange={this.inputChangeHandler}
                                    type='password'
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs>
                                <Button color='primary' type='submit' variant='contained'>
                                    Войти
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    </Grid>
                </Grid>
            </>
        );
    }
}
const mapStateToProps = state => ({
   loading: state.users.loginLoading,
    error: state.users.loginError,
});
const mapDispatchToProps = dispatch => ({
   loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React, {Component} from 'react';

import FormElement from "../../components/UI/FormElement/FormElement";
import {registerUser} from "../../store/actions/usersAction";

import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class Register extends Component {
    state = {
        username: '',
        password: '',
    };
    submitFormHandler = event => {
        event.preventDefault();

        this.props.registerUser(this.state);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    getFieldError = fieldName => {
      try {
          return this.props.error.errors[fieldName].properties.message
      } catch (error) {
        return undefined
      }
    };

    render() {
        return (
            <>
                <Grid container justify='center'>
                    <Grid item xs={12} lg={6}>
                        <Box pt={2} pb={2}>
                            <Typography variant='h4'>Регистрация</Typography>
                        </Box>
                    <form onSubmit={this.submitFormHandler}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    propertyName='username'
                                    title='Имя пользователя'
                                    value={this.state.username}
                                    onChange={this.inputChangeHandler}
                                    error={this.getFieldError('username')}
                                    placeholder='Ваше имя'
                                    autoComplete='new-username'
                                    required={true}
                                    type='text'
                                />
                            </Grid>
                            <Grid item xs>
                                    <FormElement
                                        propertyName='password'
                                        title='Ваш пароль'
                                        value={this.state.password}
                                        onChange={this.inputChangeHandler}
                                        error={this.getFieldError('password')}
                                        placeholder='Пароль'
                                        autoComplete='new-password'
                                        required={true}
                                        type='password'
                                    />
                            </Grid>
                        <Grid item xs>
                            <Button color='primary' type='submit' variant='contained'>
                                 Зарегистрироваться
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
   error: state.users.registerError
});
const mapDispatchToProps = dispatch => ({
   registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
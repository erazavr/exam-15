import React, {Component} from 'react';

import FormElement from "../../components/UI/FormElement/FormElement";
import FileInput from "../../components/UI/FormElement/FileInput";
import {createPlace} from "../../store/actions/placesAction";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {Redirect} from "react-router-dom";

class AddRecipe extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        checked: false
    };
    submitFormHandler = event => {
        event.preventDefault();
        if(this.state.checked) {
            const formData = new FormData();

            Object.keys(this.state).forEach(key => {
                formData.append(key, this.state[key]);
            });

            this.props.createPlace(formData);
        }

    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    checkboxChangeHandler = () => {
        this.setState({checked: !this.state.checked})
    };
    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].properties.message
        } catch (error) {
            return undefined
        }
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    render() {
        console.log(this.props.error)
        return (
            <>
                {this.props.user ?
                    <Grid container justify='center'>
                        <Grid item xs={12} lg={6}>
                            <Box pt={2} pb={2}>
                                <Typography variant='h4'>Добавить заведение</Typography>
                            </Box>
                            <form onSubmit={this.submitFormHandler}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <FormElement
                                            propertyName='title'
                                            title='Название заведение'
                                            value={this.state.title}
                                            onChange={this.inputChangeHandler}
                                            error={this.getFieldError('title')}
                                            placeholder='Название блюда'
                                            autoComplete='new-title'
                                            type='text'
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormElement
                                            propertyName='description'
                                            title='Описание'
                                            value={this.state.description}
                                            onChange={this.inputChangeHandler}
                                            error={this.getFieldError('description')}
                                            placeholder='Описание'
                                            autoComplete='new-description'
                                            type='text'
                                            multiline={true}

                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FileInput
                                            name='image'
                                            label='Изображение'
                                            onChange={this.fileChangeHandler}
                                            error={this.getFieldError('image')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={this.state.checked} onChange={this.checkboxChangeHandler} value={this.state.checked} required/>
                                            }
                                            label="Я согласен"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Button color='primary' type='submit' variant='contained'>
                                            Создать
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>:<Redirect to='/login'/>
                }

            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.places.errors,
    user: state.users.user
});
const mapDispatchToProps = dispatch => ({
    createPlace: placeData => dispatch(createPlace(placeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";




const FormElement = props => {
    let inputComponent = (
        <TextField
            multiline={props.multiline}
            fullWidth
            variant='outlined'
            error={!!props.error}
            label={props.title}
            type={props.type} required={props.required}
            name={props.propertyName} id={props.propertyName}
            value={props.value}
            onChange={props.onChange}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            helperText={props.error}
        />
    );
    return inputComponent
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
    type: PropTypes.string
};

export default FormElement;
import React, {createRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const FileInput = ({onChange, name, label, error}) => {
    const useStyle = makeStyles({
       input: {
           display: 'none'
       }
    });
    const classes = useStyle();

    const inputRef = createRef();

    const [fileName, setFileName] = useState('');

    const onFileChange = e => {
        if (e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('')
        }
        onChange(e)
    };
    const activateInput = () => {
        inputRef.current.click()
    };
    return (
        <>
            <input
                type="file"
                name={name}
                className={classes.input}
                onChange={onFileChange}
                ref={inputRef}
            />
            <Grid container direction='row' spacing={2} alignItems='center'>
                <Grid item xs>
                    <TextField
                        variant='outlined'
                        disabled
                        error={!!error}
                        fullWidth
                        label={label}
                        value={fileName}
                        onClick={activateInput}
                    />
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={activateInput}>Browse</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;
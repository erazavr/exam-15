import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const AddComment = props => {
    return (
        <>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item>
                    <label htmlFor="qof">Качество еды </label>
                    <select name='qof' id='qof' onChange={props.onChange} value={props.qof} required>
                        <option/>
                        <option value={1}>1.0</option>
                        <option value={2}>2.0</option>
                        <option value={3}>3.0</option>
                        <option value={4}>4.0</option>
                        <option value={5}>5.0</option>
                    </select>

                </Grid>
                <Grid item>
                    <label htmlFor="sq">Качество обслуживания </label>
                    <select name='sq' id='sq' onChange={props.onChange} value={props.sq} required>
                        <option/>
                        <option value={1}>1.0</option>
                        <option value={2}>2.0</option>
                        <option value={3}>3.0</option>
                        <option value={4}>4.0</option>
                        <option value={5}>5.0</option>
                    </select>
                </Grid>
                <Grid item>
                    <label htmlFor="interior">Интерьер </label>
                    <select name='interior' id='interior' onChange={props.onChange} value={props.interior} required>
                        <option/>
                        <option value={1}>1.0</option>
                        <option value={2}>2.0</option>
                        <option value={3}>3.0</option>
                        <option value={4}>4.0</option>
                        <option value={5}>5.0</option>
                    </select>

                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Добавить
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default AddComment;
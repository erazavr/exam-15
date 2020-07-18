import React, {Component} from 'react';
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";

let arraySum = (array) => {
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum/array.length;
};
class AverageRating extends Component {
    state = {
        qof: arraySum(this.props.rating.map(rating=>rating.qof)),
        sq: arraySum(this.props.rating.map(rating=>rating.sq)),
        interior: arraySum(this.props.rating.map(rating=>rating.interior)),
        overAll: this.props.overAll
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.rating !== this.props.rating) {
            this.setState({
                qof: arraySum(this.props.rating.map(rating=>rating.qof)),
                sq: arraySum(this.props.rating.map(rating=>rating.sq)),
                interior: arraySum(this.props.rating.map(rating=>rating.interior))
            })
        }
    }

    overall = () => ((this.state.qof + this.state.sq + this.state.interior) / 3).toFixed(1);
    render() {
        return (
            <>
                    <Grid item container alignItems='center' justify={this.state.overAll ? 'center':'space-between'} className={this.props.className}>

                        {this.state.overAll ?
                            <Grid item container direction='column' alignItems='center'>
                                <Rating precision={0.5} value={+this.overall()} readOnly/>
                                <Grid item style={{margin: '10px 0'}}>
                                    {+this.overall() > 0 &&
                                        <span >({this.overall()}, {this.props.reviews} {this.props.reviews === 1 ? 'Отзыв' : this.props.reviews  >= 5?  'Отзывов': 'Отзыва'})</span>
                                    }
                                </Grid>
                            </Grid> :
                            <>
                                <span><b>Overall</b></span>
                                <Rating precision={0.5} value={+this.overall()} readOnly/>
                                <span>Easy to make</span>
                                <Rating precision={0.5} value={+this.state.qof} readOnly/>
                                <span>Quick to make</span>
                                <Rating precision={0.5} value={+this.state.sq} readOnly/>
                                <span>Taste</span>
                                <Rating precision={0.5} value={+this.state.interior} readOnly/>
                            </>
                        }

                    </Grid>
            </>
        );
    }
}

export default AverageRating;
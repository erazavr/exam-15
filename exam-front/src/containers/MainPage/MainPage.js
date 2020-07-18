import React, {Component} from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import {deletePlace, getPlaces} from "../../store/actions/placesAction";
import {getComments} from "../../store/actions/commentsAction";
import AverageRating from "../../components/UI/AverageRating/AverageRating";
import {getImagesByPlace} from "../../store/actions/imagesAction";
import Card from "@material-ui/core/Card";

import {connect} from "react-redux";
import {Container} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import apiURL from "../../constans";
import Button from "@material-ui/core/Button";


import CameraAltIcon from '@material-ui/icons/CameraAlt';

const Styles = theme => ({
    main: {
        marginTop: '50px'
    },
    root: {
        maxWidth: 345,

    },
    media: {
        height: 300,
    },
});
class MainPage extends Component {

    componentDidMount() {
        this.props.getPlaces();
        this.props.getComments();
        this.props.getImagesByPlace()
    }

    method = (type, id) => {
        let arr = [];
        let comments = this.props.comments && this.props.comments;
        let images = this.props.images && this.props.images

        if(type === 'rating') {
            comments.map(item => item.place === id && arr.push(item));
            return (
                <AverageRating
                    reviews={arr.length}
                    rating={arr}
                    overAll={true}
                />
            )
        } else if(type === 'image') {
            images.map(item => item.place === id && arr.push(item));
            return (
                arr.length > 0 &&
                        <Grid item container justify='center' alignItems='center'>
                            <CameraAltIcon/>{arr.length} фото
                        </Grid>
            )
        }

    };

    render() {
        const classes = this.props.classes;
        const places =  this.props.places;

        return (
            <>
                <Container>
                    <Grid container className={classes.main}>
                        <Typography gutterBottom variant="h3" component="h2">
                            Все заведения:
                        </Typography>
                    </Grid>

                    <Grid container className={classes.main} spacing={2}>
                        {places[0] ?
                            places.map(place => (
                                <Grid item xs sm={4} key={place._id}>
                                    <Card className={classes.root}>
                                        <CardActionArea name='place' onClick={() => this.props.history.push(`/onePlace/${place._id}`)}>
                                            <CardMedia
                                                className={classes.media}
                                                image={apiURL + '/uploads/' + place.image}
                                                title="Place image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {place.title}
                                                </Typography>
                                                {this.method('rating', place._id)}
                                                {this.method('image', place._id)}

                                            </CardContent>
                                        </CardActionArea>
                                        {this.props.user && this.props.user.role === 'admin' &&
                                        <Grid item container justify='center'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => this.props.deletePlace(place._id)}
                                            >
                                                Удалить
                                            </Button>
                                        </Grid>
                                        }
                                    </Card>
                                </Grid>
                            )): <h1>Ничего нету</h1>
                        }

                    </Grid>
                </Container>
            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user,
    places: state.places.places,
    comments: state.comments.comments,
    images: state.images.images
});
const mapDispatchToProps = dispatch => ({
    getPlaces: () => dispatch(getPlaces()),
    getComments: id => dispatch(getComments(id)),
    getImagesByPlace: () => dispatch(getImagesByPlace()),
    deletePlace: id => dispatch(deletePlace(id))

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(MainPage));
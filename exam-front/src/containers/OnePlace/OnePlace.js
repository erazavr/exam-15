import React, {Component} from 'react';
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import {addComment, deleteComment, getComments} from "../../store/actions/commentsAction";
import Paper from "@material-ui/core/Paper";
import FormElement from "../../components/UI/FormElement/FormElement";
import Rating from "@material-ui/lab/Rating";
import {getPlaceById} from "../../store/actions/placesAction";
import AverageRating from "../../components/UI/AverageRating/AverageRating";
import {addNewImage, deleteImage, getImagesByPlace} from "../../store/actions/imagesAction";
import FileInput from "../../components/UI/FormElement/FileInput";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import apiURL from "../../constans";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import AddComment from "../../components/AddComment/AddComment";


const Styles = theme => ({
    main: {
        marginTop: '50px',
        padding: '10px 10px'
    },
    textArea: {
        marginBottom: 10,
    },
    comment: {
        padding: '10px 10px',
        marginBottom: '20px'
    },
    rating: {
        width: 220
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',

    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});
class OnePlace extends Component {
    state = {
        place: this.props.match.params.id,
        qof: 0,
        sq: 0,
        interior: 0,
        comment: '',
        image: ''
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPlaceById(id);
        this.props.getComments(id);
        this.props.getImagesByPlace(id)
    }

    submitFormHandler = event => {
        event.preventDefault();
        const currentState = {
            place: this.state.place,
            comment: this.state.comment,
            qof: this.state.qof,
            sq: this.state.sq,
            interior: this.state.interior,
        };

        this.props.addComment(currentState);

        this.setState({
            comment: '',
            qof: 0,
            sq: 0,
            interior: 0,
        })

    };

    submitFormImageHandler = event => {
        event.preventDefault();
        const currentState = {
            place: this.state.place,
            image: this.state.image
        };
        const formData = new FormData();

        Object.keys(currentState).forEach(key => {
            formData.append(key, currentState[key]);
        });

        this.props.addNewImage(formData)
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    render() {
        const place = this.props.places;
        const classes = this.props.classes;
        const comments = this.props.comments;
        const user = this.props.user;
        const images = this.props.images;

        return (
            <>
                {place &&
                <Container>

                    <Paper>
                        <Grid container className={classes.main} justify='space-between'>
                            <Grid item>
                                <Typography gutterBottom variant="h3" component="h2">
                                    {place.title && place.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {place.description && place.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {place.image && <img style={{width: 300,borderRadius: '5px'}} src={apiURL + '/uploads/' + place.image} alt="placeImg"/>}

                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper>
                        <Grid container item className={classes.main} justify='center' alignItems='center' direction={images && images[0] ? 'row': 'column'}>
                            <Grid item>
                                <Typography gutterBottom variant="h4" component="h2">
                                    Галерея
                                </Typography>
                            </Grid>
                            {images && images[0] ?
                            <Grid item container wrap='nowrap' style={{height: 400,overflow: 'auto'}}>
                                {
                                    images.map(image => (
                                        <Grid item key={image._id} style={{margin: '0 10px',position: 'relative'}}>
                                            <img style={{width: 300, height: '100%', borderRadius: '5px'}} src={apiURL + '/uploads/' + image.image} alt='' />
                                            {user && user.role === 'admin' &&
                                            <Button
                                                style={{position: 'absolute', top: 0, left: 0}}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => this.props.deleteImage(image._id, image.place)}
                                            >Удалить</Button>
                                            }
                                        </Grid>
                                    ))
                                }
                            </Grid>:
                                <Grid item>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Пока что галерея пуста
                                    </Typography>
                                </Grid>
                            }

                        </Grid>
                    </Paper>

                    <Paper>
                        <Grid item className={classes.main}>
                            <Grid item>
                                <Typography gutterBottom variant="h4" component="h2">
                                    Средний рейтинг
                                </Typography>
                            </Grid>
                            {comments && comments[0] &&
                            <AverageRating
                                className={classes.rating}
                                rating={comments}
                                overAll={false}
                            />
                            }
                        </Grid>
                    </Paper>

                    <Paper>
                        <Grid item className={classes.main}>
                            <Grid item>
                                <Typography gutterBottom variant="h4" component="h2">
                                    Комментарии:
                                </Typography>
                            </Grid>
                            {comments && comments[0] ? comments.map(comment => (
                                    <Paper key={comment._id}>
                                        <Grid  item className={classes.comment}>
                                            <span>{moment(comment.date).format('lll')} <b>{comment.user.username} </b> написал:</span>
                                            <p>{comment.comment}</p>
                                            <Grid item container alignItems='center' justify='space-between' className={classes.rating}>
                                                <span>Quality of food</span>
                                                <Rating value={comment.qof} readOnly/>
                                                <span>Service quality</span>
                                                <Rating value={comment.sq} readOnly/>
                                                <span>Interior</span>
                                                <Rating value={comment.interior} readOnly/>
                                            </Grid>
                                            {user && user.role === 'admin' &&
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => this.props.deleteComment(comment._id, comment.place)}
                                                >
                                                    Удалить
                                                </Button>
                                            </Grid>
                                            }

                                        </Grid>

                                    </Paper>
                                )):
                                <Grid item>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Здесь пока что нет комментариев
                                    </Typography>
                                </Grid>
                            }

                        </Grid>
                    </Paper>

                    {user && place.user !== user._id ?
                        <Paper>
                            <Grid className={classes.main} id='container'>
                                <Grid item>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        Добавить Комментарий
                                    </Typography>
                                </Grid>
                                <form onSubmit={this.submitFormHandler}>
                                    <Grid item className={classes.textArea}>
                                        <FormElement
                                            title='Комментарий'
                                            propertyName="comment"
                                            type='text'
                                            placeholder="Ваш комментарий"
                                            value={this.state.comment}
                                            onChange={this.inputChangeHandler}
                                            multiline={true}
                                        />
                                    </Grid>
                                    <AddComment
                                        onChange={this.inputChangeHandler}
                                        qof={this.state.qof}
                                        sq={this.state.sq}
                                        interior={this.state.interior}
                                    />
                                </form>

                                <Divider style={{margin: '30px 0 '}} variant="middle"/>

                                <Grid item>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        Загрузить изображение
                                    </Typography>
                                </Grid>
                                <form onSubmit={this.submitFormImageHandler}>
                                    <Grid item xs>
                                        <FileInput
                                            name='image'
                                            label='Image'
                                            onChange={this.fileChangeHandler}
                                        />
                                    </Grid>
                                    <Grid item xs style={{marginTop: '20px'}}>
                                        <Button color='primary' type='submit' variant='contained'>
                                            Загрузить
                                        </Button>
                                    </Grid>
                                </form>
                            </Grid>
                        </Paper>: null
                    }
                </Container>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    places: state.places.places,
    user: state.users.user,
    comments: state.comments.comments,
    images: state.images.images
});
const mapDispatchToProps = dispatch => ({
    getPlaceById: id => dispatch(getPlaceById(id)),
    getComments: id => dispatch(getComments(id)),
    addComment: commentData => dispatch(addComment(commentData)),
    deleteComment: (id,placeId) => dispatch(deleteComment(id,placeId)),
    getImagesByPlace: placeId => dispatch(getImagesByPlace(placeId)),
    addNewImage: imageData => dispatch(addNewImage(imageData)),
    deleteImage: (id, placeId) => dispatch(deleteImage(id, placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(OnePlace));
import React, { Component, Suspense } from 'react';
import Grid from '@material-ui/core/Grid'
import Header from './Header/Header';
import SearchAppBar from './AppBar/AppBar';
import Divider from '@material-ui/core/Divider';
import Reviews from './Reviews'
import styles from './App.module.css';
import request from 'superagent';
import { AppContext } from './context';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearDeterminate from './LinearProgress'

const StoryForm = React.lazy(() => import('./StoryForm'));

export default class App extends Component {
  state = {
    done: undefined,
    reviews:[],
    url: '',
    currentStory: {},
    formOpen: false,
  }
  
  componentDidMount() {

    if(process.env.NODE_ENV === 'development') {
      this.getStories(process.env.REACT_APP_DEV__FUNC__URL);
      this.setState({ url: process.env.REACT_APP_DEV__FUNC__URL });
    }
    else {
      this.getStories(process.env.REACT_APP_PROD__FUNC__URL);
      this.setState({ url: process.env.REACT_APP_PROD__FUNC__URL });
    }
  }

  getStories = url => request.get(`${url}/chirps`)
    .set('Content-Type','application/json')
    .set('env', process.env.NODE_ENV)
    .then(res => {
      console.log('SEE ME ',res.body)
      this.setState({ reviews: res.body });
      return !this.state.done ? this.setState({ done: 99.99999 }) : null;
    });

  likePost = postId => {
    const post = this.state.reviews.find(review => review._id === postId);
    post.likes += 1;
    return this.updateCurrentStory(post);
    
  }

  makePost = post => request.post(`${this.state.url}/chirps`)
    .send(post)
    .set('Content-Type','application/json')
    .set('env', process.env.NODE_ENV)
    .then(res => this.setState({ reviews: [ ...this.state.reviews, ...res.body ] }));

  updateCurrentStory = story => this.setState({ currentStory: { ...story } }, () => request.put(`${this.state.url}/chirps/likes`)
  .send({ _id: this.state.currentStory._id, likes: this.state.currentStory.likes })
  .set('Content-Type','application/json')
  .set('env', process.env.NODE_ENV)
  .then(_ => {
    this.setState({ reviews: this.state.reviews.map(review => {
      if (review._id === this.state.currentStory._id) {
        review.likes = this.state.currentStory.likes;
      }
      return review;
    })});
    this.getStories(this.state.url);
  }));
  
  openForm = () => this.setState({ formOpen: this.state.formOpen ? false : true });

  render() {
    return (
      <AppContext.Provider value={{
        openModal: this.openModal,
        modalOpen: this.state.modalOpen,
        reviews: this.state.reviews,
        likePost: this.likePost,
        updateCurrentStory: this.updateCurrentStory,
        formOpen: this.state.formOpen,
        openForm: this.openForm,
        makePost: this.makePost,
      }}>
        <div className={styles.App}>
          <header className={styles['App-header']}>
            <SearchAppBar />
            <Header />
          </header>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Divider />
            <div className={styles['cards-wrapper']}> 
              { !this.state.done && (
                <div>
                  <LinearDeterminate  done={ this.state.done }/>
                  <h3>Please wait while horror stories are loading ...</h3>
                </div>
              ) }
              <Reviews />
            </div>
            {
              this.state.formOpen && (
                <Suspense fallback={ <div className={ styles.suspense }><CircularProgress /></div> }>
                  <StoryForm />
                </Suspense>
              )
            }
          </Grid>
        </div>
      </AppContext.Provider>
    );
  }
}
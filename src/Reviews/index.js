import React, { Component, Suspense } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './Reviews.module.css'
import { AppContext } from '../context';

const ReviewDialog = React.lazy(() => import('../ReviewDialog/ReviewDialog'));

export default class Reviews extends Component {
  state = {
    liked: false,
    open: false,
    review: {},
  }

  openThisModal = () => this.state.open ? this.setState({ open: false }) : this.setState({ open: true });

  openThisModal = () => this.state.open ? this.setState({ open: false }) : this.setState({ open: true });

  render() {
    const chosenReview = this.state.review;
    return (
      <div>
        <AppContext.Consumer>
          {
            ({ reviews }) => reviews.map((review, i) => (
              <Card key={ review._id } className={ styles.card }>
                <CardContent>
                
                  <Typography className={ styles.story } color='textSecondary'>
                    { `${ review.content.substring(0, 385) }...` }
                  </Typography>
                </CardContent>
                <CardActions className={ styles.cardActions }>
                  <Button onClick={ e => {
                    this.openThisModal();
                    this.setState({ review })
                  }} size='small'>Read More!</Button>
                  <div className={ styles.likes }>
                    <span 
                      role='img'
                      className={ styles['like-icon'] } 
                      aria-label='thumbs up emoji'
                      disabled={true}>👍
                    </span>
                    <span><Typography>{ review.likes }</Typography></span>
                  </div>
                </CardActions>
              </Card>
            ))
          }
        </AppContext.Consumer>
        {
          this.state.open && (
            <Suspense fallback={ <CircularProgress /> }>
              <ReviewDialog
                closeModal={ this.openThisModal }
                likes={ chosenReview.likes }
                open={ this.state.open }
                content={ chosenReview.content }
                title={ chosenReview.title }
                author={ chosenReview.author }
                reviewId = { chosenReview._id }
              />
            </Suspense>
          )
        }
      </div>
    );
  }
}

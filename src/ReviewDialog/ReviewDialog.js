import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import styles from './ReviewDialog.module.css';
import reviewStyles from '../Reviews/Reviews.module.css';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { AppContext } from '../context';


const ReviewDialog = ({ 
  author,
  likes,
  open,
  closeModal,
  title,
  content,
  fullScreen,
  reviewId
}) => (
  <AppContext.Consumer>
    {
      ({ likePost }) => (
        <Dialog open={ open } fullScreen={ fullScreen } >
          <DialogTitle id={ styles['dialog-title'] }>{ title }</DialogTitle>
          <h5 className={ styles.author }>by { author }</h5>
          <DialogContent>
            <DialogContentText className={ styles.context }>
              { content }
            </DialogContentText>
            <DialogActions className={ `${reviewStyles.cardActions} ${styles['actions-box']}` }>
              <div className={`${reviewStyles.likes} ${styles['like-box']}`}>
                <Button 
                  onClick={ () => likePost(reviewId) }
                  className={ styles['like-button'] }>
                  <span role="img"
                    className={ reviewStyles['like-icon'] } 
                    aria-label="thumbs up emoji"
                  >👍</span>
                </Button>
                <span><Typography className={ styles.likes }>{ likes }</Typography></span>
              </div>
              <Button 
                className={ styles['close-button'] }
                onClick={ e => closeModal() } size='small'>Close</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )
    }
  </AppContext.Consumer>
  
);

export default withMobileDialog()(ReviewDialog);
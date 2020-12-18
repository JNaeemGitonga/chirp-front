import React, {  } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { AppContext } from '../context';
import modularStyles from './AppBar.module.css'


const styles = theme => ({
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      margin: 'auto',
    }
})

function NavBar () {
  return (
    <AppContext.Consumer>
      {
        ({ openForm }) => (
          <div className={ modularStyles.root }>
            <AppBar position="static">
              <Toolbar className={ modularStyles.root }>
              <Tooltip title="Add your chirp" aria-label="Add your chirp">
                <IconButton 
                  onClick={ () => openForm() }
                  className={ modularStyles.menuButton }
                  color="inherit"
                  aria-label="Open drawer">
                  <AddCircle />
                </IconButton>
              </Tooltip>
                <Typography className={ styles.title } variant="h6" color="inherit" noWrap>
                  Chirp
                </Typography>
                <div className={ modularStyles.grow } />
              </Toolbar>
            </AppBar>
          </div>
        )
      }
    </AppContext.Consumer>
  );
}

export default withStyles(styles)(NavBar);
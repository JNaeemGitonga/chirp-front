import React from 'react';
import styles from './Intro.module.css';
import Button from '@material-ui/core/Button';
import { AppContext } from '../context';

const Intro = () => (
    <AppContext.Consumer>
      {
        ({ openForm }) => (
          <div className={styles['statement-wrapper']}>

              <Button 
                onClick={ openForm }
                className={ styles.statement}>
                  -- Click to add your chirp --
              </Button>
          </div>
        )
        }
      </AppContext.Consumer>
);

export default Intro;
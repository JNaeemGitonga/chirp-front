import React from 'react';
import Intro from '../IntroStatement/Intro';
import styles from './Header.module.css';

const Header = props => (
    <div className={styles['intro-wrapper']}>
        <h1> Chirp </h1>
        <div className={styles.aalogo}></div> 
        <Intro />
    </div>
);

export default Header;
'use client'
import { Container } from 'react-bootstrap';
import styles from '../app/page.module.css'
import React, { Component } from "react";
import Cart from "./cart";
import Image from 'next/image';
import logo from '../img/teslaLogo.png'
import background from '../img/teslaBackground.avif'

/**
 * Component dashboard that renders the styled background and the cart inside it
 */

class Dashboard extends Component{
    render(){
        return (
            <Container className={styles.space}>
                <Image className={styles.landingImage} alt="background" layout='fill' objectFit='cover' objectPosition='center' src={background}/>
                <Image className={styles.logo} alt="logo" width={100} height={100} src={logo}/>
                <Cart></Cart>
            </Container>
        );
    }
}

export default Dashboard;
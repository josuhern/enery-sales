'use client'
import { Container } from 'react-bootstrap';
import styles from '../app/page.module.css'
import React from "react";
import Device from "./device";
import Cart from "./cart";

const devices: Device[] = [
    new Device("Megapack 2XL", "40ft x 10ft", 4, 120000, 2022),
    new Device("Megapack 2", "30ft x 10ft", 3, 80000, 2021),
    new Device("Megapack", "30ft x 10ft", 2, 50000, 2005),
    new Device("Powerpack", "10ft x 10ft", 1, 20000, 2000),
    new Device("Transformer", "10ft x 10ft", -0.25, 10000)
];

const Dashboard : React.FC=()=>{
    return (
        <Container className={styles.space}>
            <h1>Energy Sales</h1><br/>
            <Cart devices={devices}></Cart>
        </Container>
    );
}

export default Dashboard;
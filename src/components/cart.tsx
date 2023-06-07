'use client'
import React, { useState } from "react";
import { Button, Col, Row, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Device from "./device";
import DevicesForm from "./devicesForm";
import CartItems from "./cartItems";
import Layout from "./layout";
import Utility from "./utilities";
import styles from '../app/page.module.css'

type CartProps = {
    devices: Device[];
};


const utilities = new Utility();
const packRatio = 6;

const Cart: React.FC<CartProps> = ({ devices }) => {
    const [cart, setCart] = useState<Device[]>([]);
    const [transfor, setTransfor] = useState<Device[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [energy, setEnergy] = useState<number>(0);

    const addToCartMultiple = (index: number, k: number) => {
        let count = k;
        let newCart = cart;
        while (count > 0) {
            newCart = [...newCart, devices[index]];
            setCart(newCart);
            count--;
        }
        updateQuatity(index, k);
    }

    const getDimensions = () => {
        var thisCart = cart;
        var thisTransfor = transfor;
        var width = 0;
        var maxWidth = 0;
        var height = 0;
        var rows = 1;
        const cartDevices = thisCart.concat(thisTransfor);
        cartDevices.forEach((value) => {
            if (width + value.width > 100) {
                width = value.width;
                rows++;
            } else {
                width += value.width;
            }
            if (width > maxWidth) maxWidth = width;
        });
        height = maxWidth == 0 ? 0 : rows * 10;
        return [maxWidth, height];
    }

    const resetCart = () => {
        devices[0].quantity = 0;
        devices[1].quantity = 0;
        devices[2].quantity = 0;
        devices[3].quantity = 0;
        devices[4].quantity = 0;
        setCart([]);
        setTransfor([]);
        setTotal(0);
        setEnergy(0);
    }

    const addToCart = (index: number) => {
        const newCart = [...cart, devices[index]];
        setCart(newCart);
        updateQuatity(index, 1);
    }

    const removeFromCart = (i: number) => {
        const newCart = [...cart];
        const index = newCart.indexOf(devices[i]);
        if (index > -1) {
            newCart.splice(index, 1);
            setCart(newCart);
        }
        updateQuatity(i, -1);
    }

    const updateQuatity = (index: number, quantity: number) => {
        devices[index].quantity = quantity + devices[index].quantity;
        devices[4].quantity = devices[index].quantity / 4;
        updateTranformers();
        updateTotal();
    }

    const updateTranformers = () => {
        devices[4].quantity = 0;
        devices[4].quantity += devices[0].quantity / 4;
        devices[4].quantity += devices[1].quantity / 4;
        devices[4].quantity += devices[2].quantity / 4;
        devices[4].quantity += devices[3].quantity / 4;
        devices[4].quantity = Math.floor(devices[4].quantity);
        let quantity = devices[4].quantity;
        let transformers: Device[] = [];
        while (quantity > 0) {
            transformers = [...transformers, devices[4]];
            quantity--;
        }
        setTransfor(transformers);
    }

    const updateTotal = () => {
        var total = devices[0].quantity * devices[0].price;
        total += devices[1].quantity * devices[1].price;
        total += devices[2].quantity * devices[2].price;
        total += devices[3].quantity * devices[3].price;
        total += devices[4].quantity * devices[4].price;
        setTotal(total);

        var energy = devices[0].quantity * devices[0].energy;
        energy += devices[1].quantity * devices[1].energy;
        energy += devices[2].quantity * devices[2].energy;
        energy += devices[3].quantity * devices[3].energy;
        energy += devices[4].quantity * devices[4].energy;
        setEnergy(energy);
    }

    return (
        <Container className={styles.landingContainer} >
            <center><h1 className={styles.landingItems}>Energy Sales</h1><br /></center>
            <DevicesForm devices={devices} onFromSubmit={addToCartMultiple} />
            <Row className={styles.space}>
                <Col xs="auto" md="6" lg="6">
                    <h3>Cart <Button variant="outline-danger" type="button" onClick={e => resetCart()}><FontAwesomeIcon icon={faTrash} /></Button></h3>
                    <p id="total"><strong>Total:</strong> {utilities.currencyFormat(total)}</p>
                    <p><strong>Energy density:</strong> {energy} MWh</p>
                    <p><strong>Land dimension required:</strong> {getDimensions()[0]}ft x {getDimensions()[1]}ft</p>
                    <CartItems devices={devices} removeItem={removeFromCart} addItem={addToCart} />
                </Col>
                <Col xs="auto" md="6" lg="6">
                    <Layout packRatio={packRatio} cart={cart} transfor={transfor}></Layout>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
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

/**
 * decorator function to format prices
 */
const utilities = new Utility();

/**
 * @var packRatio used for rendering batteries at scale
 */
const packRatio = 6;

/**
* Defining the initial catalog of bateries.
*/
const devices: Device[] = [
    new Device("Megapack 2XL", "40ft x 10ft", 4, 120000, 2022),
    new Device("Megapack 2", "30ft x 10ft", 3, 80000, 2021),
    new Device("Megapack", "30ft x 10ft", 2, 50000, 2005),
    new Device("Powerpack", "10ft x 10ft", 1, 20000, 2000),
    new Device("Transformer", "10ft x 10ft", -0.25, 10000)
];

const Cart: React.FC = () => {
    /**
     * cart hook that allows to track the bateries in cart
     */
    const [cart, setCart] = useState<Device[]>([]);
    /**
     * transfor hook that allows to track the transoformers in cart
     */
    const [transfor, setTransfor] = useState<Device[]>([]);

    /**
     * total hook allow to track the total amount
     * energy hook allows to track the energy density
     */
    const [total, setTotal] = useState<number>(0);
    const [energy, setEnergy] = useState<number>(0);

    /**
     * addToCartMultiple adds multiple batteries to the cart hook | layout | and calls the update quantity
     * @param index gets the index of the catalog to add to the cart
     * @param k is the number of items of the given index to add
     */
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

    /**
     * Function that calculates the dimentions required
     * @returns the land dimention required
     */
    const getDimensions = () => {
        var thisCart = cart;
        var thisTransfor = transfor;
        var width = 0;
        var maxWidth = 0;
        var height = 0;
        var rows = 1;
        // adding the transformers to the end of the queue
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

    /**
     * cleans the cart by reseting all the values to 0
     */
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

    /**
     * Function that adds to cart a battery using its index 
     * @param index 
     */
    const addToCart = (index: number) => {
        const newCart = [...cart, devices[index]];
        setCart(newCart);
        updateQuatity(index, 1);
    }

    /**
     * Function that removes from the cart a battery using its index
     * @param i 
     */
    const removeFromCart = (i: number) => {
        const newCart = [...cart];
        const index = newCart.indexOf(devices[i]);
        if (index > -1) {
            newCart.splice(index, 1);
            setCart(newCart);
        }
        updateQuatity(i, -1);
    }

    /**
     * Function that updates the quatity of the batteries in the initial catalog
     * this is to track the number of batteries in the cart with out summing every time the queue
     * @param index of battery to add or remove
     * @param quantity of batteries to add or remove
     */
    const updateQuatity = (index: number, quantity: number) => {
        devices[index].quantity = quantity + devices[index].quantity;
        devices[4].quantity = devices[index].quantity / 4;
        updateTranformers(); //recalculates the transformers
        updateTotal(); //updates the total price and the total energy density
    }

    /**
     * Function that calculates the amout of transformers based on the global quantity of batteries
     * having a fixed catalog of bateries every 4 of each add a new transformer
     */
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

    /**
     * Functions that calculates the global total on price and energy density
     */
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
            {/* Form */}
            <DevicesForm devices={devices} onFromSubmit={addToCartMultiple} />
            <Row className={styles.space}>
                {/* Totals */}
                <Col xs="auto" md="6" lg="6">
                    <h3>Cart <Button variant="outline-danger" type="button" onClick={e => resetCart()}><FontAwesomeIcon icon={faTrash} /></Button></h3>
                    <p id="total"><strong>Total:</strong> {utilities.currencyFormat(total)}</p>
                    <p><strong>Energy density:</strong> {energy} MWh</p>
                    <p><strong>Land dimension required:</strong> {getDimensions()[0]}ft x {getDimensions()[1]}ft</p>
                    <CartItems devices={devices} removeItem={removeFromCart} addItem={addToCart} />
                </Col>
                {/* Layout */}
                <Col xs="auto" md="6" lg="6">
                    <Layout packRatio={packRatio} cart={cart} transfor={transfor}></Layout>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
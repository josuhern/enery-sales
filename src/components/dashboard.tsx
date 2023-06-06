'use client'
import React, { Component, useState } from "react";
import Device from "./device";
import Layout from "./layout";
import Cart from "./cart";
import styles from '../app/page.module.css'
import { Badge, Button, Card, Container, Form, InputGroup, ListGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faAngleUp, faAngleDown, faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const devices: Device[] = [
    new Device("Megapack 2XL", "40ft x 10ft", 4, 120000, 2022),
    new Device("Megapack 2", "30ft x 10ft", 3, 80000, 2021),
    new Device("Megapack", "30ft x 10ft", 2, 50000, 2005),
    new Device("Powerpack", "10ft x 10ft", 1, 20000, 2000),
    new Device("Transformer", "10ft x 10ft", -0.25, 10000)
];
function DashboardFN() {
    const [cart, setCart] = useState<Device[]>([]);
    const [transfor, setTransfor] = useState<Device[]>([]);
    const [inputForm, setInputForm] = useState<number[]>([0, 0, 0, 0]);
    const [total, setTotal] = useState<number>(0);
    const [energy, setEnergy] = useState<number>(0);

    const packRatio = 6;

    const currencyFormat = (num: number | undefined) => {
        const result = num ? '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "$0";
        return result;
    }

    const addToCart = (index: number) => {
        const newCart = [...cart, devices[index]];
        setCart(newCart);
        updateQuatity(index, 1);
    }

    const handleFormChage = (index: number, event: React.ChangeEvent<Element>) => {
        const newData = (event.target as HTMLInputElement);
        let data = [...inputForm];
        data[index] = parseInt(newData.value);
        setInputForm(data);
    }

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputForm.forEach((newVal, index) => {
            addToCartMultiple(index, newVal);
        });
        setInputForm([0, 0, 0, 0])
    }

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

    const removeFromCart = (i: number) => {
        const newCart = [...cart];
        const index = newCart.indexOf(devices[i]);
        if (index > -1) {
            newCart.splice(index, 1);
            setCart(newCart);
        }
        updateQuatity(i, -1);
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
        <Container>
            <h1>Energy Sales</h1>
            <Row>
                {devices.map(function (d, idx) {
                    if (!d.transformer)
                        return (
                            <Col key={idx}>
                                    <Card className={styles.card}>
                                        <center>
                                    <div className={styles.square} style={{ height: d.height * packRatio, width: d.width * packRatio }}>
                                        <p>{d.height}ft x {d.width}ft</p>
                                    </div><br></br>
                                    <p><strong>{d.deviceName}</strong> <Badge bg="primary">{d.quantity}</Badge></p>
                                    <p><strong>{d.energy} MWh</strong></p>
                                    <p><strong>{currencyFormat(d.price)}</strong></p>
                                    
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <Form.Control placeholder="Add to layout" aria-label="Add to layout" name='newValue' type="number" value={inputForm[idx]} onChange={e => handleFormChage(idx, e)} />
                                            <Button variant="outline-primary" type="button" onClick={submit}>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                    
                                    </center>
                                    </Card>
                            </Col>)
                })}
            </Row><br></br>
            <br></br>
            <Row>
                <Col>
                    <h3>Cart</h3>
                    <p>Total: {currencyFormat(total)}</p>
                    <p>Energy: {energy} MWh</p>
                    <p>Land space: {getDimensions()[0]}ft x {getDimensions()[1]}ft</p>
                    <Button variant="outline-danger" type="button" onClick={e => resetCart()}><FontAwesomeIcon icon={faTrash} /></Button>
                </Col>
                <Col>
                    <h3>Items in cart</h3>
                    <ListGroup className="list-group-flush">
                        {devices.map(function (d, idx) {
                            return (      
                                <ListGroup.Item key={idx}>
                                    <InputGroup className="mb-3">
                                    <InputGroup.Text><Badge bg="primary">{d.quantity}</Badge></InputGroup.Text>
                                    <InputGroup.Text>{d.deviceName} </InputGroup.Text>
                                    <Button hidden={d.transformer} variant="danger" type="button" disabled={d.quantity <= 0} onClick={e => removeFromCart(idx)}><FontAwesomeIcon icon={faMinus} /></Button>
                                    <Button hidden={d.transformer} variant="success" type="button" onClick={e => addToCart(idx)}><FontAwesomeIcon icon={faPlus} /></Button>
                                    </InputGroup>
                                    
                                </ListGroup.Item>)
                        })}
                    </ListGroup>
                </Col>
                <Col>
                <Layout packRatio={packRatio} cart={cart} transfor={transfor}></Layout>
                </Col>
            </Row>
        </Container>
    );
}

const Dashboard : React.FC=()=>{
    const [cart, setCart] = useState<Device[]>([]);
    const [transfor, setTransfor] = useState<Device[]>([]);
    const [inputForm, setInputForm] = useState<number[]>([0, 0, 0, 0]);
    const [total, setTotal] = useState<number>(0);
    const [energy, setEnergy] = useState<number>(0);

    const packRatio = 6;

    const currencyFormat = (num: number | undefined) => {
        const result = num ? '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "$0";
        return result;
    }

    const addToCart = (index: number) => {
        const newCart = [...cart, devices[index]];
        setCart(newCart);
        updateQuatity(index, 1);
    }

    const handleFormChage = (index: number, event: React.ChangeEvent<Element>) => {
        const newData = (event.target as HTMLInputElement);
        let data = [...inputForm];
        data[index] = parseInt(newData.value);
        setInputForm(data);
    }

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputForm.forEach((newVal, index) => {
            addToCartMultiple(index, newVal);
        });
        setInputForm([0, 0, 0, 0])
    }

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

    const removeFromCart = (i: number) => {
        const newCart = [...cart];
        const index = newCart.indexOf(devices[i]);
        if (index > -1) {
            newCart.splice(index, 1);
            setCart(newCart);
        }
        updateQuatity(i, -1);
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
        <Container>
            <h1>Energy Sales</h1>
            <Row>
                {devices.map(function (d, idx) {
                    if (!d.transformer)
                        return (
                            <Col key={idx}>
                                    <Card className={styles.card}>
                                        <center>
                                    <div className={styles.square} style={{ height: d.height * packRatio, width: d.width * packRatio }}>
                                        <p>{d.height}ft x {d.width}ft</p>
                                    </div><br></br>
                                    <p><strong>{d.deviceName}</strong> <Badge bg="primary">{d.quantity}</Badge></p>
                                    <p><strong>{d.energy} MWh</strong></p>
                                    <p><strong>{currencyFormat(d.price)}</strong></p>
                                    
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <Form.Control placeholder="Add to layout" aria-label="Add to layout" name='newValue' type="number" value={inputForm[idx]} onChange={e => handleFormChage(idx, e)} />
                                            <Button variant="outline-primary" type="button" onClick={submit}>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                    
                                    </center>
                                    </Card>
                            </Col>)
                })}
            </Row><br></br>
            <br></br>
            <Row>
                <Col>
                    <h3>Cart</h3>
                    <p>Total: {currencyFormat(total)}</p>
                    <p>Energy: {energy} MWh</p>
                    <p>Land space: {getDimensions()[0]}ft x {getDimensions()[1]}ft</p>
                    <Button variant="outline-danger" type="button" onClick={e => resetCart()}><FontAwesomeIcon icon={faTrash} /></Button>
                </Col>
                <Col>
                    <h3>Items in cart</h3>
                    <ListGroup className="list-group-flush">
                        {devices.map(function (d, idx) {
                            return (      
                                <ListGroup.Item key={idx}>
                                    <InputGroup className="mb-3">
                                    <InputGroup.Text><Badge bg="primary">{d.quantity}</Badge></InputGroup.Text>
                                    <InputGroup.Text>{d.deviceName} </InputGroup.Text>
                                    <Button hidden={d.transformer} variant="danger" type="button" disabled={d.quantity <= 0} onClick={e => removeFromCart(idx)}><FontAwesomeIcon icon={faMinus} /></Button>
                                    <Button hidden={d.transformer} variant="success" type="button" onClick={e => addToCart(idx)}><FontAwesomeIcon icon={faPlus} /></Button>
                                    </InputGroup>
                                    
                                </ListGroup.Item>)
                        })}
                    </ListGroup>
                </Col>
                <Col>
                <Layout packRatio={packRatio} cart={cart} transfor={transfor}></Layout>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
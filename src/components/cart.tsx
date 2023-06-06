'use client'
import React, { Component } from "react";
import { Badge, Button, InputGroup, ListGroup, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Device from "./device";
import Utility from "./utilities";

interface CartProps {
    devices: Device[];
    total: number;
    energy: number;
    getDimensions(): number[];
    resetCart(): void;
    removeFromCart(): void;
    addToCart(): void;
};

const utilities = new Utility();

class Cart extends Component<CartProps>{
    constructor(props: CartProps) {
        super(props);
    }

    total = this.props.total ? this.props.total : 0;
    energy = this.props.energy ? this.props.energy : 0;
    render() {
        return (
            <Row>
                <Col>
                    <h3>Cart</h3>
                    <p>Total: {utilities.currencyFormat(this.total)}</p>
                    <p>Energy: {this.energy} MWh</p>
                    <p>Land space: {this.props.getDimensions()[0]}ft x {this.props.getDimensions()[1]}ft</p>
                    <Button variant="outline-danger" type="button" onClick={e => this.props.resetCart()}><FontAwesomeIcon icon={faTrash} /></Button>
                </Col>
                <Col>
                    <h3>Items in cart</h3>
                    <ListGroup className="list-group-flush">
                        {this.props.devices.map(function (d, idx) {
                            return (
                                <ListGroup.Item key={idx}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><Badge bg="primary">{d.quantity}</Badge></InputGroup.Text>
                                        <InputGroup.Text>{d.deviceName} </InputGroup.Text>
                                        {/* <Button hidden={d.transformer} variant="danger" type="button" disabled={d.quantity <= 0} onClick={e => this.props.removeFromCart(idx)}><FontAwesomeIcon icon={faMinus} /></Button>
                                        <Button hidden={d.transformer} variant="success" type="button" onClick={e => this.props.addToCart(idx)}><FontAwesomeIcon icon={faPlus} /></Button> */}
                                    </InputGroup>

                                </ListGroup.Item>)
                        })}
                    </ListGroup>
                </Col>
            </Row>
        );
    }
};

export default Cart;
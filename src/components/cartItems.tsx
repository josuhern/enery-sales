'use client'
import React from "react";
import { Badge, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Utility from "./utilities";
import Device from "./device";

const utilities = new Utility();

/**
 * Data type for props CartItem
 * @param idx the index for this given battery
 * @param device information of device
 * @param removeItem Interface function that handles removing one battery
 * @param addItem Interface function that handles adding one battery
 */
type CartItemProps = {
    idx: number;
    device: Device;
    removeItem(index: number): void;
    addItem(index: number): void;
}

/**
 * Data type for props CartItem
 * @param devices catalog of batteries
 * @param removeItem Interface function that handles removing one battery
 * @param addItem Interface function that handles adding one battery
 */
type CartItemsProps = {
    devices: Device[];
    removeItem(index: number): void;
    addItem(index: number): void;
};

/**
 * React function component that gets a the calaog of bateries list the deatils of total for each kind
 * @param devices list of batteries
 * @param removeItem interface function that handles removing
 * @param addItem interface function that handles adding 
 * @returns 
 */
const CartItems: React.FC<CartItemsProps> = ({ devices, removeItem, addItem }) => {
    return (
        <div>
            <p><strong>Items in cart</strong></p>
            <ListGroup>
                {devices.map(function (d, idx) {
                    return (
                        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-start">
                            <div className="ms-6">
                                <Item idx={idx} device={d} removeItem={removeItem} addItem={addItem}></Item>
                            </div>
                            <Badge bg="danger" pill>{d.quantity}</Badge>
                        </ListGroup.Item>
                    )
                })}
                <ListGroup.Item>
                    <i>** For every 4 industrial batteries bought 1 transformer is needed.</i>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

/**
 * React function component that render a battery with the given props
 * @param idx index of the battery
 * @param device information of the battery
 * @param removeItem interaface funciton to remove item
 * @param addItem interface function to add item
 * @returns A list item that allows to add and remove itself and detail information about how many of those batteries are in the cart
 */
const Item: React.FC<CartItemProps> = ({ idx, device, removeItem, addItem }) => {
    if (device.transformer) { //if Transformer the limited options are render
        return (
            <InputGroup>
                <InputGroup.Text>{device.deviceName}&nbsp;**</InputGroup.Text>
                <InputGroup.Text>{utilities.currencyFormat(device.quantity*device.price)}</InputGroup.Text>
            </InputGroup>
        );
    } else {
        return (
            <InputGroup>
                <Button id={"remove-"+idx} variant="outline-danger" type="button" disabled={device.quantity <= 0} onClick={e => removeItem(idx)}><FontAwesomeIcon icon={faMinus} /></Button>
                <Button id={"add-"+idx} variant="outline-danger" type="button" onClick={e => addItem(idx)}><FontAwesomeIcon icon={faPlus} /></Button>
                <InputGroup.Text>{device.deviceName}</InputGroup.Text>
                <InputGroup.Text>{utilities.currencyFormat(device.quantity*device.price)}</InputGroup.Text>
            </InputGroup>
        );
    }
}

export default CartItems;
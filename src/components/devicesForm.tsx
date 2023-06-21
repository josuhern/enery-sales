'use client'
import React, { useState } from "react";
import { Badge, Button, Card, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import styles from '../app/page.module.css'
import Device from "./device";
import Utility from "./utilities";

/**
 * Data type for props that gets
 * @param devices the initial catalog of devices
 * @param onFormSubmit Interface function that handles the submit button
 */
type DevicesFormProps = {
    devices: Device[];
    onFromSubmit(index: number, k: number): void;
};

/**
 * decorator function to format prices
 */
const utilities = new Utility();

/**
 * @var packRatio used for rendering batteries at scale
 */
const packRatio = 6;

/**
 * React Function Component that handles the multi insertion of batteries
 * @param devices the initial catalog of devices
 * @param onFormSubmit Interface function that handles the submit button
 */
const DevicesForm: React.FC<DevicesFormProps> = ({ devices, onFromSubmit }) => {

    /**
     * input Form hook that stores the input for each input field in the form
     */
    const [inputForm, setInputForm] = useState<number[]>([0, 0, 0, 0]);

    /**
     * Function thant updates the inputForm hook with the new value inserted
     * @param index the battery index that is going to be added
     * @param event on change event | every time the user changes the input
     */
    const handleFormChage = (index: number, event: React.ChangeEvent<Element>) => {
        const newData = (event.target as HTMLInputElement);
        let thisNum = parseInt(newData.value);
        let data = [...inputForm];
        data[index] = isNaN(thisNum) ? 0 : thisNum;
        setInputForm(data);
    }

    /**
     * Submit function that calls the interface function to update the cart
     * @param e 
     */
    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputForm.forEach((newVal, index) => {
            onFromSubmit(index, newVal);
        });
        setInputForm([0, 0, 0, 0])
    }

    return (
        <Row>
            {devices.map(function (d, idx) {
                // only if it is not a transformer
                if (!d.transformer)
                    return (
                        <Col xs="12" md="6" lg="3" key={idx}>
                            <Card className={styles.card}>
                                <center>
                                    <div className={styles.square} style={{ height: d.height * packRatio, width: d.width * packRatio }}>
                                        <p>{d.height}ft x {d.width}ft</p>
                                    </div><br></br>
                                    <p><strong>{d.deviceName}</strong> <Badge bg="danger">{d.quantity}</Badge></p>
                                    <p><strong>{d.energy} MWh</strong></p>
                                    <p><strong>{utilities.currencyFormat(d.price)}</strong></p>

                                    <Form id={"form-" + idx}>
                                        <InputGroup className="mb-3">
                                            <Form.Control placeholder="Add to cart" aria-label="Add to cart" name={'newValue-' + idx} type="number" value={inputForm[idx]} onChange={e => handleFormChage(idx, e)} />
                                            <Button variant="outline-danger" type="button" name={'submit-' + idx} onClick={submit}>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </Button>
                                        </InputGroup>
                                    </Form>

                                </center>
                            </Card>
                        </Col>
                    )
            })}
        </Row>
    );
}

export default DevicesForm;
'use client'
import React, { Component } from "react";
import styles from '../app/page.module.css'
import Device from "./device";

/**
 * Layout component renders the blocks that represent the batteries
 * this function uses a ratio to draw the devices at scale
 */

type LayoutProps = {
    cart: Device[];
    transfor: Device[];
    packRatio: number;
};

class Layout extends Component<LayoutProps>{
    ratio = this.props.packRatio ? this.props.packRatio : 6;
    render() {
        return (
            <div>
                <h3>Layout</h3>
                <div className={styles.land}>
                    {this.props.cart.map((d: Device, idX) => (
                        <div key={d.deviceName+"-"+idX} data-test-id={"device-"+idX} className={styles.square} style={{ height: d.height * this.ratio, width: d.width * this.ratio }}>
                            <p>{d.deviceName}</p>
                        </div>
                    ))}
                    {this.props.transfor.map((d: Device, idX) => (
                        <div key={d.deviceName+"-"+idX} data-test-id={"transforme-"+idX} className={styles.square} style={{ height: d.height * this.ratio, width: d.width * this.ratio }}>
                            <p>{d.deviceName}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default Layout;
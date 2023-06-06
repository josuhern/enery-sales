'use client'
import React, { Component } from "react";
import styles from '../app/page.module.css'
import Device from "./device";

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
                        <div key={idX} className={styles.square} style={{ height: d.height * this.ratio, width: d.width * this.ratio }}>
                            <p>{d.deviceName}</p>
                        </div>
                    ))}
                    {this.props.transfor.map((d: Device, idX) => (
                        <div key={idX} className={styles.square} style={{ height: d.height * this.ratio, width: d.width * this.ratio }}>
                            <p>{d.deviceName}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default Layout;
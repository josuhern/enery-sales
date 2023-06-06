import { faL } from "@fortawesome/free-solid-svg-icons";

export default class Device{
    deviceName: string;
    floorDimension: string;
    width: number;
    height: number;
    energy: number;
    price: number;
    releaseDate: number | null;
    array: any;
    img: string;
    quantity: number = 0;
    transformer: boolean = false;
    newValue: number = 0;
    
    constructor(deviceName: string, floorDimension: string, energy: number, price: number, releaseDate?: number){
        this.deviceName = deviceName;
        this.floorDimension = floorDimension;
        this.width = parseFloat(floorDimension.replace(/(^\d+)(.+$)/i,'$1'));
        this.height = parseFloat(floorDimension.replace( /(^.+\D)(\d+)(\D.+$)/i,'$2'));
        this.energy = energy;
        this.price = price;
        this.releaseDate = releaseDate ? releaseDate : null;
        this.transformer = releaseDate ? false : true;
        this.img = "https://www.tesla.com/tesla_theme/assets/img/powerpack/inside-powerpack-open.png?20161028"
    }

}
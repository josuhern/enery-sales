export default class Device{
    deviceName: string;
    floorDimension: string;
    width: number;
    height: number;
    energy: number;
    price: number;
    releaseDate: number | null;
    quantity: number = 0;
    transformer: boolean = false;
    
    constructor(deviceName: string, floorDimension: string, energy: number, price: number, releaseDate?: number){
        this.deviceName = deviceName;
        this.floorDimension = floorDimension;
        this.width = parseFloat(floorDimension.replace(/(^\d+)(.+$)/i,'$1'));
        this.height = parseFloat(floorDimension.replace( /(^.+\D)(\d+)(\D.+$)/i,'$2'));
        this.energy = energy;
        this.price = price;
        this.releaseDate = releaseDate ? releaseDate : null;
        this.transformer = releaseDate ? false : true;
    }

}
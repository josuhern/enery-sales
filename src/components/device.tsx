/**
 * Class definition of a Device (Battery)
 * @param deviceName device name to display
 * @param floorDimension input param that defines the messurement of the batter comming on string format "40ft x 10ft"
 * @param width gets populated after parsing the floor dimension and it is being used for scale ratio
 * @param height gets populated after parsing the floor dimension and it is being used for scale ratio
 * @param energy shows the energy density of the battery
 * @param price shows the price of the battery
 * @param releaseDate release date of the battery
 * @param quantity used in the cart to keep track of the quantity of batteries to purchase
 * @param transformer if there is no release date, then it is a transformer, used to diferenciate a transformer
 */

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
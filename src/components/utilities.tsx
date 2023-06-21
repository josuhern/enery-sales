export default class Utility {
    /**
     * Decorator fucntion that formats an integer to price
     * @param num 
     * @returns string on price format
     */
    currencyFormat = (num: number | undefined) => {
        const result = num ? '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "$0";
        return result;
    }
}
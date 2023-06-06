export default class Utility {
    currencyFormat = (num: number | undefined) => {
        const result = num ? '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "$0";
        return result;
    }
}
export const MoneyFormat = (monto, contadorDec = 2) => {
    var separador = ",";
    var dec = ".";
    contadorDec = Math.abs(contadorDec);
    contadorDec = isNaN(contadorDec) ? 2 : contadorDec;
    
    var signo = monto < 0 ? "-" : "";
    let i = parseInt(monto = Math.abs(Number(monto) || 0).toFixed(contadorDec)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return signo + (j ? i.substr(0, j) + separador : "") 
        + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + separador) 
        + (contadorDec ? dec + Math.abs(monto - i).toFixed(contadorDec).slice(2) : "");   
}

export const Rx_round = (num, dec = 1) => {
    if ((typeof num !== 'number') || (typeof dec !== 'number')) return num; 
    var num_sign = num >= 0 ? 1 : -1;
    return (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
}
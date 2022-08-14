export function getDateToCard() {
    var date = new Date();
    var year = date.getFullYear() + 5;
    var month = date.getMonth();
    return new Date("".concat(year, "-").concat(month));
}
export function formatTimestampToBirthdate(birthdate) {
    var hoje = new Date();
    return Math.floor(Math.ceil(Math.abs(birthdate.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);
}
export function nameFormatter(fullName) {
    var splitedName = fullName.split(" ");
    var formatedName = "";
    for (var i = 0; i < splitedName.length; i++) {
        if (i === 0) {
            formatedName += "".concat(splitedName[i], " ");
        }
        else if (i === splitedName.length - 1) {
            formatedName += splitedName[i];
        }
        else {
            formatedName += "".concat(splitedName[i][0], " ");
        }
    }
    return formatedName.toUpperCase();
}

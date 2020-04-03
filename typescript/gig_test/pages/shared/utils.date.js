"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateUtils {
    getDateTime(date) {
        return date != null && date != undefined ? date.getTime() : 0;
    }
    toDate(date) {
        if (date && date.length > 0) {
            const [day, month, year] = date.split("-");
            let yearHour = year.split(" ");
            const yearAux = yearHour[0];
            let time = yearHour[1].split(":");
            const hour = time[0];
            const minute = time[1];
            return date != null && date != undefined ? new Date(Number(yearAux), Number(month) - 1, Number(day), Number(hour), Number(minute)) : null;
        }
        else {
            return null;
        }
    }
    sortByDueDate(array, attribute) {
        return array.sort((a, b) => { return this.getDateTime(b[attribute]) - this.getDateTime(a[attribute]); });
    }
    isArrayOrderDate(array, attribute) {
        array = array.filter(dateAux => dateAux != null && dateAux != undefined);
        let result = true;
        let OrderstringArray = this.sortByDueDate([...array], attribute);
        for (let i = 0; i <= array.length - 1; i++) {
            result = (array[i][attribute] == OrderstringArray[i][attribute]);
        }
        return result;
    }
}
exports.DateUtils = DateUtils;
//# sourceMappingURL=utils.date.js.map
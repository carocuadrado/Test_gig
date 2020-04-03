"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
    sortByStringAlphabetically(array) {
        return array.sort((a, b) => a.toLocaleLowerCase() !== b.toLocaleLowerCase() ? a < b ? -1 : 1 : 0);
    }
    isArrayOrderAlphabetically(stringArray) {
        let result = true;
        let OrderstringArray = this.sortByStringAlphabetically([...stringArray]);
        for (let i = 0; i <= stringArray.length - 1; i++) {
            result = (stringArray[i].toLocaleLowerCase() !== OrderstringArray[i].toLocaleLowerCase());
        }
        return result;
    }
}
exports.StringUtils = StringUtils;
//# sourceMappingURL=utils.string.js.map
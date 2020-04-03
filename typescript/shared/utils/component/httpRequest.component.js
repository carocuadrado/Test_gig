"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const protractor_1 = require("protractor");
class HtppClientComponent {
    constructor() {
        this.baseURL = "http://scrbcomderue603.crb.apmoller.net/ddndWebApiService/api/";
    }
    async setHeader() {
        return new Promise((resolve) => {
            let token = this.getToken().then(function (data) {
                let jsonApp = JSON.parse(data.toString());
                if (jsonApp !== undefined && jsonApp !== null) {
                    let jsonCurrentUser = jsonApp.filter((x) => { return x.param === 'currentUser'; })[0];
                    let currentUser = jsonCurrentUser.paramValue;
                    let headers = { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' };
                    resolve(headers);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    async getToken() {
        return protractor_1.browser.executeScript("return window.localStorage.getItem('" + 'ddnd' + "');");
    }
    /*  REST METHODS: In future if it is necesary to add more please consider to refactor in another component/service. */
    undoDeleteNode(nodeId, userGroups) {
        let self = this;
        this.setHeader().then(function (data) {
            try {
                axios_1.default.post(self.baseURL + "FlowPlanner/undoDeleteNode/", { nodeId: nodeId, userGroups: userGroups }, { headers: data });
            }
            catch (e) {
                console.log("Error in http", e);
                throw e;
            }
        });
    }
}
exports.HtppClientComponent = HtppClientComponent;
//# sourceMappingURL=httpRequest.component.js.map
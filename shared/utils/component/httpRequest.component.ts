import axios from 'axios';
import { ApplicationParameter } from "../model/application-parameter.model";
import { UserToken } from "../model/user-token.model";
import { browser } from 'protractor';


export class HtppClientComponent {

  baseURL = "http://scrbcomderue603.crb.apmoller.net/ddndWebApiService/api/";

  async setHeader(): Promise<any> {

    return new Promise<any>((resolve) => {
      let token = this.getToken().then(function (data) {
        let jsonApp: Array<ApplicationParameter> = JSON.parse(data.toString());

        if (jsonApp !== undefined && jsonApp !== null) {

          let jsonCurrentUser: ApplicationParameter = jsonApp.filter((x: ApplicationParameter) => { return x.param === 'currentUser'; })[0];
          let currentUser: UserToken = jsonCurrentUser.paramValue;
          let headers = { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' };

          resolve(headers);

        } else {
          resolve(null);

        }
      });
    });
  }

  public async getToken(): Promise<any> {
    return browser.executeScript("return window.localStorage.getItem('" + 'ddnd' + "');");
  }

  /*  REST METHODS: In future if it is necesary to add more please consider to refactor in another component/service. */
  undoDeleteNode(nodeId: number, userGroups: string) {
    let self = this;
    this.setHeader().then(function (data) {
      try {
        axios.post(self.baseURL + "FlowPlanner/undoDeleteNode/", { nodeId: nodeId, userGroups: userGroups }, { headers: data });
      } catch (e) {
        console.log("Error in http", e);
        throw e;
      }
    });
  }
}
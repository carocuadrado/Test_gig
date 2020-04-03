import { browser, by, element, ExpectedConditions } from "protractor";
import { protractor, } from "protractor/built/ptor";
import * as fs from 'fs';
const timeout = 25000; // timeout in ms

export class Utils {
  static warning(message: string): void {
    Utils.logType(message,'Warning'); 
  }
    public static jsonItems: string[] =  [];
    public static loggingInfo: boolean = false;
    public static navigatorUserAgent;
    public static navigatorUserAgentName;
    public static ddndAppString;
    public static self: Utils = null;
    public static subscribers: ((Utils) => void)[] = [];

    constructor() {
        if(Utils.self)
            throw new Error("One instance already exists")
        if(Utils.navigatorUserAgent === undefined){
            this.setNavigatorUserAgent();//.then(() => {console.log("Utils.Done in constructor")});            
        }
        Utils.self = this;
    }

    public static getSingletonInstance():Utils{
        if(Utils.self == null){
            new Utils();
        }
        if(Utils.navigatorUserAgent === undefined)
            Utils.self.setNavigatorUserAgent();
        return Utils.self;
    }

    public static metaDataFileAge(metaDataName){
        const fileName = `metadata.${metaDataName}.json`;
        const fs_metadata = fs.statSync(fileName);
        return Date.now()-fs_metadata.ctimeMs;
    }

    public static metaDataFileToOld(metaDataName){
        const file_age_ms = Utils.metaDataFileAge(metaDataName);
        const one_hour_in_ms =  60*60*1000;
        return file_age_ms > one_hour_in_ms; 
    }

    public static cleanUpMetadataFiles(){
        try{
            if(Utils.metaDataFileToOld('browserInfo'))
                fs.unlinkSync('metadata.browserInfo.json')
        }
        catch(e){}
      
    }

    async setNavigatorUserAgent(): Promise<any>{
        let metaDataFileTooOld = null;
        try{metaDataFileTooOld = Utils.metaDataFileToOld('browserInfo')}
        catch(e){

        }
        let browserInfo;
        if(browser.driver === undefined){
            console.log("Driver not set yet, which is OK");
            return;
        }
         if (Utils.navigatorUserAgent) {
            browserInfo = {
                'browserUserAgent': Utils.navigatorUserAgent,
            };
            console.log("Utils.navigatorUserAgent already set", Utils.navigatorUserAgent);
            return fs.writeFileSync('metadata.browserInfo.json',JSON.stringify(browserInfo));
//            return;
        }
        try {
            let browserUserAgent = await browser.driver.executeScript("return navigator.userAgent");
            Utils.navigatorUserAgent = browserUserAgent;
            Utils.navigatorUserAgentName = browserUserAgent;
            browserInfo = {
                'browserUserAgent': browserUserAgent,
            };
          
            return fs.writeFileSync('metadata.browserInfo.json',JSON.stringify(browserInfo));

        }
        catch(e){
            console.error("Failed in getting the UserAgent",e);
        }
        return "ok";
    }

    async loggedInHandler() {
        return ;
  
    }



    static log(message: String){
        if(this.loggingInfo) {
            console.log("\nINFO: "+message) 
        }
    }

    static logType(message: String, logType: String){
        switch (logType) {
            case 'Warning':
                //
                break;
        
            case 'Info':
                if(this.loggingInfo == false){
                    return; // Do nothing
                }
            default:
                break;
        }
        console.log(logType + ": " + message);
    }




    addJson(jsonString){
 
       if(Utils.jsonItems)
            Utils.jsonItems.push(jsonString);
        else
            Utils.jsonItems = new Array(jsonString)
    }

    getJson(){        
   
       if(Utils.jsonItems)
            return Utils.jsonItems.pop();
        else
            return null;
    }
    
}

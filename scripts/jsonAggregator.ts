import * as fs from 'fs'
import * as fse from 'fs-extra'
const args = process.argv.slice(2)

export class JsonReportAggregator{
    public fileContentString: string;
    public fileContentJSON: any[];
    public featurePassCount: number;
    public featureFailCount: number;
    public scenarioPassCount: number;
    public scenarioFailCount: number;
    constructor(public fileName:string){

    }

    public passFile(){
        this.featureFailCount=0;
        this.featurePassCount=0;
        this.scenarioFailCount=0;
        this.scenarioPassCount=0;
        if(this.fileName === undefined){
            throw new Error("this.fileName was not set");
        }
        try {
            this.fileContentString = fs.readFileSync(this.fileName,{encoding:'utf8'});
        } catch (error) {
            console.error(`Error opening the file ${this.fileName} `,error);
            return;
        }
        if(this.fileContentString.length < 10 || !this.fileContentString.includes('Feature')){
            throw new Error("File does not seem to be the right file");
        }
        this.fileContentJSON = JSON.parse(this.fileContentString);
        let featureElement = this.fileContentJSON[0];
        this.fileContentJSON.forEach(featureElement => {
           if(this.parseFeatureElement(featureElement)){
               this.featurePassCount++;
           }
           else{
               this.featureFailCount++
           }
        });
    }

    parseFeatureElement(featureElement): boolean{
        const scenarioElements:any[] = featureElement.elements;
        if(scenarioElements.length < 0){
            throw new Error("File does not have any elements. Empty Report?");
        }
        let i = 1;
        //console.log("Scenario Elements",scenarioElements.length);
        const scenariosPassed = scenarioElements.filter((element)=>{
            const steps:any[] = element.steps;
            const stepsFail = steps.filter((step)=>step.result.status === 'failed')
            const stepsSkipped = steps.filter((step)=>step.result.status === 'skipped')
            //console.log("Element name:",i++," -",element.keyword ,element.name,`T-st: ${steps.length} - F-st:${stepsFail.length} - S:st${stepsSkipped.length}`,!(stepsFail.length+stepsSkipped.length));
            //console.log(element);
            return !(stepsFail.length+stepsSkipped.length);
        });
        this.scenarioPassCount += scenariosPassed.length;
        this.scenarioFailCount += scenarioElements.length-scenariosPassed.length;
        return ((scenarioElements.length-scenariosPassed.length)==0);
    }

    public static findJsonFiles(path,pattern):string[]{
        return ['reports\\json\\cucumber_report.json'];
    }


    getOneLiner():string{
//        return `Scenarios: ${this.scenarioPassCount} pass, ${this.scenarioFailCount} failed - ${this.scenarioPassCount+this.scenarioFailCount} total`
//         16 scenario (1 failed,15 passed)
//        return `${this.scenarioPassCount+this.scenarioFailCount} scenarios (${this.scenarioFailCount} failed, ${this.scenarioPassCount} passed)`
        const fc =  `${this.featurePassCount+this.featureFailCount} features (${this.featureFailCount} failed, ${this.featurePassCount} passed)`
        return fc +  `\n${this.scenarioPassCount+this.scenarioFailCount} scenarios (${this.scenarioFailCount} failed, ${this.scenarioPassCount} passed)`
    }

}

const jsonReportFiles = JsonReportAggregator.findJsonFiles('.','cucumber*.json');
if(jsonReportFiles.length !== 1){
    throw new Error(`Could only find ${jsonReportFiles.length} files - can only handle one for now`);
} 
let jsonInputFile:string = jsonReportFiles.pop();
if(args.length){
    jsonInputFile = args.pop();
}
const jra = new JsonReportAggregator(jsonInputFile);
jra.passFile();
console.log(jra.getOneLiner());




"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const JA = require("./jsonAggregator");
const shared_config_1 = require("../config/shared_config");
var BuildStatus;
(function (BuildStatus) {
    BuildStatus[BuildStatus["Success"] = 0] = "Success";
    BuildStatus[BuildStatus["Partial"] = 1] = "Partial";
    BuildStatus[BuildStatus["Error"] = 2] = "Error";
})(BuildStatus || (BuildStatus = {}));
const http_proxy_ip = "10.45.253.23";
const http_proxy_port = "8887";
const BuildDefinitionId = process.env.SYSTEM_DEFINITIONID || 66; // Fall back to 66
const BuildDefinitionName = process.env.BUILD_DEFINITIONNAME || "Sample ";
const UI_TEST_SUT_URL = process.env.UI_TEST_SUT_URL;
/**
 *
 * @param agentJobStatus BuildStatus
 * See https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=vsts&viewFallbackFrom=TFS
 */
function VstsToBuildStatus(agentJobStatus) {
    switch (agentJobStatus) {
        case 'Canceled': return (BuildStatus.Error);
        case 'Failed': return (BuildStatus.Error);
        case 'Succeeded': return (BuildStatus.Success);
        case 'SucceededWithIssues': return (BuildStatus.Partial);
        default: throw new Error("Unknown Agent.JobStatus " + agentJobStatus);
    }
}
/**
 *
 * @param url Url of the Application the test has run on
 */
function FlowPlannerEnvFromUrl(url) {
    //     | http://comst.apmoller.net/ddnd/home | TEST          |
    //     | http://comsd.apmoller.net/ddnd/home | PreProduction |
    //     | http://coms.apmoller.net/ddnd/home  | Production    | 
    switch (url) {
        case 'http://ddndt.apmoller.net/ddnd/home': return 'Test';
        case 'http://comsd.apmoller.net/ddnd/home ': return 'PreProduction';
        case 'http://coms.apmoller.net/ddnd/home': return 'Production';
        default: return 'Unknown url';
    }
}
const UI_TEST_ENV_NAME = FlowPlannerEnvFromUrl(UI_TEST_SUT_URL);
function messageColor(status) {
    // RRGGBB in Hex
    const green = "#00FF00";
    const darkOrange = "#EE7600";
    const red = "#FF0000";
    const colors = [green, darkOrange, red];
    return colors[status];
}
const sampleTFSArtefactLookup = 'http://scrbcomdk002745:8080/tfs/DDND/b38f99f4-ff7c-47eb-8af9-26765ad96855/_apis/build/builds/4647/artifacts';
const sampleTFSBuildId = 4706;
// const sampleTFSArtefact = {
//     id: 312,
//     name: "Test Reports - Regression" ,
//     resource: {
//         type: "Container",
//         data: "#/34544/Test Reports - Regression",
//         properties: {
//             localpath: "F:\\Agent\\_work\\66\\s\\flowPlanner_html5_e2e_testing\\reports"
//         },
//         url: "http://scrbcomdk002745:8080/tfs/COMS/b38f99f4-ff7c-47eb-8af9-26765ad96855/_apis/build/builds/4647/artifacts?artifactName=Test%20Reports%20-%20Regression",
//         downloadUrl: "http://scrbcomdk002745:8080/tfs/COMS/b38f99f4-ff7c-47eb-8af9-26765ad96855/_apis/build/builds/4647/artifacts?artifactName=Test%20Reports%20-%20Regression&%24format=zip"
//     }
// }
let isSample = true;
let SampleWarning = "";
let TFSBuildId = sampleTFSBuildId;
let TFSJobStatus = 'Succeded';
let TFSJobStatusColor = '#AAAAAA';
let TFSBranch = 'Unknown?';
if (Number.parseInt(process.env['BUILD_BUILDID']) > 100) {
    TFSBuildId = Number.parseInt(process.env['BUILD_BUILDID']);
    console.log("Build ID = " + TFSBuildId + ' from build var BUILD_BUILDID ');
    TFSBranch = process.env.BUILD_SOURCEBRANCHNAME;
    TFSJobStatus = process.env.AGENT_JOBSTATUS || process.env['agent.jobstatus'];
    TFSJobStatusColor = messageColor(VstsToBuildStatus(TFSJobStatus));
    isSample = false;
}
else {
    TFSBuildId = sampleTFSBuildId;
    SampleWarning = "\nTHIS IS A SAMPLE RUN - IGNORE THIS";
}
const TFSArtefactLookup = `http://scrbcomdk002745:8080/tfs/DDND/b38f99f4-ff7c-47eb-8af9-26765ad96855/_apis/build/builds/${TFSBuildId}/artifacts`;
const TFSArtefactTestReportUrlZip = TFSArtefactLookup + "?artifactName=Test%20Reports%20-%20Regression&%24format=zip";
const SampleTFSBadgeImageUrl = 'http://scrbcomdk002745:8080/tfs/DDND/_apis/public/build/definitions/b38f99f4-ff7c-47eb-8af9-26765ad96855/66/badge';
let TFSBadgeImageUrl = `http://scrbcomdk002745:8080/tfs/DDND/_apis/public/build/definitions/b38f99f4-ff7c-47eb-8af9-26765ad96855/${BuildDefinitionId}/badge`;
let TFSArtefact;
// Cant call this on TFS2015 since it does not support Personal Access Tokens. 
// ****************************
// http.get(TFSArtefactLookup,
//      function (res) {
//         res.setEncoding('utf8');
//         res.on('data', function (chunk) {
//             console.log('Response: ' + chunk);
//             TFSArtefact = chunk;
//         });
//         res.on('error', function(err){
//             console.error("Error in request",err);
//         });
//      }
// );
function getOneLineStatistics() {
    let fileNames = JA.JsonReportAggregator.findJsonFiles('', '');
    let ja = new JA.JsonReportAggregator(fileNames.pop());
    ja.passFile();
    return ja.getOneLiner();
}
TFSArtefact;
//console.log("TFS Artefact", TFSArtefact);
// https://api.slack.com/docs/message-attachments
const slackMessage = {
    "text": "Test Report from TFS on FlowPlanner UI End2End Test." + SampleWarning,
    "attachments": [
        {
            //          "fallback": "Required plain-text summary of the attachment.",
            "color": TFSJobStatusColor,
            //           "pretext": "Optional text that appears above the attachment block",
            "author_name": process.env.BUILD_QUEUEDBY,
            //            "author_link": "http://flickr.com/bobby/",
            //            "author_icon": "http://flickr.com/icons/bobby.jpg",*/
            "title": 'Build:' + TFSBuildId + " " + "Regression Test Report " + TFSJobStatus,
            "title_link": TFSArtefactTestReportUrlZip,
            "text": "(Note: This only works inside the Maersk Network - i.e. no cellphones)",
            "fields": [
                {
                    "title": "End2End Branch",
                    "value": TFSBranch,
                    "short": false
                },
                {
                    "title": "FlowPlanner Env Name",
                    "value": UI_TEST_ENV_NAME,
                    "short": true
                },
                {
                    "title": "FlowPlanner Env Url",
                    "value": UI_TEST_SUT_URL,
                    "short": true
                }, {
                    "title": "Build Reason",
                    "value": shared_config_1.VstsHelper.buildReason(),
                    "short": false
                }, {
                    "title": "Cucumber Statistics",
                    "value": getOneLineStatistics(),
                    "short": false
                }
            ],
        }, {
            "title": "Link to Build Job " + TFSBuildId,
            "title_link": 'http://scrbcomdk002745:8080/tfs/DDND/DDND/_build?_a=summary&buildId=' + TFSBuildId
        }
    ]
};
const post_data = JSON.stringify(slackMessage);
// old link to the previous app-Slack
// path: 'https://hooks.slack.com/services/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',
// An object of options to indicate where to post to
const post_options = {
    host: http_proxy_ip,
    port: http_proxy_port,
    path: 'https://hooks.slack.com/services/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',
    method: 'POST',
    headers: {
        'Host': 'https://hooks.slack.com',
        'Content-Type': 'Content-type: application/json',
        'Content-Length': Buffer.byteLength(post_data)
    }
};
const SendToSlack = (sampleTFSBuildId !== TFSBuildId); // Set this to false for local debugging. 
//console.log("Request to Slack: ", JSON.stringify(slackMessage,' '," "));
if (SendToSlack) {
    // Set up the request
    const post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        }); // end of OnData
        res.on('error', function (err) {
            console.error("Error in request", err);
        } // end of OnError
        ); // end of res function
    }); // end of request
    // post the data
    post_req.write(post_data);
    post_req.end();
}
else {
    console.log("Message not sent to slack", SendToSlack, sampleTFSBuildId, TFSBuildId);
}
//# sourceMappingURL=slackReporter.js.map
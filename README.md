#  Automatic Tests

*This repository shows how you can implement automatic test in Test GIG


## Pre-requisites

* Node.js (At least v10.6.0)
* Chrome browser 
* webdriver (npm -g install) 

Special requirement if you want to run Selenium or Remote Selenium as a webdriver.

* Java (think 8) & added to path

## Installation
* Create a folder Projects (C:\Projects\test_gig)
* git clone 
* cd test_gig
* npm install (in source directory)
#Some people need this
​
   npm install protractor -g 

## Running the tests
 According with package.json the configuration of webdriver-update is :
 "webdriver-update": "webdriver-manager update --versions.chrome=79.0.3945.36 --gecko false --proxy http://10.45.253.23:8887 --ignore_ssl"
  -Change the configuration of proxy or removed
  
1. Execute:
 npm run webdriver-update
2. Execute: 
npm run test



3. If you want to be explicit about what test to run you can specify both tags, feature file names and scenario title.

    
    npm run test  --  --cucumberOpts.tags=@test  (Only will execute the features with tag @test)



Note: This runs with directConnect and does not need a separate WebDriver process.


## Results

Currently we are able to output HTML and JSON. We want to enable XML output 

1. HTML Reports are located in the reports/html/ folder
2. JSON output in the reports/json/ folder


## Changing the tests / Structure

Before you change the tests you need to understand the layers (separation of concerns) in the test.

* Business Specification - called Feature files
    
    [Features Folder](features/)

* Technical Translation - called Step Definitions
    
    [Steps Folder](steps/) 

* Page Abstractions - called Page Objects 
    
    [pages Folder](pages/)


## Using this in a Feature Team

(To be detailed)

## Setting up Pipeline


(To be detailed)


### Understanding Protractor Exceptions

| Exception Type | Suggested handling|
|--|--|
|UnhandledPromiseRejectionWarning|Use the proper types|


## Technical Things that are nice to know

### Protractor
 - You need to learn about protractor - see 

  The [protractor website](http://)

### Async & Await & Promises

#### Keep Your Promises in TypeScript using async/await
https://blog.bitsrc.io/keep-your-promises-in-typescript-using-async-await-7bdc57041308
 * Handling errors
 * Returning promises
 



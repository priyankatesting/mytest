# mytest
A NODEJS API REST application that takes in JSON request , modify it and send back the filtered response in JSON.  

The URL for this project is https://mytest-api.herokuapp.com/urlpost


Sample Input: mytest/actualrequestdata


Sample Output: 




# Tech stack:
- NODEJS Framework
- ExpressJS
- BodyParser
- Mocha & Chai - Dev Frameworks for Testing

# Hosting 
Heroku 

# How to run
As a first step, run `npm install`, 


Then, 


npm run start     -> Will start the test and run a server (defined in ENV variables or on port:3000 if ENV not defined)


npm run test      -> Will run all the unit tests available recursively


npm run debug     -> WIll run the app in debug mode (Chrome)


npm run only-test -> Will run the tests in debug mode. Stops wherever 'debugger' is used. 
                     Type chrome:inspect on url after this command to open the Chrome debugger and select the test



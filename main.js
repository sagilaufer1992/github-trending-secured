const { ArgumentsProvider } = require("./argumentsProvider.js");

const argumentsProvider = new ArgumentsProvider(process.argv);

console.log(argumentsProvider.getArguments());
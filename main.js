const { ArgumentsProvider } = require("./argumentsProvider.js");
const { ProjectProvider } = require("./projectsProvider");

const argumentsProvider = new ArgumentsProvider(process.argv);
const { number } = argumentsProvider.getArguments();

const projectsProvider = new ProjectProvider();

projectsProvider.getTrendingProjects(number).then(_ => console.log(_));
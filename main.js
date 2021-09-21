const { ArgumentsProvider } = require("./argumentsProvider.js");
const { ProjectProvider } = require("./projectsProvider");
const { ProjectDownloader } = require("./projectsDownloader");
const { SecurityScoreCalculator } = require("./securityScoreCalculator");

const argumentsProvider = new ArgumentsProvider(process.argv);
const { number } = argumentsProvider.getArguments();

const projectsProvider = new ProjectProvider();

const parentFolder = `${__dirname}\\projects`;
const projectDownloader = new ProjectDownloader(parentFolder);
const securityScoreCalculator = new SecurityScoreCalculator();

projectsProvider.getTrendingProjects(number).then(projectsList => {
    projectsList.forEach(project => {
        projectDownloader.downloadProject(project.href, project.name, async () => {
            const score = await securityScoreCalculator.calculateScoreForProject(`${parentFolder}\\${project.name}`)
            printInformationForProject(project, score);
        });
    })
});

function printInformationForProject({ name, author, stars, starsInPeriod }, score) {
    console.log("--- " + name + " ---");
    console.log("author: " + author);
    console.log("stars: " + stars);
    console.log("stars in period: " + starsInPeriod);
    console.log("score: " + score);
}
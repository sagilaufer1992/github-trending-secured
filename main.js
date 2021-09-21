const { ArgumentsProvider } = require("./argumentsProvider.js");
const { ProjectsProvider } = require("./projectsProvider");
const { ProjectDownloader } = require("./projectsDownloader");
const { SecurityScoreCalculator } = require("./securityScoreCalculator");

class TrendingProjectsSecurityScoreCLI {
    constructor(projectsProvider, projectDownloader, securityScoreCalculator) {
        this.projectsProvider = projectsProvider;
        this.projectDownloader = projectDownloader;
        this.securityScoreCalculator = securityScoreCalculator;
    }

    displayNProjects(number) {
        this.projectsProvider.getTrendingProjects(number).then(projectsList => {
            projectsList.forEach(project => {
                this.projectDownloader.downloadProject(project.href, project.name, async () => {
                    const score = await this.securityScoreCalculator.calculateScoreForProject(`${parentFolder}\\${project.name}`)
                    this._printInformationForProject(project, score);
                });
            })
        });
        
    }

    _printInformationForProject({ name, author, stars, starsInPeriod }, score) {
        console.log("--- " + name + " ---");
        console.log("author: " + author);
        console.log("stars: " + stars);
        console.log("stars in period: " + starsInPeriod);
        console.log("score: " + score);
    }
}

const argumentsProvider = new ArgumentsProvider(process.argv);
const { number } = argumentsProvider.getArguments();

const projectsProvider = new ProjectsProvider();

const parentFolder = `${__dirname}\\projects`;
const projectDownloader = new ProjectDownloader(parentFolder);

const securityScoreCalculator = new SecurityScoreCalculator();

// projectsProvider.getTrendingProjects(number).then(projectsList => {
//     projectsList.forEach(project => {
//         projectDownloader.downloadProject(project.href, project.name, async () => {
//             const score = await securityScoreCalculator.calculateScoreForProject(`${parentFolder}\\${project.name}`)
//             printInformationForProject(project, score);
//         });
//     })
// });

// function printInformationForProject({ name, author, stars, starsInPeriod }, score) {
//     console.log("--- " + name + " ---");
//     console.log("author: " + author);
//     console.log("stars: " + stars);
//     console.log("stars in period: " + starsInPeriod);
//     console.log("score: " + score);
// }

const cli = new TrendingProjectsSecurityScoreCLI(projectsProvider, projectDownloader, securityScoreCalculator);
cli.displayNProjects(number);
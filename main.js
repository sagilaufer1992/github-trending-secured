const { ArgumentsProvider } = require("./argumentsProvider.js");
const { ProjectsProvider } = require("./projectsProvider");
const { ProjectDownloader } = require("./projectsDownloader");
const { SecurityScoreCalculator } = require("./securityScoreCalculator");

class TrendingProjectsSecurityScoreCLI {
    constructor(projectsProvider, projectDownloader, securityScoreCalculator, parentFolderForProjects) {
        this.projectsProvider = projectsProvider;
        this.projectDownloader = projectDownloader;
        this.securityScoreCalculator = securityScoreCalculator;
        this.parentFolderForProjects = parentFolderForProjects;
    }

    displayNProjects(number) {
        this.projectsProvider.getTrendingProjects(number).then(projectsList => {
            projectsList.forEach(project => {
                const downloadFolder = `${this.parentFolderForProjects}\\${project.name}`;

                this.projectDownloader.downloadProject(project.href, downloadFolder, async () => {
                    const score = await this.securityScoreCalculator.calculateScoreForProject(downloadFolder)
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

const cli = new TrendingProjectsSecurityScoreCLI(projectsProvider, projectDownloader, securityScoreCalculator, parentFolder);
cli.displayNProjects(number);
const { ArgumentsProvider } = require("./argumentsProvider.js");
const { ProjectProvider } = require("./projectsProvider");
const { ProjectDownloader } = require("./projectsDownloader");

const argumentsProvider = new ArgumentsProvider(process.argv);
const { number } = argumentsProvider.getArguments();

const projectsProvider = new ProjectProvider();

const ProjectDownloader = new ProjectDownloader(`${__dirname}\\projects`);
projectsProvider.getTrendingProjects(number).then(_ => {
    _.forEach(proj => {
        ProjectDownloader.downloadProject(proj.href, proj.name);
    })
});
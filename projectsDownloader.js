const gitDownloader = require("download-git-repo");
const fs = require("fs");

class ProjectDownloader {
    constructor(destinationFolder) {
        this.destinationFolder = destinationFolder;
    }

    downloadProject(link, downloadFolder, callback = () => {}) {
        fs.access(downloadFolder, async accessError => {
            if (accessError) {
                fs.mkdir(downloadFolder, { recursive: true }, () => {
                    gitDownloader(`direct:${link}.git`, downloadFolder, { "clone": true }, gitDownloadError => {
                        gitDownloadError && console.error(gitDownloadError);
                        callback();
                    });
                });
            }
            else {
                callback();
            }
        });
    }
}

exports.ProjectDownloader = ProjectDownloader;
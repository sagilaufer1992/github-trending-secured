const gitDownloader = require("download-git-repo");
const fs = require("fs");

class ProjectDownloader {
    constructor(destinationFolder) {
        this.destinationFolder = destinationFolder;
    }

    downloadProject(link, folder, callback = () => {}) {
        const downloadFolder = `${this.destinationFolder}\\${folder}`;
        fs.access(downloadFolder, async accessError => {
            if (accessError) {
                fs.mkdir(downloadFolder, { recursive: true }, () => {
                    console.log(link, downloadFolder);
                    gitDownloader(`direct:${link}.git`, downloadFolder, { "clone": true }, gitDownloadError => {
                        console.log(gitDownloadError);
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
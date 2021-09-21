const dependencyChecker = require("depcheck");
const fs = require("fs");

class SecurityScoreCalculator {
    constructor() { }

    async calculateScoreForProject(path) {
        if (!fs.existsSync(`${path}\\package.json`)) return -1;

        const unused = await dependencyChecker(path, {});
        const amountOfUnusedDependencies = unused.dependencies.length;

        return 100 * (1 - Math.tanh(amountOfUnusedDependencies / 5));
    }
}

exports.SecurityScoreCalculator = SecurityScoreCalculator;
const commander = require("commander");

const { Command } = commander;

class ArgumentsProvider {
    constructor(programArguments) {
        const program = new Command();

        program.option("-n, --number", "number of projects", parseInt)

        const argumentsArray = program.parse(programArguments).args;

        this.arguments = {
            "number": argumentsArray[0]
        }
    }

    getArguments() {
        return this.arguments;
    }
}

exports.ArgumentsProvider = ArgumentsProvider;
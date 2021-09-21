const trending = require("trending-github");

class ProjectProvider {
    constructor() { }

    async getTrendingProjects(amount) {
        const trendingProjects = await trending("weekly", "javascript");
        
        return trendingProjects.slice(0, amount);
    }
}

exports.ProjectProvider = ProjectProvider;
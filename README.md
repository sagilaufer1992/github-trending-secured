# github-trending-secured
A project for finding trending projects on Github and scoring them based on their security level

# Usage
node main.js -n|--number <number-of-projects>
  
# Limitations
The libraries used in the project find the first 25 projects. Therfor, the user won't get more than 25 projects in his query.

The query for now works only for JS projects, and gets the weekly trending projects  
  
# Scoring
The score follows the following formula:
  
No `package.json` => -1. No scoring is deduced for the project.

Otherwise: 100 * (1 - tanh (\#unused_dependencies / 5)) => a number within the range [0,100], that gets to 0 as the number of unused dependencies grows. The first scores: [100, 80.26, 62, 46.3,...].
  
The idea is the first few damage your score harshly, and having many more unused dependencies is less critical for you already have security issues on hand. Since 100 is feasible (there are projects that attain it) this scoring seem plausible.

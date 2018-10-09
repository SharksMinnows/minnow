# minnow

DEV Instructions:

1. in Terminal, Run "npm run webpack-final"
2. to run server, run "npm run server"
3. open index.html in build/ folder

There are two npm scripts for webpack
  1: For hot module reloading to be used to front-end dev
  2: Builds bundle file into proper folder. Outputs final bundle.js


Folder Descriptions
  - Build
    => Folder where bundle.js is built to
    => Index.html lifes here as well at the moment
  - Server
    => Node/Express Server lives in server.js
  - Client
    => All React/Redux files will go here.  Probably CSS as well?



*Git workflow*

1. Fork Repo
2. Clone repo to local machine
3. `git remote add upstream https://github.com/SharksMinnows/minnow.git`
4. Create new feature branch to work off of
5. Code!
6. Commit to your feature branch
7. Check out master
8. `git pull upstream master`
9. checkout your feature branch
10. `git merge master`
11. `git push origin [feature-branch-name]`
12. _*--your code plus the code merged from our organizinations master branch containing all other recent updates now live in your feature branch.  the command above this pushed that branch to your github.  you will now go to github, switch to your feature branch on github, and do a pull request to the organizations master.  similar to how you would do a pull request for hack hours*_
13. Create pull request from your feature branch to the organizations masts
14. Team reviews code before merging to master
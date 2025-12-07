# StefanoNovello.tumaini-initative

This is the repository for the Tumaini Education Initiave website

Here is the command  to get bing, duckduckgo etc to index the site - run it whenever you update the site.
curl  https://bing.com/indexnow?url=https://tumaini-initiative.de/&key=04ef8c94aec549b08004b2c0399d6315&keyLocation=https://tumaini-initiative.de/04ef8c94aec549b08004b2c0399d6315.txt

The site makes use of the jekyll build system that github provides. This converts the markdown .md files into .html and places the generated site in the _site directory.

To test the files locally you need to replicate that process. You can use MS VS code, the .vscode directory  contains the commands for building the site, so you can test by using Run/Start Debugging inside VSCode

As a prerequisite you must install jekyll. To do this first install ruby (the language it is written in) and then run

gem install bundler

which installs the ruby dependancy manager and then
 
bundle install

which installs all the pacakges mentioned in Gemfile

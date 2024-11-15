Motivation: I have 'built' the current SQLite_New front end like dozens of times and I still am not sure what is wrong with it. Here I've set up a boilerplate/skeleton of the stack.
What to look at: I set up the Flask API and Electron IPC from scratch and am pretty sure it works (even if the front end (react) is not up yet, if you start the app (npm run start) you can see the flask server is up through localhost:5000/api/demo_get_profile.

Requires: flask, electron, electron-fetch, react (?)

TODO:
React <-> Electron. The current approach in SQLite_New breaks down because there is only one webpack config (we would need one for main, preload, renderer, etc., since they all have different access to Node js/other things for security reasons.
I'm not sure if it is possible without webpack since it seems like an optimization/packaging thing which we can do without. The problem seems to be connecting index.html to index.js (react).

Possibly helpful resources:
https://pythonbasics.org/flask-rest-api/
https://medium.com/red-buffer/integrating-python-flask-backend-with-electron-nodejs-frontend-8ac621d13f72
https://stackoverflow.com/questions/48757977/how-to-include-dependencies-from-venv-directory-when-running-pyinstaller-for-pro

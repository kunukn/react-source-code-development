# React source code development

## About
Custom webpack project for React source code development.

If you want to use create-react-app instead, then there is a howto description at the bottom.

*Last tested with React version: 16.8.4*


## Benefits of using this web project.

* This will hot reload your changes if you rebuild your React source code
* it does **NOT** use or need yarn link
* it does **NOT** use or need file copying


## Getting start


* Git clone <a href="https://github.com/facebook/react" target="_blank">react</a>
* Git clone this project in sibling folder

E.g. now you have

* \some\path\react
* \some\path\react-source-code-development


If you don't have yarn installed already then from a command line
* Invoke `npm i -g yarn`


Invoke from react folder

* `yarn`
* `yarn build react/index,react-dom/index --type=UMD_DEV`

Go to this project's folder and invoke

* `yarn`
* `yarn start`

Do your changes and invoke a build to update the change, e.g. a change for react-dom

* Go to react folder
* Find this file `/react/scripts/rollup/build.js` and comment out this line `await asyncRimRaf('build');` This ensures that we don't delete everything before we build again.
* In the file `react/packages/react-dom/src/client/ReactDOM.js` add this consoleLog code snippet inside the `ReactDOM` object. 

e.g.
```
const ReactDOM: Object = { // existing code
  consoleLog: function log(){console.log(...arguments)}, // new code
``` 

* Invoke from React project: `yarn build react-dom/index --type=UMD_DEV` and wait until it finishes.
* The browser detect the change and refresh automatically.
* In the browser console you should see a custom message invoked by the new ReactDOM method.

### Known hiccups

* Sometimes you need to restart the web project with `yarn start`, due to not detecting changes in the React source code.

## How does it work?


In this project Webpack is used where the react and react-dom are aliased to the react build file path.
It does **NOT** use yarn link or file copying.

---

---

# Using create-react-app for react source code development

## Benefits of this approach

* Spin up a new create-react-app and use it as development tool.
* You don't need this web project.

This approach uses create-react-app and yarn link


### Why so many steps?

The steps are long due to simply using `yarn link` in packages will yield runtime errors when you try to use it.

We want to ensure we use the `umd` builds.

Else you might experience error like these:

```
Failed to compile

SyntaxError: <project-path>\react\packages\scheduler\src\Scheduler.js: Unexpected token, expected ";" (109:24)

  107 |   // with the same priority and expiration as the just-finished callback.
  108 |   if (typeof continuationCallback === 'function') {
> 109 |     var continuationNode: CallbackNode = {
      |                         ^
  110 |       callback: continuationCallback,
  111 |       priorityLevel,
  112 |       expirationTime,
```

### The steps

1. Git clone the <a href="https://github.com/facebook/react" target="_blank">react</a> project and go to the react folder
2. If you don't have yarn, then invoke from a command line `npm i -g yarn`
3. Invoke `yarn`
4. Invoke `yarn build react/index,react-dom/index --type=UMD_DEV` and wait until it finishes
5. Change file content in `react/build/node_modules/react/index.js` to

```
console.warn('custom react');
module.exports = require('./umd/react.development.js');
```

alternatively you could replace all `/cjs/` with `/umd/`

6. Change file content in `react/build/node_modules/react-dom/index.js` to

```
console.warn('custom react-dom');
module.exports = require('./umd/react-dom.development.js');
```

alternatively you could replace all `/cjs/` with `/umd/`

7. Go to react/build/node_modules/react and invoke `yarn link`
8. Go to react/build/node_modules/react-dom and invoke `yarn link`
9. go to your favorite project folder
11. Invoke `npx create-react-app my-react-app`
12. Invoke `cd my-react-app`
13. Delete react and react-dom dependencies from your package.json
14. Invoke `yarn`
15. Invoke `yarn link react react-dom`
16. Invoke `yarn start`
17. In the browser, inspect the browser console, you should see the custom react and react-dom warning messages.
18. Make a change in e.g. the react-dom project
19. Find the file `/react/scripts/rollup/build.js` and comment out this line `await asyncRimRaf('build');` This ensures that we don't have to delete everything before we build again.
20. From the react folder, invoke `yarn build react-dom/index --type=UMD_DEV` and wait until it finishes
21. Re-edit the `react/build/node_modules/react/index.js` and `react/build/node_modules/react-dom/index.js` from step `5` and `6`
22. From create-react-app project, stop the app and start it again with `yarn start`
23. The React source code should be picked up by create-react-app

To reduce the steps above, you could fiddle with the React build definition.

### dev or prod ?

To switch between production or development mode, here is an approach you could apply.

1. Build your react source code, e.g. for prod mode `yarn build react/index,react-dom/index --type=UMD_PROD`
2. Change the paths in the React index files from `/cjs/` to `/umd/` and replace `process.env.NODE_ENV` with `process.env.REACT_APP_ENV`
3. Create a `.env` file in your create-react-app project and insert following: `process.env.REACT_APP_ENV = 'production'`
4. `yarn start` your create-react-app

## More info

https://reactjs.org/docs/how-to-contribute.html

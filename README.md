# Mini-apps to learn about React lazy loading #

These apps are to be used in association with [the tutorial on lazy loading with React](https://merncraft.github.io/Lazy-Loading/).

## Launching with a local server

The lazy-loading feature requires the [index.html]() files to be launched with a server. 

**Double-clicking on an [index.html]() file to launch it directly will fail, because browsers refuse to import files for an HTML file launched with the [file:///] protocol.**

To run an app, you will need to have a local server running on your development computer.

For example, if you use [Virtual Studio Code](https://merncraft.github.io/Lazy-Loading/) as your IDE, you can install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), written by Ritwick Dey.

## Bundling the JSX code

The JSX code in these mini-apps needs to be compiled to JavaScript. To reduce the size of the download, the files have been delivered as raw JSX. The folder hierarchy that you will start with looks like this:

```
.
├── 01
│   ├── App.jsx
│   ├── index.html
│   └── LazyComponent.jsx
├── 02
│   ├── App.jsx
│   ├── index.html
│   └── LazyComponent.jsx
├── .../
├── build.mjs
├── buildAll.mjs
├── cleanUp.js
├── package-lock.json
├── package.json
└── README.md
```

## Installing the required node modules

Before you start, you need to install three node modules. Open a Terminal window in this folder, then run the command:

`npm i esbuild react react-dom`

This will add a folder named `node_modules`, which will give you all the capabilities of React, and the ability to bundle the JSX scripts correctly.

.
├── 01/
├── .../
├── build.mjs
├── buildAll.mjs
├── cleanUp.js
├── node_modules
│   ├── @esbuild
│   ├── esbuild
│   ├── react
│   ├── react-dom
│   └── scheduler
├── package-lock.json
├── package.json
└── README.md

## Building all the mini-apps at once

Each mini-app is contained in a numbered folder. 

`node buildAll.mjs`

This will tell the `build.mjs` script to create a `dist/` subfolder inside each of the numbered folders. This will look something like this, but the exact names of the files may be different:

.
├── 01
│   ├── App.jsx
│   ├── dist
│   │   ├── App.js
│   │   ├── App.js.map
│   │   ├── chunk-UASCOLGB.js
│   │   ├── chunk-UASCOLGB.js.map
│   │   ├── LazyComponent-C4ZJBLUW.js
│   │   └── LazyComponent-C4ZJBLUW.js.map
│   ├── index.html
│   └── LazyComponent.jsx
├── .../
├── build.mjs
├── buildAll.mjs
├── cleanUp.js
├── node_modules/
├── package-lock.json
├── package.json
└── README.md

## Launching an index.html file

Use your local server to launch the `index.html` file in a given folder. 

If you are working with VS Code, open in the Sandbox directory, and have the Live Server extension installed, you can right-click on the file at `01/index.html` and select Open With Live Server in the contextual menu that opens. A new tab should open in your browser:

    http://127.0.0.1:5500/Sandbox/01/index.html

    I am lazy.


## Recompiling a mini-app after you edit the files

If you edit the files at the root of a numbered folder, you will need to recompile the JSX to JS before you can see the effect of your changes in your browser.

Suppose you change the script of the file at `01/LazyComponent.jsx to this:

    export default function LazyComponent() {
      return <h2>I am so lazy.</h2>;
    }

To recompile the JSX scripts, and update the files in the `01/dist` folder, run this command:

`node launch.mjs 01`

The `launch.mjs` script will now try to use your local server to open the `index.html` file.

**If you haven't already started your local server, this will fail**. In that case, you will see a page like this open in your browser:

    http://localhost:5500/Sandbox/01/index.html

    Cannot GET /01/index.html

Start your local server and try again. If you are working with VS Code, and have the Live Server extension installed, you can right click on the file at `01/index.html` and select Open With Live Server in the contextual menu that opens. A new tab should open in your browser:

    http://127.0.0.1:5500/Sandbox/01/index.html

    I am so lazy.

Live Server uses port 5500 by default, and `launch.mjs` expects you to be using Live Server. Now that Live Server is running, you can refresh the page that failed to load before, and this time it should work.

## Using a different port or URL

If you are using a local server that does not use port 5500 you can run this command instead, using the port number where your local server runs instead of 3000:

`node build.mjs 01 3000`

If you want to set a different default port, edit line 11 of `launch.mjs`, to use the port number you want.

    const PORT = process.argv[3] || 5500 // default for Live Server

If you want to run from somewhere other than `localhost`, you can edit line 53 of `build.mjs`

    const url = `http://localhost:${PORT}/${parentDir}/${step}/index.html`



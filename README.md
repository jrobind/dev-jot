# dev-jot

dev-jot is a note-taking app for online developer tutorials. The project is an MVP and has been created to help aspiring front-end developers as part of [thefrontendcoach](https://thefrontendcoach.com) support system.

There are two versions of the app:

1. Default, Vanilla version: https://dev-jot.netlify.app
2. React version: https://dev-jot-react.netlify.app

Please join our Discord community [discord.gg/YMsd9sgZ4f](https://discord.com/invite/YMsd9sgZ4f)
## Project Purpose

For those who are self-teaching, it's really easy to find yourself stuck in 'tutorial-land' or 'tutorial-hell'. For many newbie coders, it's difficult to bridge the gap between what you are learning from tutorials and acquiring the skills you **need** to become an employable developer.

Your ultimate goal is to replicate what you’d actually do in a real development job as closely as possible. Contributing to open source is a fantastic way to do this. Making open source contributions will require you to have been exposed to a few important concepts, practices, and transferable skills:

- Version control
- Working with tickets & issues
- Working with other developers
- Creating pull requests
- Experiencing a code review process
- Setting up a local development environment
- Contributing code to a pre-existing codebase

## The General Idea

This project acts as a friendly entry point into the open source world. Making your first open source contribution can be a daunting prospect that puts off a lot of aspiring developers.

**The primary goal of this project is to create a welcoming and friendly environment to foster learning, to feel safe making mistakes, and to receive feedback and guidance whilst working with other developers.**

The direction of the project will be led by those who contribute. There is scope to add a large variety of features and also to rebuild the app with different technologies.

## Current State

This is a no-thrills [CRUD application](https://www.codecademy.com/articles/what-is-crud). Lesson notes are currently stored in the browser's local storage. The purpose of the app is to enable those who are self-teaching to create a simple, clean store for all of their tutorial and lesson notes.

There are two versions of the app. The main, default version is located in the `master` branch. I wanted to keep the master branch as purely HTML, CSS and Vanilla JavaScript so there are learning opportunities for contributors to work with the fundamentals.

The second version is built using React and is located in the [react branch](https://github.com/jrobind/dev-jot/tree/react). This provides an opportunity for contributors who are looking to work with a front-end framework to get their hands dirty.

Before contributing I highly recommend you play around with the [live version](https://dev-jot.netlify.app) and actually use it for some basic note-taking. What sucks about it? What could be improved? Have you spotted any bugs?

The direction of the project will be determined by those who contribute. If you have some cool ideas for new features big or small then great! Just create an issue for discussion before doing so 😊 

## Project Set-Up

The easiest and quickest way to get the default project up and running locally is to clone the repo:

```bash
git clone https://github.com/jrobind/dev-jot.git
```

Now install packages with NPM

```bash
npm i
```

Because the default project version uses JavaScript modules, you may encounter CORS errors if you try to access files on your local filesystem with JavaScript. I'd recommend using VS Code as your IDE and I'd also recommend installing the VS Code [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension. The live project is served from `/public` so you will need to point Live Server here too. To do this:

1. Access the Live Extension settings in VS code by clicking the cog icon and selecting 'Extension Settings'

![Live Server extension](/public/images/live-server-cog.png)

2. Click 'Edit in settings.json'

![Edit settings in json - Live Server](/public/images/live-server-json.png)

3. Set the root to: `"liveServer.settings.root": "/public"`

Now you can then run the project using the live server extension. If you are unsure, please take a look at the [documentation](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## The Code

HTML, CSS, and JavaScript currently live within the `public` directory. The main JavaScript is located within `index.js`.

## Contributing

Please check out [CONTRIBUTING.md](https://github.com/jrobind/dev-jot/blob/master/CONTRIBUTING.md) for more information regarding how to contribute.

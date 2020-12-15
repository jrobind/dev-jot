# dev-jot - https://dev-jot-9d423.web.app/

dev-jot is a note-taking app for online developer tutorials. The project is an MVP and has been created to help aspiring front-end developers as part of [thefrontendcoach](https://thefrontendcoach.com) support system.

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

This project acts as a friendly entry point into the open source world. Making your first open source contribution can be a daunting prospect which puts off a lot of aspiring developers.

**The primary goal of this project is to create a welcoming and friendly environment to foster learning, to feel safe making mistakes, and to receive feedback and guidance whilst working with other developers.**

The direction of the project will be led by those who contribute. There is scope to add a large variety of features and also to rebuild the app with different technologies.

## Current State

Currently, this is a no thrills CRUD application using HTML, CSS, Vanilla JavaScript, and Firebase (for authentication and cloud database). The purpose of the app is to enable those who are self-teaching to create a simple, clean store for all of their tutorial and lesson notes. With time I'm sure the purpose of this application will change.

Before contributing I highly recommend you play around with the [live version](https://dev-jot-9d423.web.app/) and actually use it for some basic note taking. What sucks about it? What could be improved? Have you spotted any bugs?

As mentioned the direction of the project will be determined by those who contribute. If you have some cool ideas for new features big or small then great 😊  Just create an issue for discussion before doing so.

## Project Set-Up

The easiest and quickest way to get the project up and running locally is to clone the repo:

```bash
git clone https://github.com/jrobind/dev-jot.git
```

Now install packages with NPM

```bash
npm i
```

I'd recommend you use VS Code as your IDE. Please install the VS Code [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension. Once you have installed this you can run the project using the live server extension. Please follow the [documentation](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for this.

Once the app is running, you will need to have a Google profile set up in order to successfully authenticate. Simply click the 'Sign in with Google' button and a modal should pop up prompting you to choose a Google account.

If you run into an error stating "auth/unauthorized domain This domain (127.0.0.1) is not authorized to run this operation", after signing in with Google, please try the following:
Go to live server extension -> Settings:Host -> Change the default 127.0.0.1 to localhost

## The Code

HTML, CSS, and JavaScript currently live within the `public` directory at the project root.

## Contributing

Please check out [CONTRIBUTING.md](https://github.com/jrobind/dev-jot/blob/master/CONTRIBUTING.md) for more information regarding how to contribute.
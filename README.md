Prerequisite: Make sure you have node version 12.16 or later: https://nodejs.org/en/

## Once you have node and npm, run the command to install yarn:

```
npm -g install yarn
```

### Then clone the repo:

```
git clone https://github.com/kartmanny/Horae.git
```

### Installing dependencies for the server side:

```
cd Horae
yarn
```

### Installing the client side dependencies:

```
yarn --cwd client
```

# Running the App (Note: run all commands from root directory)

## Launches the client side application

```
yarn client
```

[http://localhost:3000](http://localhost:3000)

## Launches the server side code

```
yarn server
```

[http://localhost:5000](http://localhost:5000)

## Runs the dev build of the client and server concurrently

```
yarn dev
```

Frontend:
[http://localhost:3000](http://localhost:3000)

Backend:
[http://localhost:5000](http://localhost:5000)

## Add dependencies:

```
yarn add <package name>
```

### Add Dev dependencies:

```
yarn add --dev <package name>
```

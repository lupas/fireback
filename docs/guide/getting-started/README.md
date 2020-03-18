# Getting Started

## Requirements

- Make sure you have **Node.js installed** on your system (the newer, the better).
- Make sure that all projects you use this tool with have **billing enabled** (Blaze Plan+).

## Setup

1. Install fireback globally:

```js
npm i -g fireback
// or
yarn global add fireback
```

2. Create a file called `fireback.config.mjs` in the folder where your firebase.json is located.

3. Configure `fireback.config.mjs`:

```js
export default {
  // Projects you want to backup from / restore to
  projects: ["test1-project", "test2-project", "test3-project"]
};
```

## Usage

To run the CLI tool, simply enter `fireback` in your CLI where your `fireback.config.mjs` is located.

```bash
fireback
```

The following screen should appear:

![startscreen](https://fireback.netlify.com/startscreen.png "Start Screen")
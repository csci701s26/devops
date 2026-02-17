# CSCI 0701A - Senior Seminar
## DevOps

### Goals for today

By the end of today you will:

- be able to incorporate **agile** software development practices into your projects,
- automate the **linting** and **testing** of your code using GitHub Actions,
- deploy a static HTML webpage using GitHub Actions,
- practice some more with creating, reviewing and merging Pull Requests,
- work collaboratively using the VS Code Live Share feature.

There is no one definition or method for DevOps. DevOps is a set of practices that developers use (project-dependent) for building and deploying their software automatically (i.e. applying software development principles to these operations). For us, this will primarily involve the use of GitHub to automatically check, build, test and deploy your project code.

**Our primary goal is to always deliver a working product, while iteratively planning and documenting what needs to be done next to improve the product.**

### [Manifesto for Agile Software Development](https://agilemanifesto.org/iso/en/manifesto.html)

We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:

- **Individuals and interactions** over processes and tools.
- **Working software** over comprehensive documentation.
- **Customer collaboration** over contract negotiation.
- **Responding to change** over following a plan.

That is, while there is value in the items on the right, we value the items on the left more.

### Continuous Integration (CI) and Continuous Delivery (CD)

CI refers to the processes you use to integrate your code with other developers. This might involve making sure tests pass, the code is formatted in some common style or ensuring there are no errors when running your code through a static analyzer. It also involves the practices you use to merge your code into your main branch, like creating/reviewing/merging pull requests.

CD refers to the ability to deliver your software - the idea that your software is always deployable. It doesn't involve actually deploying your project, which would be continuous deployment. Often, CD will involve staging environments where you can perform more manual end-to-end testing. Then the changes are accumulated into a production version of your software, usually reviewed by a release team.

Our focus for today is on CI. Every project will be different and will require a different set of tools/processes when it comes to CD. We will nonetheless emulate a "deployment" of our project today.

### Test-driven development

The following content was mostly taken from the CS 312 notes of Prof. Andrews & Prof. Linderman.

#### Different types of tests:

- **End-to-End (E2E)** or **system**: test the entire application.
- **Integration:** combination of several units.
- **Unit**: individual functions.
- **Static**: compile/build time testing.

You will likely spend most of your time writing integration & unit tests.

#### Advice for testing:

- Think about what the code *should* do.
- Capture that in a test, which fails.
- Write the simplest possible code that lets the test pass.
- Refactor: Remove commonality with other tests.

How do we know when we've tested enough? **Code coverage** is a good indication, but [here is some advice from Martin Fowler](https://martinfowler.com/bliki/TestCoverage.html) about when you've done enough testing:

- You rarely get bugs that escape into production, and
- You are rarely hesitant to change some code for fear it will cause production bugs.

#### Tests should be F.I.R.S.T.

- **Fast:** Tests need to be fast since you will run them frequently.
- **Independent:** No test should depend on another so any subset
can run in any order.
- **Repeatable:** Test should produce the same results every time, i.e.
be deterministic.
- **Self-checking:** Test can automatically detect if passed, i.e. no
manual inspection.
- **Timely:** Test and code developed concurrently (or in TDD, test
developed first).

### Linting & Formatting

Linting is the process of statically analyzing your code to detect common programming errors without actually running your code. A linter often works in conjunction with a style guide to ensure a particular coding standard is followed. A code formatter is similar but purely analyzes how your code **looks**, and also works in conjunction with a set of rules defined by your desired style. A formatter will analyze naming conventions, spacing, line length, etc. and can be set-up to automatically format your code (e.g. "Format On Save").

Please see some of the links below for info about linting and formatting in various languages:

- `JavaScript` & `TypeScript`: `ESLint` (https://code.visualstudio.com/docs/languages/javascript), `prettier` (https://prettier.io/),
- `Java`: https://code.visualstudio.com/docs/java/java-linting,
- `Python`: `pylint` (https://pypi.org/project/pylint/), also see https://code.visualstudio.com/docs/python/linting,
- C++: `clang-tidy` (https://clang.llvm.org/extra/clang-tidy/), `clang-format` (https://clang.llvm.org/docs/ClangFormat.html).

### Continuous Integration with GitHub Actions & Workflows

Often you can run your unit tests, linter and formatting check locally (on your development machine), but we want to automate our workflows - recall that one of our goals is automation.

There are various tools you can use but we're simply going to set up GitHub Actions to run all of these checks for us. We'll set up a **Workflow** which will be triggered by a particular **Event** (e.g. opening a pull request). This workflow will consist of various **Jobs** that have a sequence of **Steps**. Any failure in these steps will cause the workflow to fail, which means additional code modifications should be made before merging into the `main` branch.

### Example: testing, linting and deploying a static web page.

Let's go through a complete example. Here, we will write a `JavaScript` module which we will test, lint, format and finally use in a static web page. By static, we mean that the entire `HTML`/`JavaScript` application is served to the client and there is no server running on the backend.

#### Getting started

We will follow a similar development strategy as we did last class with a slight modification so you can try out a more collaborative programming environment. Please form groups of 2. Only one person should perform the following four steps while the other group member waits for a link in Slack:

1. Navigate to https://github.com/csci701s26/devops and click on the **Code** button, then the **Codespaces** tab and finally **Create a codespace on main**.
2. In the left pane in the VS Code Editor, click on the Extensions, then search for "Live Share" and install the extension.
3. Once the Live Share feature is installed, click on the Live Share button at the bottom left of the editor and start a new Live Share session. You should see something like "Invitation link copied to clipboard!" Send it to anyone you trust ... ". Send this link to the other members of your group in a private message in Slack.
4. Please create a new branch: `git checkout -b groupX` (replace `X` with a number from 1-4).

#### Fixing the `add` function

We will first practice with testing. Our app currently has a bug in the `add` function in `app.js`. In the Terminal, please type:

```sh
npm test
```

You should see several errors. The first error has to do with the `add` function. There is a PR open that fixes this. Once it's merged, please merge the `main` branch with your branch:

```sh
git fetch
git merge origin/main
```

Now, please work together to fix the `getColorX` function **for your group number `X` only** (to avoid potential merge conflicts). Please have a look at the tests that are performed in `app.test.js` (but do not modify this file) to see what the test expects each color to be.

Ensure the tests for your group are working by continuing to run `npm test` until you see a check mark in the console next to your group test:

```
  ✓ add test (1 ms)
  check color range
    ✓ testing group 1 (13 ms)
    ✓ testing group 2 (2 ms)
    ✓ testing group 3 (1 ms)
    ✓ testing group 4 (4 ms)
```

You won't see a checkmark next to every group since they will need to fix their function too. Please stage-commit-push and open a PR, but do not merge it yet. Note that your PR is pre-populated with a template. Please complete the applicable fields in the template.

You can also assess how much our tests "cover" the code by typing:

```sh
npm run coverage
```

All the scripts you can run are listed in the `scripts` section of the `package.json` file. Why do we not have 100% coverage? What test is missing?

#### Running the linter

There is something new at the bottom of your PR. There are some checks that are failing! This is because there is a **Workflow** configured to run whenever a PR is created and pushed to. Click on the **Details**. You will be able to see the **Steps** that failed. This is controlled by a hidden file in `.github/workflow/checks.yml`, which looks like:

```yml
name: javascript-checks
on:
  pull_request:
    branches: main

jobs:
  js-build-format-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: ["14"]
    steps:
    - name: checkout repository
      uses: actions/checkout@v3
      
    - name: setup environment
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - name: install dependencies
      run: |
        npm install
    - name: run linter
      run: |
        npm run lint
    - name: run tests
      run: |
        npm test
```

The workflow runs a single **Job** to install dependencies, check for linter errors, and run some tests. Note that the linter check failed first, and the rest of the workflow is skipped. The linter we have configured for our project is called `ESLint`.

Please fix the linter error that is caused by your `getColorX` function and please run `npm run lint` locally to ensure there are no errors in your function. When you push again, the workflow should re-run in your PR on GitHub.

The check won't pass since there are pieces that depend on the other groups. But please still "Squash and merge" your PR after having one of your group members review it. Hopefully, once all the group PRs are merged, all the linting errors should go away and the tests should pass.

After the group PRs are merged, please checkout the main branch and pull the most recent changes.

```sh
git checkout main
git pull
```

#### Running the formatter

Our project is also configured to use a formatter called `prettier`, which will allow you to automatically format your code to have consistent spacing, indentation, line length, etc. (https://prettier.io/docs/en/comparison). You can automatically format the code using:

```sh
npm run format
```

#### Setting up a GitHub Workflow to deploy the static web page.

There is actually another workflow that ran once when every PR was merged. Have a look at the Actions tab again and notice the "deploy-website" workflow. This workflow is defined in the file `.github/workflows/pages.yml` and looks like:

```yml
# Simple workflow for deploying static content to GitHub Pages
name: deploy-website

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: checkout repository
        uses: actions/checkout@v3
      - name: setup Pages
        uses: actions/configure-pages@v3
      - name: upload site
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload everything in the repository
          path: '.'
      - name: deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

The most important piece here is the `path` in the `upload site` step - the `.` indicates that the entire root directory of the repository will be available at the static GitHub Pages site for our repository, which is https://csci701s26.github.io/devops/.

Please open the link mentioned above and press the 1, 2, 3, 4 key. You should see the leaves changing color. Each of these keys will change the color of the leaves to the color you set in your `getColorX` function. Note that this app still worked even when there were bugs in all our functions.

Please create a new branch again and change the leaf color to a color your group agrees upon. Then create a new PR to update your leaf color in the production version of the app. I will also now change the repository settings so that the **checks must pass before merging your PR**.

#### Stop the collaboration session and shut down the codespace.

On the bottom-left, please  click the "Shared" button (this is where the "Live Share" button used to be). A menu at the top of the page should open - please click "Stop Collaboration Session". Then at the bottom-left where it says "Codespaces: random-codespace-name" click on this to then "Stop Current Codespace".

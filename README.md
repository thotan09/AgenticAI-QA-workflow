# Agentic AI E2E QA Workflow with Playwright + MCP

An AI-assisted QA workflow that combines Playwright, MCP servers, and specialized agents to automate test planning, exploration, execution, healing, reporting, and Git operations.

## What this project is

This repository is a working example of an agentic QA pipeline for a checkout workflow on SauceDemo. It shows how AI agents can coordinate across multiple testing phases to:

- analyze a user story
- define a test plan
- perform exploratory testing
- generate reliable Playwright automation scripts
- execute tests and heal failures
- document results and commit artifacts to Git

The goal is not to replace QA engineers, but to demonstrate how AI agents can accelerate repetitive QA activities while allowing testers to focus on requirement analysis, risk assessment, and quality strategy.

## Why agentic AI is used here

This workflow uses agentic AI to split QA into smaller, specialized tasks handled by multiple agents.
Each agent is responsible for a distinct phase, such as planning, test generation, exploration, and healing.
This creates a more adaptable and maintainable process compared to a single monolithic automation script.

Key benefits:
- AI extracts requirements from user stories
- Test plans are created in natural language and then converted to code
- Exploratory findings inform stronger selectors and assertions
- Failures are analyzed and fixed automatically when possible
- The workflow can be extended to new stories and applications with minimal manual effort

## Technologies used

- **Playwright**: browser automation and cross-browser test execution
- **MCP servers**: agent orchestration using Playwright MCP and GitHub MCP
- **JavaScript / TypeScript**: test scripts and config
- **GitHub**: version control and remote repository integration
- **SauceDemo**: target web app for checkout test coverage

## Framework Components

### MCP Configuration

The MCP server definitions and connection details are maintained in `.vscode/mcp.json`, allowing GitHub Copilot and compatible MCP clients to discover and use the configured tools.


| MCP Server                     | Purpose                                                      |
| ------------------------------ | ------------------------------------------------------------ |
| Playwright MCP                 | Browser automation, exploration, screenshots, UI interaction |
| GitHub MCP                     | Git operations, commits, pushes, repository interaction      |
| Filesystem MCP (if configured) | File creation, updates, and artifact management              |


### Agent Definitions

Agent configurations are stored in: 
`.github/agents/`

The workflow uses specialized agents for different QA activities:

| Agent                     | Responsibility                             |
| ------------------------- | ------------------------------------------ |
| playwright-test-planner   | User story analysis and test plan creation |
| playwright-test-generator | Playwright automation generation           |
| playwright-test-healer    | Failure analysis and self-healing          |
| report-generator          | Test report creation                       |
| github-agent              | Git commit and repository operations       |

Each agent is focused on a specific responsibility, allowing the workflow to follow a modular and agentic design pattern.

### Prompts

Prompt files are stored in: 
`prompts/`

| Prompt                 | Purpose                             |
| ---------------------- | ----------------------------------- |
| QAEnd2EndPromptFile.md | Full workflow orchestration         |
| RunWorkflowPrompt.md   | Single-line workflow trigger       |



## How the flow works

1. **Read the user story**
   - The agent reads `user-stories/SCRUM-101-ecommerce-checkout.md` and extracts acceptance criteria, test scope, and credentials.

2. **Create the test plan**
   - The planner agent generates a structured, automation-ready test plan in `specs/saucedemo-checkout-test-plan.md`.

3. **Exploratory testing**
   - The exploratory testing agent uses Playwright MCP tools to inspect the application, validate workflows, and discover stable selectors.
   - Results are saved in `specs/exploratory-results.md`.

4. **Generate automation scripts**
   - A generator agent creates Playwright test files under `tests/saucedemo-checkout/` based on the plan and exploratory findings.

5. **Execute and heal tests**
   - The workflow runs the generated tests.
   - A healer agent analyzes failures, updates selectors or waits, and then re-runs tests until they pass.

6. **Create the report**
   - Results from manual exploration and automated execution are compiled into `test-results/SCRUM-101-checkout-test-report.md`.

7. **Commit to Git**
   - The workflow stages and commits the relevant test artifacts to the configured Git repository.

## Workflow Architecture

```text
User Story
    ↓
Planner Agent
    ↓
Exploratory Testing Agent
    ↓
Automation Generator Agent
    ↓
Test Execution Agent
    ↓
Test Healer Agent
    ↓
Report Generator Agent
    ↓
GitHub MCP Agent
```

## Workflow Prompts

The complete natural-language workflow used to orchestrate the AI agents is available here.

1. End to end prompt - `prompts/QAEnd2EndPromptFile.md`

This prompt coordinates the entire QA lifecycle:

- User story analysis
- Test planning
- Exploratory testing
- Playwright script generation
- Test execution
- Self-healing
- Test reporting
- Git operations

The prompt is intentionally included in the repository as a reference implementation for AI-assisted QA workflows and can be adapted for other applications and testing scenarios.

2. Workflow Trigger Prompt - `prompts/RUnWorkflowPrompt.md`

To execute the complete workflow, the user only needs to provide a single natural-language instruction to GitHub Copilot:

```text
Now I would like to perform end to end QA workflow using multiple agents and MCP servers that I have defined in current prompt file prompts/QAEnd2EndPromptFile.md
```

This lightweight prompt acts as the entry point for the workflow.

Behind the scenes, the AI assistant loads and executes the detailed orchestration logic defined in:

```text
prompts/QAEnd2EndPromptFile.md
```

This demonstrates how a complex QA process can be initiated through a single natural-language command while leveraging multiple specialized agents for planning, exploration, automation, execution, healing, reporting, and Git operations.

## Getting started

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install --with-deps
```

### Run the tests

```bash
npx playwright test --project=chromium
```

### Push changes to GitHub

If you need to push updates to a remote repo, use a GitHub Personal Access Token (PAT) when prompted.
Do not store the PAT in the repository.

```bash
git push origin main
```

## Important files

- `user-stories/SCRUM-101-ecommerce-checkout.md` — user story and acceptance criteria
- `specs/saucedemo-checkout-test-plan.md` — generated test plan
- `specs/exploratory-results.md` — findings from manual exploration
- `tests/saucedemo-checkout/` — generated Playwright test suites
- `test-results/SCRUM-101-checkout-test-report.md` — execution report and summary
- `.vscode/mcp.json` — MCP server configuration
- `.github/agents/` — agent definitions and responsibilities
- `prompts/QAEnd2EndPromptFile.md` — complete workflow orchestration prompt

## Notes

- The app under test is `https://www.saucedemo.com`
- Use the built-in credentials: `standard_user` / `secret_sauce`
- This repository is meant to show an AI-driven test workflow, not a production-grade test suite
- This project demonstrates AI-assisted QA workflows. Human expertise is still essential for requirement validation, risk assessment, test strategy, and business-critical decision making.

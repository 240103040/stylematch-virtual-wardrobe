# StyleMatch Development Process

## Roles
- **Product Manager (PM):** scope, prioritization, requirements, acceptance criteria.
- **Software Engineer:** implementation and automated tests.
- **QA Engineer:** independent verification, regression coverage, evidence, issue closure.
- **Human developer:** approves decisions, runs the application, reviews AI-generated changes.

## Workflow
1. Select an open GitHub Issue.
2. PM grooms Goal, Description, dependencies, acceptance criteria, and test cases.
3. Engineer reviews the specification and current code.
4. Engineer implements only the scoped change.
5. Engineer runs relevant tests and records actual results.
6. QA independently checks acceptance criteria and test evidence.
7. Fix failures and rerun tests.
8. Update documentation.
9. QA closes the issue only after verification.

## Required iterations
1. Frontend with mock service.
2. OpenAPI contract.
3. In-memory backend.
4. SQLAlchemy + SQLite persistence.
5. Frontend/backend integration.
6. QA, bug fixes, documentation, and delivery.

## Bug workflow
Every bug found in actual user testing gets a `user-test-bug` issue with reproduction steps and expected/actual behavior. PM grooms it, QA adds regression tests, Engineer fixes it, and QA verifies and closes it.

## Issue closure
Code generation alone is not completion. Confirm acceptance criteria, tests, and required documentation before closing an issue.

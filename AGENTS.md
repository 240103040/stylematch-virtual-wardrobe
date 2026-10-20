# StyleMatch AI Agent Instructions

## Goal
Build a polished, reliable virtual wardrobe and outfit recommendation application.

## Rules
1. Read `README.md`, `process.md`, `docs/product-spec.md`, and relevant role instructions before coding.
2. Work from one GitHub Issue at a time. Do not implement unrelated features.
3. Use labels `mvp`, `post-mvp`, and `user-test-bug`.
4. Follow the required sequence: frontend/mock service → OpenAPI → in-memory backend → SQLite persistence → frontend/backend integration.
5. Keep frontend API calls behind a typed service layer.
6. Treat `openapi.yml` as the API contract.
7. Use SQLAlchemy for persistence; do not put SQL directly in routers.
8. Do not commit secrets, `.env` files, virtual environments, `node_modules`, or SQLite database files.
9. Add/update tests for behavior changes and run them before reporting success.
10. Never claim tests passed unless they were actually executed.
11. Update Markdown documentation when product behavior, architecture, commands, or contracts change.
12. Leave issue closure to QA after acceptance criteria and evidence are verified.

## User-test bug workflow
Create an issue labeled `user-test-bug` with Goal, Description, reproduction steps, expected behavior, actual behavior, environment, and evidence. PM grooms it; QA adds regression tests; Engineering fixes it; QA reproduces and verifies the fix before closing.

## Final verification
Run frontend and backend tests, manually test critical user flows, update `docs/testing.md`, and report any failures honestly.

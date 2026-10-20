# GitHub Issues Backlog — StyleMatch

Create repository labels first: `mvp`, `post-mvp`, `user-test-bug`. Optional labels: `frontend`, `backend`, `docs`, `testing`.

Every issue should include **Goal**, **Description**, **Acceptance Criteria**, and **Test Cases**. These are proposed issues; they have not been created in GitHub automatically.

## MVP issues

1. **Define StyleMatch product scope** — `mvp`, `docs`
   - Goal: agree on the first-release scope.
   - Description: document users, problem, MVP, and exclusions.
   - Acceptance: `docs/product-spec.md` is reviewed and scope is explicit.

2. **Initialize repository and development instructions** — `mvp`, `docs`
   - Goal: prepare a maintainable repository.
   - Description: README, AGENTS, `.gitignore`, `.env.example`, folder structure.
   - Acceptance: instructions are accurate and local secrets/data are ignored.

3. **Add agent role definitions and workflow** — `mvp`, `docs`
   - Goal: define PM, Engineer, and QA responsibilities.
   - Description: create role instructions and `process.md`.
   - Acceptance: grooming, implementation, testing, and closure workflow is documented.

4. **Record brainstorming and architecture decisions** — `mvp`, `docs`
   - Goal: preserve the rationale behind the idea.
   - Description: maintain `chat-brainstorm.md` and architecture/design decision docs.
   - Acceptance: record is truthful and updated during development.

5. **Establish visual design system** — `mvp`, `frontend`
   - Goal: create a distinctive editorial fashion UI.
   - Description: colors, typography, spacing, cards, forms, responsive rules.
   - Acceptance: reusable components follow the documented system.

6. **Build navigation and dashboard** — `mvp`, `frontend`
   - Goal: provide the main application shell.
   - Description: navigation, statistics, recent items, empty states.
   - Acceptance: navigation works and dashboard reflects data.

7. **Implement wardrobe CRUD UI** — `mvp`, `frontend`
   - Goal: manage clothing from the UI.
   - Description: add, edit, view, and delete clothing.
   - Acceptance: validation, confirmation, and success/error states work.

8. **Implement wardrobe search and filters** — `mvp`, `frontend`
   - Goal: find items quickly.
   - Description: search and category/color/season/occasion filters.
   - Acceptance: combined filters work and empty results are explained.

9. **Build outfit builder and saved outfits UI** — `mvp`, `frontend`
   - Goal: combine and save wardrobe items.
   - Description: item selection, preview, naming, saving, listing, deleting.
   - Acceptance: duplicates are prevented and saved outfits render correctly.

10. **Implement rule-based recommendations** — `mvp`, `frontend`, `backend`
    - Goal: recommend useful outfit combinations.
    - Description: category, season, occasion, and color rules.
    - Acceptance: suggestions use existing items and explain the recommendation.

11. **Add mock service and frontend tests** — `mvp`, `frontend`, `testing`
    - Goal: develop UI without a backend.
    - Description: service interface, mock implementation, tests.
    - Acceptance: frontend runs independently and critical interactions are tested.

12. **Define OpenAPI contract** — `mvp`, `backend`, `docs`
    - Goal: agree on frontend/backend communication.
    - Description: endpoints, schemas, filters, status codes, error responses.
    - Acceptance: `openapi.yml` validates and matches frontend needs.

13. **Implement FastAPI in-memory backend** — `mvp`, `backend`
    - Goal: implement API before persistent storage.
    - Description: routers, schemas, business logic, temporary in-memory storage.
    - Acceptance: required endpoints behave according to the contract.

14. **Add SQLAlchemy models and SQLite persistence** — `mvp`, `backend`
    - Goal: persist wardrobe data.
    - Description: clothing, outfit, and outfit-item relationship models.
    - Acceptance: CRUD works and data survives backend restart.

15. **Replace in-memory store with SQLAlchemy repositories** — `mvp`, `backend`
    - Goal: switch storage without changing the API contract.
    - Description: move persistence into a database access layer.
    - Acceptance: API contract remains stable and tests use an isolated test DB.

16. **Connect frontend to backend HTTP service** — `mvp`, `frontend`, `backend`
    - Goal: run the app end-to-end.
    - Description: HTTP service, API errors, configurable backend URL.
    - Acceptance: main flows work against the real API; mock service remains for tests.

17. **Add backend integration and business-logic tests** — `mvp`, `backend`, `testing`
    - Goal: verify API and recommendation behavior.
    - Description: CRUD, validation, filtering, relations, missing IDs, recommendations.
    - Acceptance: tests cover critical paths and edge cases.

18. **Perform end-to-end user testing** — `mvp`, `testing`
    - Goal: verify the running app as a user.
    - Description: execute documented scenarios and record actual results.
    - Acceptance: test log is updated and each discovered bug gets a `user-test-bug` issue.

19. **Fix verified user-test bugs** — `mvp`, `testing`
    - Goal: resolve defects found during actual use.
    - Description: PM grooms each bug, QA adds regression coverage, Engineer fixes it.
    - Acceptance: bug reproduced before fix and verified after fix.

20. **Add automated CI workflow** — `mvp`, `testing`
    - Goal: run tests on push and pull requests.
    - Description: configure GitHub Actions for backend and frontend.
    - Acceptance: workflow runs and reports real results.

21. **Complete documentation and final QA** — `mvp`, `docs`, `testing`
    - Goal: prepare the deliverable.
    - Description: update run instructions, architecture, API, test log, and known limitations.
    - Acceptance: a new developer can follow README and QA has verified all MVP acceptance criteria.

## Post-MVP issues

22. **Add user authentication** — `post-mvp`
23. **Add clothing image uploads** — `post-mvp`
24. **Explore external AI-assisted styling** — `post-mvp`
25. **Add outfit calendar** — `post-mvp`
26. **Add wardrobe usage insights** — `post-mvp`

## Bug issue template

Label: `user-test-bug`

- **Goal:** What should the user be able to do?
- **Description:** Reproduction steps and context.
- **Expected behavior:** What should happen?
- **Actual behavior:** What actually happened?
- **Environment:** OS, browser, commit, frontend/backend versions.
- **Evidence:** screenshot, logs, or failing test when available.
- **PM grooming:** scope, acceptance criteria, dependencies.
- **QA regression cases:** reproduction test and related edge cases.

## Closure rule
Do not close an issue because code was generated. QA closes it only after acceptance criteria are verified and the relevant tests actually pass. Keep post-MVP issues open unless they are implemented and verified.

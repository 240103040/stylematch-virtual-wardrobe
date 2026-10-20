# StyleMatch

**Your wardrobe. Your style. Smarter outfits.**

StyleMatch is a responsive virtual wardrobe MVP. Users can organize clothing, filter items, build outfits, and generate transparent rule-based outfit suggestions.

## Stack
- Frontend: React + TypeScript + Vite
- Backend: FastAPI + SQLAlchemy + SQLite
- API contract: `openapi.yml`
- Backend tests: Pytest
- Frontend tests: Vitest (test setup can be expanded during the frontend iteration)

## Project status
This repository is a starter scaffold. Run and test it locally, then record actual results in `docs/testing.md`. Do not mark GitHub Issues complete until their acceptance criteria are verified.

## Run the backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Open API docs at http://localhost:8000/docs.

## Run the frontend
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:8000` in `frontend/.env.local` if needed.

## Test the backend
```bash
cd backend
source .venv/bin/activate
pytest
```

## Development sequence
1. Frontend with mock service.
2. OpenAPI contract.
3. In-memory backend.
4. SQLAlchemy + SQLite persistence.
5. Connect frontend to backend.
6. Manual testing, regression fixes, and final QA.

## Important
- The backend scaffold currently uses SQLite persistence from the start; if the assignment requires demonstrating the in-memory stage, implement and commit that as a separate earlier iteration/branch or follow the issue sequence before merging SQLite.
- Do not commit `.env` files, virtual environments, `node_modules`, or local database files.

# Architecture

## Intended architecture
- **Frontend:** React UI → typed service interface → mock or HTTP service.
- **Backend:** FastAPI routers → Pydantic schemas → business/service layer → SQLAlchemy ORM → SQLite.
- **Contract:** `openapi.yml` documents request and response schemas.

## Iteration plan
1. Build frontend with mock service.
2. Freeze the OpenAPI contract.
3. Implement in-memory backend.
4. Replace storage with SQLAlchemy + SQLite without changing the API contract.
5. Switch frontend from mock service to HTTP service.
6. Verify behavior and persistence.

## Data relationships
An outfit can contain many clothing items, and one clothing item may appear in multiple outfits. `OutfitItem` implements the many-to-many relationship.

## Error handling
Use documented HTTP status codes. Return 404 for missing resources and 422 for request validation errors. Avoid leaking internal exception details.

## Configuration
Use environment variables for configuration. Never commit secrets or local database files.

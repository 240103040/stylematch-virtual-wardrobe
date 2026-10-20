# Architecture Decision Records

## ADR-001: Rule-based recommendations for MVP
**Decision:** Use transparent rules instead of external AI model integration.

**Reason:** Keeps the MVP testable, affordable, deterministic, and within the project scope.

**Trade-off:** Recommendations are less personalized than a trained or hosted AI model.

## ADR-002: SQLite + SQLAlchemy
**Decision:** Use SQLite for persistent local storage and SQLAlchemy as ORM.

**Reason:** Meets the assignment requirement and avoids coupling most application logic to raw SQL.

## ADR-003: Service layer in frontend
**Decision:** Use a typed service interface with separate mock and HTTP implementations.

**Reason:** Enables frontend development before backend availability and makes the transition testable.

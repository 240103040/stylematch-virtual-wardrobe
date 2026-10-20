# StyleMatch — Product Specification

## 1. Overview
StyleMatch is a responsive web application that helps users organize their personal wardrobe, create outfits, and discover clothing combinations using rule-based recommendations.

**Tagline:** Your wardrobe. Your style. Smarter outfits.

## 2. Problem
Users often own many clothing items but struggle to organize them and choose combinations for different occasions and seasons.

## 3. Target users
- Students and young professionals.
- People who want to use their existing clothes more effectively.
- Users who need outfit ideas for everyday life and special occasions.

## 4. MVP scope
### Digital wardrobe
- View, add, edit, and delete clothing items.
- Store name, category, color, season, occasions, and optional image URL.
- Search by name.
- Filter by category, color, season, and occasion.

### Outfit builder
- Select items from the wardrobe.
- Support tops, bottoms, shoes, accessories, and outerwear.
- Save an outfit with a name, occasion, season, and selected items.
- View and delete saved outfits.
- Prevent duplicate item selection and reject invalid item IDs.

### Recommendations
- Generate outfit suggestions using available wardrobe items.
- Apply transparent rules for category, season, occasion, and color.
- Explain why an outfit was suggested.
- Show a useful empty state if the wardrobe lacks compatible items.
- Do not claim a machine-learning model is used.

### Dashboard
- Show clothing item count, saved outfit count, recent additions, and category distribution.

## 5. Out of scope
Authentication, payments, external AI integration, automatic image recognition, social sharing, e-commerce, and weather API integration.

## 6. Technology
- Frontend: React, TypeScript, Vite.
- Backend: Python, FastAPI.
- Contract: OpenAPI 3.x in `openapi.yml`.
- Database: SQLite.
- ORM: SQLAlchemy 2.x.
- Backend tests: Pytest + FastAPI TestClient.
- Frontend tests: Vitest + React Testing Library (configure as part of frontend setup).

## 7. Data model
### ClothingItem
`id`, `name`, `category`, `color`, `season`, `occasions`, optional `image_url`, `created_at`, `updated_at`.

Categories: `top`, `bottom`, `shoes`, `accessory`, `outerwear`.
Seasons: `spring`, `summer`, `autumn`, `winter`, `all-season`.
Occasions: `casual`, `university`, `work`, `formal`, `party`.

### Outfit
`id`, `name`, `occasion`, `season`, `created_at`, `updated_at`.

### OutfitItem
`outfit_id`, `clothing_item_id`. This is a many-to-many relationship with foreign-key integrity.

## 8. API
- `GET /api/health`
- `GET /api/clothing`
- `POST /api/clothing`
- `GET /api/clothing/{item_id}`
- `PATCH /api/clothing/{item_id}`
- `DELETE /api/clothing/{item_id}`
- `GET /api/outfits`
- `POST /api/outfits`
- `GET /api/outfits/{outfit_id}`
- `DELETE /api/outfits/{outfit_id}`
- `POST /api/outfits/generate`
- `GET /api/dashboard/summary`

Filtering/search parameters must be documented in `openapi.yml`.

## 9. Quality requirements
- Responsive desktop and mobile layouts.
- Accessible labels and keyboard navigation.
- Loading, error, empty, and success states.
- Server-side input validation and consistent API errors.
- Data survives backend restart.
- No secrets or local database files committed.
- Tests cover critical behavior.
- API changes are reflected in `openapi.yml`.

## 10. Definition of Done
A feature is done when acceptance criteria pass, relevant tests pass, documentation is updated, and QA has reviewed evidence. A user-test bug must be reproduced before the fix and verified after it.

## 11. MVP acceptance
A user can manage clothing, filter the wardrobe, create and save outfits, generate rule-based recommendations, and see dashboard statistics. Data persists after backend restart.

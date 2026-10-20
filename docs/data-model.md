# Data Model

## ClothingItem
- `id`: integer primary key
- `name`: non-empty string
- `category`: top, bottom, shoes, accessory, outerwear
- `color`: non-empty string
- `season`: spring, summer, autumn, winter, all-season
- `occasions`: list of occasion values (serialized in the SQLite implementation or normalized if needed)
- `image_url`: nullable string
- `created_at`, `updated_at`: timestamps

## Outfit
- `id`: integer primary key
- `name`: non-empty string
- `occasion`: casual, university, work, formal, party
- `season`: supported season
- `created_at`, `updated_at`: timestamps

## OutfitItem
- `outfit_id`: foreign key to Outfit
- `clothing_item_id`: foreign key to ClothingItem
- Unique constraint on the pair to prevent duplicate items in one outfit.

## Integrity
Use SQLAlchemy relationships and database foreign keys. Deleting an item referenced by an outfit must have an explicitly tested behavior; do not leave orphaned links.

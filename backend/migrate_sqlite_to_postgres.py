from pathlib import Path

from sqlalchemy import create_engine, select, text
from app.database import Base
from app import models

sqlite_path = Path(__file__).resolve().parent / "stylematch.db"
sqlite_engine = create_engine(f"sqlite:///{sqlite_path}")

postgres_url = (
    "postgresql+psycopg://stylematch:stylematch_password"
    "@localhost:5433/stylematch"
)
postgres_engine = create_engine(postgres_url)

clothing_ids = {}
outfit_ids = {}

try:
    with sqlite_engine.connect() as source:
        with postgres_engine.begin() as target:

            clothing = Base.metadata.tables["clothing_items"]
            outfits = Base.metadata.tables["outfits"]
            links = Base.metadata.tables["outfit_items"]

            def copy_parent(table, id_map):
                source_rows = source.execute(select(table)).mappings().all()
                existing_ids = set(
                    target.execute(select(table.c.id)).scalars().all()
                )
                next_id = max(existing_ids, default=0) + 1

                for row in source_rows:
                    data = dict(row)
                    old_id = data["id"]

                    if old_id in existing_ids:
                        new_id = next_id
                        next_id += 1
                    else:
                        new_id = old_id

                    data["id"] = new_id
                    id_map[old_id] = new_id

                    target.execute(table.insert().values(**data))
                    existing_ids.add(new_id)

                print(f"{table.name}: copied {len(source_rows)} records")

            copy_parent(clothing, clothing_ids)
            copy_parent(outfits, outfit_ids)

            link_rows = source.execute(select(links)).mappings().all()

            for row in link_rows:
                data = dict(row)
                data["clothing_item_id"] = clothing_ids[
                    data["clothing_item_id"]
                ]
                data["outfit_id"] = outfit_ids[data["outfit_id"]]

                target.execute(links.insert().values(**data))

            print(f"outfit_items: copied {len(link_rows)} records")

            for table_name in ["clothing_items", "outfits"]:
                target.execute(text(f"""
                    SELECT setval(
                        pg_get_serial_sequence('{table_name}', 'id'),
                        COALESCE((SELECT MAX(id) FROM {table_name}), 1),
                        EXISTS(SELECT 1 FROM {table_name})
                    )
                """))

    print("Migration completed successfully!")

finally:
    sqlite_engine.dispose()
    postgres_engine.dispose()

import os
import tempfile
from fastapi.testclient import TestClient

# Use a temporary SQLite database for isolated tests.
db_file = tempfile.NamedTemporaryFile(suffix=".sqlite3", delete=False)
db_file.close()
os.environ["DATABASE_URL"] = f"sqlite:///{db_file.name}"

from app.main import app  # noqa: E402
from app.database import Base, engine  # noqa: E402

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
client = TestClient(app)

def setup_function():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def test_health():
    assert client.get("/api/health").json() == {"status": "ok"}

def test_clothing_crud():
    response = client.post("/api/clothing", json={
        "name": "White Shirt", "category": "top", "color": "white",
        "season": "all-season", "occasions": ["casual"]
    })
    assert response.status_code == 201
    item_id = response.json()["id"]
    assert client.get(f"/api/clothing/{item_id}").status_code == 200
    assert client.patch(f"/api/clothing/{item_id}", json={"color": "cream"}).json()["color"] == "cream"
    assert client.delete(f"/api/clothing/{item_id}").status_code == 204
    assert client.get(f"/api/clothing/{item_id}").status_code == 404

def test_create_outfit_and_generate_recommendation():
    ids = []
    for name, category, color in [
        ("Shirt", "top", "white"), ("Jeans", "bottom", "blue"), ("Sneakers", "shoes", "white")
    ]:
        response = client.post("/api/clothing", json={
            "name": name, "category": category, "color": color,
            "season": "all-season", "occasions": ["casual"]
        })
        assert response.status_code == 201
        ids.append(response.json()["id"])
    outfit = client.post("/api/outfits", json={
        "name": "Everyday", "occasion": "casual", "season": "all-season",
        "clothing_item_ids": ids
    })
    assert outfit.status_code == 201
    assert set(outfit.json()["clothing_item_ids"]) == set(ids)
    recs = client.post("/api/outfits/generate", json={"occasion": "casual", "limit": 3})
    assert recs.status_code == 200
    assert len(recs.json()) >= 1

def test_outfit_rejects_missing_item():
    response = client.post("/api/outfits", json={
        "name": "Broken", "occasion": "casual", "season": "all-season",
        "clothing_item_ids": [99999]
    })
    assert response.status_code == 404

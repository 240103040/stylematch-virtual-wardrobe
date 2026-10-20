from typing import Optional, Dict, List

from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from .database import Base, engine, get_db
from .models import ClothingItem, Outfit, OutfitItem
from .schemas import (
    ClothingCreate,
    ClothingOut,
    ClothingUpdate,
    DashboardSummary,
    OutfitCreate,
    OutfitOut,
    Recommendation,
    RecommendationRequest,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StyleMatch API",
    version="0.1.0",
    description="Virtual wardrobe MVP API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def outfit_out(outfit: Outfit) -> OutfitOut:
    return OutfitOut(
        id=outfit.id,
        name=outfit.name,
        occasion=outfit.occasion,
        season=outfit.season,
        clothing_item_ids=[
            link.clothing_item_id for link in outfit.item_links
        ],
    )


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/clothing", response_model=List[ClothingOut])
def list_clothing(
    search: Optional[str] = None,
    category: Optional[str] = None,
    color: Optional[str] = None,
    season: Optional[str] = None,
    occasion: Optional[str] = None,
    db: Session = Depends(get_db),
):
    stmt = select(ClothingItem).order_by(ClothingItem.id.desc())

    if search:
        stmt = stmt.where(
            ClothingItem.name.ilike(f"%{search.strip()}%")
        )

    if category:
        stmt = stmt.where(ClothingItem.category == category)

    if color:
        stmt = stmt.where(
            ClothingItem.color.ilike(f"%{color.strip()}%")
        )

    if season:
        stmt = stmt.where(
            (ClothingItem.season == season)
            | (ClothingItem.season == "all-season")
        )

    items = list(db.scalars(stmt))

    if occasion:
        items = [
            item for item in items
            if occasion in (item.occasions or [])
        ]

    return items


@app.post(
    "/api/clothing",
    response_model=ClothingOut,
    status_code=status.HTTP_201_CREATED,
)
def create_clothing(
    payload: ClothingCreate,
    db: Session = Depends(get_db),
):
    item = ClothingItem(**payload.model_dump(mode="json"))
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@app.get("/api/clothing/{item_id}", response_model=ClothingOut)
def get_clothing(item_id: int, db: Session = Depends(get_db)):
    item = db.get(ClothingItem, item_id)

    if not item:
        raise HTTPException(404, "Clothing item not found")

    return item


@app.patch("/api/clothing/{item_id}", response_model=ClothingOut)
def update_clothing(
    item_id: int,
    payload: ClothingUpdate,
    db: Session = Depends(get_db),
):
    item = db.get(ClothingItem, item_id)

    if not item:
        raise HTTPException(404, "Clothing item not found")

    for key, value in payload.model_dump(
        exclude_unset=True,
        mode="json",
    ).items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)
    return item


@app.delete(
    "/api/clothing/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_clothing(item_id: int, db: Session = Depends(get_db)):
    item = db.get(ClothingItem, item_id)

    if not item:
        raise HTTPException(404, "Clothing item not found")

    db.delete(item)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.get("/api/outfits", response_model=List[OutfitOut])
def list_outfits(db: Session = Depends(get_db)):
    outfits = db.scalars(
        select(Outfit)
        .options(selectinload(Outfit.item_links))
        .order_by(Outfit.id.desc())
    ).all()

    return [outfit_out(outfit) for outfit in outfits]


@app.post(
    "/api/outfits",
    response_model=OutfitOut,
    status_code=status.HTTP_201_CREATED,
)
def create_outfit(
    payload: OutfitCreate,
    db: Session = Depends(get_db),
):
    ids = payload.clothing_item_ids

    if len(set(ids)) != len(ids):
        raise HTTPException(
            422,
            "Duplicate clothing item IDs are not allowed",
        )

    found = list(
        db.scalars(
            select(ClothingItem).where(ClothingItem.id.in_(ids))
        )
    )

    if len(found) != len(set(ids)):
        raise HTTPException(
            404,
            "One or more clothing items were not found",
        )

    outfit = Outfit(
        name=payload.name,
        occasion=payload.occasion,
        season=payload.season,
    )

    outfit.item_links = [
        OutfitItem(clothing_item_id=item_id)
        for item_id in ids
    ]

    db.add(outfit)
    db.commit()
    db.refresh(outfit)

    return outfit_out(outfit)


@app.get("/api/outfits/{outfit_id}", response_model=OutfitOut)
def get_outfit(outfit_id: int, db: Session = Depends(get_db)):
    outfit = db.scalar(
        select(Outfit)
        .options(selectinload(Outfit.item_links))
        .where(Outfit.id == outfit_id)
    )

    if not outfit:
        raise HTTPException(404, "Outfit not found")

    return outfit_out(outfit)


@app.delete(
    "/api/outfits/{outfit_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_outfit(outfit_id: int, db: Session = Depends(get_db)):
    outfit = db.get(Outfit, outfit_id)

    if not outfit:
        raise HTTPException(404, "Outfit not found")

    db.delete(outfit)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.post(
    "/api/outfits/generate",
    response_model=List[Recommendation],
)
def generate_outfits(
    payload: RecommendationRequest,
    db: Session = Depends(get_db),
):
    items = list(
        db.scalars(select(ClothingItem).order_by(ClothingItem.id))
    )

    if payload.season:
        items = [
            item for item in items
            if item.season in (payload.season, "all-season")
        ]

    if payload.occasion:
        items = [
            item for item in items
            if payload.occasion in (item.occasions or [])
        ]

    tops = [item for item in items if item.category == "top"]
    bottoms = [item for item in items if item.category == "bottom"]
    shoes = [item for item in items if item.category == "shoes"]

    results = []

    for top in tops:
        for bottom in bottoms:
            for shoe in shoes:
                colors = {
                    top.color.lower(),
                    bottom.color.lower(),
                    shoe.color.lower(),
                }

                explanation = "Combines a top, bottom, and shoes"

                if len(colors) <= 2:
                    explanation += " with a coordinated color palette"

                results.append(
                    Recommendation(
                        clothing_item_ids=[
                            top.id,
                            bottom.id,
                            shoe.id,
                        ],
                        explanation=explanation + ".",
                    )
                )

                if len(results) >= payload.limit:
                    return results

    return results


@app.get(
    "/api/dashboard/summary",
    response_model=DashboardSummary,
)
def dashboard_summary(db: Session = Depends(get_db)):
    items = list(db.scalars(select(ClothingItem)))
    outfits = list(db.scalars(select(Outfit)))

    counts: Dict[str, int] = {}

    for item in items:
        counts[item.category] = counts.get(item.category, 0) + 1

    return DashboardSummary(
        clothing_count=len(items),
        outfit_count=len(outfits),
        category_counts=counts,
    )

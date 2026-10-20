
from typing import Literal, Optional, List, Dict
from pydantic import BaseModel, ConfigDict, Field, HttpUrl

Category = Literal["top", "bottom", "shoes", "accessory", "outerwear"]
Season = Literal["spring", "summer", "autumn", "winter", "all-season"]
Occasion = Literal["casual", "university", "work", "formal", "party"]


class ClothingCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    category: Category
    color: str = Field(min_length=1, max_length=40)
    season: Season
    occasions: List[Occasion] = Field(default_factory=list)
    image_url: Optional[HttpUrl] = None


class ClothingUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    category: Optional[Category] = None
    color: Optional[str] = Field(default=None, min_length=1, max_length=40)
    season: Optional[Season] = None
    occasions: Optional[List[Occasion]] = None
    image_url: Optional[HttpUrl] = None


class ClothingOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    category: str
    color: str
    season: str
    occasions: List[str]
    image_url: Optional[str] = None


class OutfitCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    occasion: Occasion
    season: Season
    clothing_item_ids: List[int] = Field(min_length=1)


class OutfitOut(BaseModel):
    id: int
    name: str
    occasion: str
    season: str
    clothing_item_ids: List[int]


class RecommendationRequest(BaseModel):
    occasion: Optional[Occasion] = None
    season: Optional[Season] = None
    limit: int = Field(default=5, ge=1, le=20)


class Recommendation(BaseModel):
    clothing_item_ids: List[int]
    explanation: str


class DashboardSummary(BaseModel):
    clothing_count: int
    outfit_count: int
    category_counts: Dict[str, int]

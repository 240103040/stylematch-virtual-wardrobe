from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import DateTime, ForeignKey, Integer, String, JSON, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base

def now_utc():
    return datetime.now(timezone.utc)

class ClothingItem(Base):
    __tablename__ = "clothing_items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(30), nullable=False)
    color: Mapped[str] = mapped_column(String(40), nullable=False)
    season: Mapped[str] = mapped_column(String(20), nullable=False)
    occasions: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    image_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, onupdate=now_utc)
    outfit_links: Mapped[list["OutfitItem"]] = relationship(back_populates="clothing_item", cascade="all, delete-orphan")

class Outfit(Base):
    __tablename__ = "outfits"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    occasion: Mapped[str] = mapped_column(String(30), nullable=False)
    season: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, onupdate=now_utc)
    item_links: Mapped[list["OutfitItem"]] = relationship(back_populates="outfit", cascade="all, delete-orphan")

class OutfitItem(Base):
    __tablename__ = "outfit_items"
    __table_args__ = (UniqueConstraint("outfit_id", "clothing_item_id", name="uq_outfit_item"),)
    outfit_id: Mapped[int] = mapped_column(ForeignKey("outfits.id", ondelete="CASCADE"), primary_key=True)
    clothing_item_id: Mapped[int] = mapped_column(ForeignKey("clothing_items.id", ondelete="CASCADE"), primary_key=True)
    outfit: Mapped["Outfit"] = relationship(back_populates="item_links")
    clothing_item: Mapped["ClothingItem"] = relationship(back_populates="outfit_links")

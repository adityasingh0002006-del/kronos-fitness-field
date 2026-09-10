from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)  # Phone number
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=False)
    trainer_name = Column(String(100), default="Floor Trainer")
    has_diet_plan = Column(Boolean, default=False)
    diet_details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationship to 7-day workout plans
    workout_plans = relationship("WorkoutPlan", back_populates="member", cascade="all, delete-orphan", order_by="WorkoutPlan.id")

    def __repr__(self):
        return f"<Member {self.username} - {self.full_name}>"


class WorkoutPlan(Base):
    __tablename__ = "workout_plans"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id", ondelete="CASCADE"), nullable=False)
    day_of_week = Column(String(20), nullable=False)  # Monday, Tuesday, etc.
    muscle_group = Column(String(100), default="REST & RECOVERY")
    exercise_list = Column(Text, default="Rest Day - Mobility, hydration, active recovery.")

    member = relationship("Member", back_populates="workout_plans")

    def __repr__(self):
        return f"<WorkoutPlan {self.day_of_week}: {self.muscle_group}>"


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<Admin {self.username}>"

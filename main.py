import os
from datetime import datetime, timezone
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Form, Depends, HTTPException, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db, SessionLocal
import models
import auth

# 7-day canonical list
DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

# Auto-seeding helper
def seed_initial_data():
    db = SessionLocal()
    try:
        # 1. Seed Admin
        admin_user = db.query(models.Admin).filter(models.Admin.username == "admin").first()
        if not admin_user:
            admin_user = models.Admin(
                username="admin",
                password_hash=auth.hash_password("kronos2026")
            )
            db.add(admin_user)
            db.commit()
            print("[KRONOS] Seeded admin user: admin / kronos2026")

        # 2. Seed Demo Member 1: Arjun Patel (With Diet Plan & Full 7-Day Split)
        m1 = db.query(models.Member).filter(models.Member.username == "9876543210").first()
        if not m1:
            m1 = models.Member(
                username="9876543210",
                full_name="Arjun Patel",
                password_hash=auth.hash_password("member123"),
                trainer_name="Coach Vikram (Head Strength)",
                has_diet_plan=True,
                diet_details=(
                    "CALORIC TARGET: 2,850 kcal | PROTEIN: 190g | CARBS: 320g | FATS: 65g\n\n"
                    "• MEAL 1 (07:30 AM): 6 Egg Whites + 2 Whole Eggs, 90g Rolled Oats with 1 Scoop Whey & 15 Almonds\n"
                    "• MEAL 2 (11:30 AM): 200g Grilled Chicken Breast, 160g Cooked Basmati Rice, Steamed Broccoli\n"
                    "• MEAL 3 (04:00 PM - Pre-Workout): 2 Ripe Bananas, 2 Whole Wheat Toast + 2 tbsp Peanut Butter, Black Coffee\n"
                    "• MEAL 4 (07:30 PM - Post-Workout): 1.5 Scoops Whey Isolate, 5g Creatine Monohydrate with 300ml Tender Coconut Water\n"
                    "• MEAL 5 (09:30 PM): 200g Low Fat Paneer / Grilled Fish, Roasted Vegetables, 1 tbsp Cold Pressed Olive Oil\n\n"
                    "HYDRATION PROTOCOL: Minimum 4.5 Liters of water daily. Electrolytes during training."
                )
            )
            db.add(m1)
            db.commit()
            db.refresh(m1)

            # Add 7-Day Workout Plan for Arjun
            splits_m1 = {
                "Monday": (
                    "CHEST & TRICEPS - HEAVY PUSH",
                    "1. Barbell Flat Bench Press: 4 sets x 6-8 reps (Heavy Peak)\n"
                    "2. Incline Dumbbell Press: 3 sets x 10 reps\n"
                    "3. Weighted Dips: 3 sets x 12 reps\n"
                    "4. Standing Cable Crossover: 3 sets x 15 reps\n"
                    "5. Overhead Rope Tricep Extension: 4 sets x 12 reps"
                ),
                "Tuesday": (
                    "BACK & BICEPS - PULL EXPLOSION",
                    "1. Conventional Deadlifts: 5 sets x 5 reps (Work up to 85% 1RM)\n"
                    "2. Neutral Grip Weighted Pull-Ups: 4 sets x 8 reps\n"
                    "3. Bent-Over Barbell Rows: 4 sets x 10 reps\n"
                    "4. Seated Cable Rows: 3 sets x 12 reps\n"
                    "5. Standing EZ-Bar Bicep Curls: 4 sets x 10 reps"
                ),
                "Wednesday": (
                    "QUADS, HAMSTRINGS & CALVES",
                    "1. Barbell Back Squats: 4 sets x 8 reps (Deep ATG)\n"
                    "2. 45-Degree Leg Press: 4 sets x 12 reps\n"
                    "3. Romanian Deadlifts (RDL): 4 sets x 10 reps\n"
                    "4. Walking Dumbbell Lunges: 3 sets x 20 steps\n"
                    "5. Standing Donkey Calf Raises: 4 sets x 20 reps"
                ),
                "Thursday": (
                    "SHOULDERS, TRAPS & CORE",
                    "1. Standing Overhead Barbell Press (OHP): 4 sets x 6 reps\n"
                    "2. Dumbbell Lateral Raises: 5 sets x 15 reps (Strict form)\n"
                    "3. Rear Delt Reverse Cable Flyes: 4 sets x 15 reps\n"
                    "4. Heavy Barbell Shrugs: 4 sets x 12 reps (2-sec pause at top)\n"
                    "5. Hanging Leg Raises: 4 sets x 15 reps"
                ),
                "Friday": (
                    "ARM ANNIHILATION & FOREARMS",
                    "1. Incline Dumbbell Bicep Curls: 4 sets x 10 reps\n"
                    "2. Barbell Skull Crushers: 4 sets x 10 reps\n"
                    "3. Preacher Hammer Curls: 3 sets x 12 reps\n"
                    "4. Cable Straight-Bar Pushdowns: 4 sets x 15 reps (Dropset on last)\n"
                    "5. Barbell Wrist Curls: 4 sets x 20 reps"
                ),
                "Saturday": (
                    "WAR CONDITIONING & PLYOMETRICS",
                    "1. Kettlebell Swings: 5 rounds x 20 reps (Heavy 24kg)\n"
                    "2. Battle Ropes Wave Slams: 5 rounds x 30 sec work / 30 sec rest\n"
                    "3. Prowler Sled Push: 6 lengths of gym turf\n"
                    "4. Medicine Ball Slams: 4 sets x 15 reps\n"
                    "5. Plank Hold: 3 sets to failure"
                ),
                "Sunday": (
                    "ACTIVE RECOVERY & MOBILITY",
                    "Rest Day Protocol:\n"
                    "• 30-minute light outdoor walk around Sanigawan\n"
                    "• 15-minute hip and thoracic spine foam rolling\n"
                    "• Cold shower / sauna recovery\n"
                    "• Rest, hydrate, and prepare for Monday's push session."
                )
            }
            for day, (muscle, ex) in splits_m1.items():
                db.add(models.WorkoutPlan(
                    member_id=m1.id,
                    day_of_week=day,
                    muscle_group=muscle,
                    exercise_list=ex
                ))
            db.commit()
            print("[KRONOS] Seeded member Arjun Patel (9876543210)")

        # 3. Seed Demo Member 2: Priya Sharma (No Diet Plan, Standard Split)
        m2 = db.query(models.Member).filter(models.Member.username == "9123456780").first()
        if not m2:
            m2 = models.Member(
                username="9123456780",
                full_name="Priya Sharma",
                password_hash=auth.hash_password("member123"),
                trainer_name="Coach Simran (Functional & HIIT)",
                has_diet_plan=False,
                diet_details=None
            )
            db.add(m2)
            db.commit()
            db.refresh(m2)

            splits_m2 = {
                "Monday": (
                    "GLUTES & HAMSTRINGS HYPERTROPHY",
                    "1. Barbell Hip Thrusts: 4 sets x 10 reps (3-sec hold)\n"
                    "2. Romanian Deadlifts with Dumbbells: 4 sets x 12 reps\n"
                    "3. Bulgarian Split Squats: 3 sets x 10 reps/leg\n"
                    "4. Cable Glute Kickbacks: 3 sets x 15 reps"
                ),
                "Tuesday": (
                    "UPPER BODY STRENGTH & TONING",
                    "1. Dumbbell Shoulder Press: 4 sets x 10 reps\n"
                    "2. Lat Pulldowns: 4 sets x 12 reps\n"
                    "3. Push-Ups (or Incline Push-Ups): 3 sets to failure\n"
                    "4. Dumbbell Lateral Raises: 3 sets x 15 reps"
                ),
                "Wednesday": (
                    "HIIT METABOLIC CONDITIONING",
                    "1. Rowing Machine Intervals: 500m sprint x 4 rounds\n"
                    "2. Burpees: 4 sets x 15 reps\n"
                    "3. Box Jumps: 4 sets x 12 reps\n"
                    "4. Russian Twists with Med Ball: 3 sets x 20 reps"
                ),
                "Thursday": (
                    "QUADS & CORE SCULPTING",
                    "1. Goblet Squats: 4 sets x 12 reps\n"
                    "2. Leg Extensions: 3 sets x 15 reps\n"
                    "3. Walking Lunges: 3 sets x 24 steps\n"
                    "4. Hanging Knee Raises: 3 sets x 15 reps"
                ),
                "Friday": (
                    "BACK & ARM TONING",
                    "1. Seated Cable Rows: 4 sets x 12 reps\n"
                    "2. Assisted Pull-Ups: 3 sets x 8 reps\n"
                    "3. Dumbbell Hammer Curls: 3 sets x 12 reps\n"
                    "4. Tricep Overhead Extension: 3 sets x 12 reps"
                ),
                "Saturday": (
                    "FULL BODY AEROBIC POWER",
                    "1. Assault Bike: 10 mins warmup\n"
                    "2. Kettlebell Deadlift High-Pulls: 4 sets x 15 reps\n"
                    "3. Farmer's Carries: 4 rounds x 40 meters\n"
                    "4. Side Plank Holds: 3 sets x 45 sec/side"
                ),
                "Sunday": (
                    "FULL REST DAY",
                    "Active recovery, full night sleep, hydration, mental reset."
                )
            }
            for day, (muscle, ex) in splits_m2.items():
                db.add(models.WorkoutPlan(
                    member_id=m2.id,
                    day_of_week=day,
                    muscle_group=muscle,
                    exercise_list=ex
                ))
            db.commit()
            print("[KRONOS] Seeded member Priya Sharma (9123456780)")

    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure tables and seed data
    Base.metadata.create_all(bind=engine)
    seed_initial_data()
    yield
    # Teardown: nothing needed for SQLite

app = FastAPI(
    title="KRONOS Fitness Field Management System",
    description="Full-stack gym management and member portal web app for KRONOS Fitness Field, Kanpur",
    version="1.0.0",
    lifespan=lifespan
)

# Cookie session middleware for authentication
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY", "kronos-hardcore-industrial-secret-key-2026-kanpur"),
    session_cookie="kronos_session",
    max_age=86400 * 7,  # 7 days
    same_site="lax",
    https_only=False
)

templates = Jinja2Templates(directory="templates")


# ============================================================
# ROOT & AUTHENTICATION REDIRECTS
# ============================================================

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    user_type = request.session.get("user_type")
    if user_type == "admin":
        return RedirectResponse(url="/admin/dashboard", status_code=status.HTTP_302_FOUND)
    elif user_type == "member":
        return RedirectResponse(url="/dashboard", status_code=status.HTTP_302_FOUND)
    return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)


# ============================================================
# ROLE 2: MEMBER WAR ROOM (`/login` & `/dashboard`)
# ============================================================

@app.get("/login", response_class=HTMLResponse)
async def member_login_page(request: Request, error: str = None, success: str = None):
    # If already logged in, redirect
    if request.session.get("user_type") == "member":
        return RedirectResponse(url="/dashboard", status_code=status.HTTP_302_FOUND)
    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={"session": request.session, "error": error, "success": success}
    )

@app.post("/login", response_class=HTMLResponse)
async def member_login_submit(
    request: Request,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    member = db.query(models.Member).filter(models.Member.username == username.strip()).first()
    if not member or not auth.verify_password(password, member.password_hash):
        return templates.TemplateResponse(
            request=request,
            name="login.html",
            context={
                "session": request.session,
                "error": "ACCESS DENIED: Invalid Athlete ID (Phone) or Password.",
                "username": username
            },
            status_code=status.HTTP_401_UNAUTHORIZED
        )

    # Establish session
    request.session["user_type"] = "member"
    request.session["user_id"] = member.id
    request.session["username"] = member.username
    request.session["full_name"] = member.full_name

    return RedirectResponse(url="/dashboard", status_code=status.HTTP_302_FOUND)


@app.get("/dashboard", response_class=HTMLResponse)
async def member_dashboard(
    request: Request,
    db: Session = Depends(get_db),
    error: str = None,
    success: str = None
):
    if request.session.get("user_type") != "member":
        return RedirectResponse(url="/login?error=Please+login+to+access+War+Room", status_code=status.HTTP_302_FOUND)

    member_id = request.session.get("user_id")
    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    if not member:
        request.session.clear()
        return RedirectResponse(url="/login?error=Athlete+record+not+found", status_code=status.HTTP_302_FOUND)

    # Prepare 7-day workout plans in order
    plans = db.query(models.WorkoutPlan).filter(models.WorkoutPlan.member_id == member.id).all()
    plans_dict = {p.day_of_week: p for p in plans}

    # Determine current day of week (e.g., "Monday", "Tuesday", etc.)
    today_name = datetime.now().strftime("%A")
    today_workout = plans_dict.get(today_name)

    return templates.TemplateResponse(
        request=request,
        name="dashboard.html",
        context={
            "session": request.session,
            "member": member,
            "days_order": DAYS_OF_WEEK,
            "plans_dict": plans_dict,
            "today_name": today_name,
            "today_workout": today_workout,
            "error": error,
            "success": success
        }
    )


@app.get("/logout")
async def member_logout(request: Request):
    request.session.clear()
    return RedirectResponse(url="/login?success=Athlete+logged+out+safely", status_code=status.HTTP_302_FOUND)


# ============================================================
# ROLE 1: GYM OWNER / ADMIN (`/admin`)
# ============================================================

@app.get("/admin", response_class=HTMLResponse)
async def admin_root(request: Request):
    if request.session.get("user_type") == "admin":
        return RedirectResponse(url="/admin/dashboard", status_code=status.HTTP_302_FOUND)
    return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)


@app.get("/admin/login", response_class=HTMLResponse)
async def admin_login_page(request: Request, error: str = None, success: str = None):
    if request.session.get("user_type") == "admin":
        return RedirectResponse(url="/admin/dashboard", status_code=status.HTTP_302_FOUND)
    return templates.TemplateResponse(
        request=request,
        name="admin_login.html",
        context={"session": request.session, "error": error, "success": success}
    )


@app.post("/admin/login", response_class=HTMLResponse)
async def admin_login_submit(
    request: Request,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    admin = db.query(models.Admin).filter(models.Admin.username == username.strip()).first()
    if not admin or not auth.verify_password(password, admin.password_hash):
        return templates.TemplateResponse(
            request=request,
            name="admin_login.html",
            context={
                "session": request.session,
                "error": "COMMAND DENIED: Master credentials invalid.",
                "username": username
            },
            status_code=status.HTTP_401_UNAUTHORIZED
        )

    # Establish admin session
    request.session["user_type"] = "admin"
    request.session["user_id"] = admin.id
    request.session["username"] = admin.username

    return RedirectResponse(url="/admin/dashboard", status_code=status.HTTP_302_FOUND)


@app.get("/admin/dashboard", response_class=HTMLResponse)
async def admin_dashboard(
    request: Request,
    db: Session = Depends(get_db),
    error: str = None,
    success: str = None
):
    if request.session.get("user_type") != "admin":
        return RedirectResponse(url="/admin/login?error=Staff+command+authentication+required", status_code=status.HTTP_302_FOUND)

    members = db.query(models.Member).order_by(models.Member.created_at.desc()).all()
    trainers = {m.trainer_name for m in members if m.trainer_name}

    return templates.TemplateResponse(
        request=request,
        name="admin_dashboard.html",
        context={
            "session": request.session,
            "members": members,
            "active_trainers_count": len(trainers) if trainers else 1,
            "error": error,
            "success": success
        }
    )


@app.post("/admin/members/new")
async def admin_create_member(
    request: Request,
    full_name: str = Form(...),
    username: str = Form(...),
    password: str = Form(...),
    trainer_name: str = Form("Floor Trainer"),
    has_diet_plan: bool = Form(False),
    diet_details: str = Form(None),
    db: Session = Depends(get_db)
):
    if request.session.get("user_type") != "admin":
        return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)

    clean_username = username.strip()
    existing = db.query(models.Member).filter(models.Member.username == clean_username).first()
    if existing:
        return RedirectResponse(
            url=f"/admin/dashboard?error=Athlete+with+Phone+{clean_username}+already+exists!",
            status_code=status.HTTP_302_FOUND
        )

    # Create Member
    new_member = models.Member(
        username=clean_username,
        full_name=full_name.strip(),
        password_hash=auth.hash_password(password.strip()),
        trainer_name=trainer_name.strip(),
        has_diet_plan=has_diet_plan,
        diet_details=diet_details.strip() if (has_diet_plan and diet_details) else None
    )
    db.add(new_member)
    db.commit()
    db.refresh(new_member)

    # Read form data for all 7 days
    form_data = await request.form()
    for day in DAYS_OF_WEEK:
        muscle = form_data.get(f"muscle_{day}", "REST & RECOVERY").strip()
        exercises = form_data.get(f"exercises_{day}", "Rest day protocol.").strip()
        
        db.add(models.WorkoutPlan(
            member_id=new_member.id,
            day_of_week=day,
            muscle_group=muscle,
            exercise_list=exercises
        ))
    
    db.commit()

    return RedirectResponse(
        url=f"/admin/dashboard?success=Athlete+{new_member.full_name}+enrolled+successfully!",
        status_code=status.HTTP_302_FOUND
    )


@app.get("/admin/members/{member_id}/edit", response_class=HTMLResponse)
async def admin_edit_member_page(
    member_id: int,
    request: Request,
    db: Session = Depends(get_db),
    error: str = None,
    success: str = None
):
    if request.session.get("user_type") != "admin":
        return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)

    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    if not member:
        return RedirectResponse(url="/admin/dashboard?error=Athlete+not+found", status_code=status.HTTP_302_FOUND)

    plans = db.query(models.WorkoutPlan).filter(models.WorkoutPlan.member_id == member.id).all()
    plans_dict = {p.day_of_week: p for p in plans}

    return templates.TemplateResponse(
        request=request,
        name="admin_edit_member.html",
        context={
            "session": request.session,
            "member": member,
            "plans_dict": plans_dict,
            "days_order": DAYS_OF_WEEK,
            "error": error,
            "success": success
        }
    )


@app.post("/admin/members/{member_id}/edit")
async def admin_edit_member_submit(
    member_id: int,
    request: Request,
    full_name: str = Form(...),
    username: str = Form(...),
    password: str = Form(None),
    trainer_name: str = Form("Floor Trainer"),
    has_diet_plan: bool = Form(False),
    diet_details: str = Form(None),
    db: Session = Depends(get_db)
):
    if request.session.get("user_type") != "admin":
        return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)

    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    if not member:
        return RedirectResponse(url="/admin/dashboard?error=Athlete+not+found", status_code=status.HTTP_302_FOUND)

    clean_username = username.strip()
    # Check if username changed and conflicts with another member
    if clean_username != member.username:
        clash = db.query(models.Member).filter(models.Member.username == clean_username, models.Member.id != member.id).first()
        if clash:
            return RedirectResponse(
                url=f"/admin/members/{member.id}/edit?error=Phone+{clean_username}+is+already+registered+to+another+member!",
                status_code=status.HTTP_302_FOUND
            )
        member.username = clean_username

    member.full_name = full_name.strip()
    member.trainer_name = trainer_name.strip()
    member.has_diet_plan = has_diet_plan
    member.diet_details = diet_details.strip() if (has_diet_plan and diet_details) else None

    # Update password if entered
    if password and password.strip():
        member.password_hash = auth.hash_password(password.strip())

    # Update 7-day workout plans
    form_data = await request.form()
    existing_plans = {p.day_of_week: p for p in member.workout_plans}

    for day in DAYS_OF_WEEK:
        muscle = form_data.get(f"muscle_{day}", "REST & RECOVERY").strip()
        exercises = form_data.get(f"exercises_{day}", "Rest day.").strip()

        if day in existing_plans:
            existing_plans[day].muscle_group = muscle
            existing_plans[day].exercise_list = exercises
        else:
            db.add(models.WorkoutPlan(
                member_id=member.id,
                day_of_week=day,
                muscle_group=muscle,
                exercise_list=exercises
            ))

    db.commit()

    return RedirectResponse(
        url=f"/admin/dashboard?success=Dossier+for+{member.full_name}+updated+successfully!",
        status_code=status.HTTP_302_FOUND
    )


@app.post("/admin/members/{member_id}/delete")
async def admin_delete_member(
    member_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    if request.session.get("user_type") != "admin":
        return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)

    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    if member:
        name = member.full_name
        db.delete(member)
        db.commit()
        return RedirectResponse(
            url=f"/admin/dashboard?success=Athlete+{name}+erased+from+roster.",
            status_code=status.HTTP_302_FOUND
        )

    return RedirectResponse(url="/admin/dashboard?error=Athlete+not+found", status_code=status.HTTP_302_FOUND)


@app.get("/admin/logout")
async def admin_logout(request: Request):
    request.session.clear()
    return RedirectResponse(url="/admin/login?success=Admin+session+terminated", status_code=status.HTTP_302_FOUND)

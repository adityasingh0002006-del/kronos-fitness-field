export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  target: string;
}

export interface DaySplit {
  day: string;
  target: string;
  focus: string;
  exercises: Exercise[];
  completed?: boolean;
}

export interface Meal {
  mealNumber: number;
  time: string;
  title: string;
  protein: string;
  calories: string;
  items: string[];
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  trainer: string;
  dietStatus: "Active" | "Pending" | "Inactive";
  dietPlanTitle: string;
  dietNotes: string;
  password?: string;
  joinDate: string;
  splits: DaySplit[];
  meals: Meal[];
}

export const INITIAL_SPLITS: DaySplit[] = [
  {
    day: "Monday",
    target: "Chest & Triceps",
    focus: "Hypertrophy & Heavy Pressing",
    exercises: [
      { name: "Barbell Flat Bench Press", sets: "4 sets", reps: "8-10 reps", target: "Pectoralis Major" },
      { name: "Incline Dumbbell Press", sets: "3 sets", reps: "10-12 reps", target: "Upper Chest" },
      { name: "Weighted Chest Dips", sets: "3 sets", reps: "To Failure", target: "Lower Chest / Triceps" },
      { name: "Standing Cable Tricep Pushdown", sets: "4 sets", reps: "12-15 reps", target: "Lateral Tricep Head" },
      { name: "EZ-Bar Skullcrushers", sets: "3 sets", reps: "10-12 reps", target: "Long Tricep Head" },
    ],
  },
  {
    day: "Tuesday",
    target: "Back & Biceps",
    focus: "Lat Width & Posterior Density",
    exercises: [
      { name: "Conventional Deadlifts", sets: "4 sets", reps: "5 reps", target: "Full Posterior Chain" },
      { name: "Heavy Barbell Bent-Over Rows", sets: "4 sets", reps: "8 reps", target: "Mid-Back / Rhomboids" },
      { name: "Wide-Grip Lat Pulldowns", sets: "3 sets", reps: "10-12 reps", target: "Latissimus Dorsi" },
      { name: "Standing Barbell Bicep Curls", sets: "4 sets", reps: "10 reps", target: "Biceps Brachii" },
      { name: "Dumbbell Hammer Curls", sets: "3 sets", reps: "12 reps", target: "Brachialis & Forearms" },
    ],
  },
  {
    day: "Wednesday",
    target: "Legs",
    focus: "Quad Destruction & Hamstring Torque",
    exercises: [
      { name: "Barbell Back Squats", sets: "5 sets", reps: "6-8 reps", target: "Quads & Glutes" },
      { name: "Romanian Deadlifts (RDL)", sets: "4 sets", reps: "8-10 reps", target: "Hamstrings" },
      { name: "Bulgarian Split Squats", sets: "3 sets", reps: "10 reps/leg", target: "Unilateral Leg Strength" },
      { name: "Seated Leg Press (Heavy)", sets: "4 sets", reps: "12 reps", target: "Quad Sweep" },
      { name: "Standing Calf Raises", sets: "4 sets", reps: "15 reps", target: "Gastrocnemius" },
    ],
  },
  {
    day: "Thursday",
    target: "Shoulders & Abs",
    focus: "Deltoid Boulder Caps & Core Shield",
    exercises: [
      { name: "Overhead Military Press", sets: "4 sets", reps: "6-8 reps", target: "Anterior Deltoids" },
      { name: "Dumbbell Lateral Raises", sets: "4 sets", reps: "15 reps", target: "Lateral Deltoids" },
      { name: "Rope Face Pulls", sets: "4 sets", reps: "15 reps", target: "Rear Deltoids & Rotators" },
      { name: "Hanging Leg Raises", sets: "4 sets", reps: "15 reps", target: "Lower Abdominals" },
      { name: "Heavy Ab Wheel Rollouts", sets: "3 sets", reps: "12 reps", target: "Core Stability" },
    ],
  },
  {
    day: "Friday",
    target: "Arms",
    focus: "Mass Overload & Arm Pump Protocol",
    exercises: [
      { name: "Close-Grip Barbell Bench Press", sets: "4 sets", reps: "8 reps", target: "Tricep Power" },
      { name: "Preacher EZ-Bar Curls", sets: "4 sets", reps: "10 reps", target: "Bicep Peak" },
      { name: "Overhead Cable Tricep Extension", sets: "3 sets", reps: "12 reps", target: "Long Tricep Head" },
      { name: "Incline Dumbbell Curl (Strict)", sets: "3 sets", reps: "10 reps", target: "Bicep Stretch" },
      { name: "Wrist Roller / Forearm Curls", sets: "3 sets", reps: "15 reps", target: "Grip & Forearms" },
    ],
  },
  {
    day: "Saturday",
    target: "Conditioning",
    focus: "Metabolic Conditioning & Heavy Carries",
    exercises: [
      { name: "Assault Bike Intervals", sets: "8 rounds", reps: "20s Sprint / 40s Rest", target: "VO2 Max & Lactic Acid" },
      { name: "Prowler Sled Push", sets: "6 rounds", reps: "30 meters", target: "Explosive Drive" },
      { name: "Heavy Battle Ropes", sets: "5 rounds", reps: "45 seconds", target: "Upper Body Endurance" },
      { name: "Farmer's Heavy Trap Bar Walk", sets: "4 rounds", reps: "50 meters", target: "Full Body Armor" },
    ],
  },
  {
    day: "Sunday",
    target: "Rest",
    focus: "Tissue Repair, Sleep & Cold Exposure",
    exercises: [
      { name: "Active Mobility & Hip Flow", sets: "1 session", reps: "20 mins", target: "Joint Lubrication" },
      { name: "Myofascial Foam Rolling", sets: "1 session", reps: "15 mins", target: "Muscle Adhesions" },
      { name: "Electrolyte Hydration Protocol", sets: "4 Liters", reps: "Daily", target: "Cellular Recovery" },
      { name: "Cold Shower / Contrast Bath", sets: "3 cycles", reps: "3 mins cold", target: "Systemic Inflammation" },
    ],
  },
];

export const INITIAL_MEALS: Meal[] = [
  {
    mealNumber: 1,
    time: "07:00 AM",
    title: "Dawn Deployment // High-Protein Breakfast",
    protein: "42g",
    calories: "580 kcal",
    items: [
      "6 Whole Boiled Farm Eggs (or 250g scrambled Tofu/Paneer)",
      "80g Rolled Oats cooked in Almond Milk with Chia Seeds",
      "Handful of Raw Almonds & 1 Sliced Banana",
    ],
  },
  {
    mealNumber: 2,
    time: "12:30 PM",
    title: "Midday Fuel // Hypertrophy Matrix",
    protein: "55g",
    calories: "720 kcal",
    items: [
      "250g Chargrilled Chicken Breast (or 250g Pan-seared Fresh Paneer)",
      "150g Steamed Brown Basmati Rice",
      "Steamed Broccoli, Spinach & Green Beans with Cold-pressed Olive Oil",
    ],
  },
  {
    mealNumber: 3,
    time: "05:00 PM",
    title: "Pre-Battle Protocol // Workout Primer",
    protein: "28g",
    calories: "310 kcal",
    items: [
      "1 Scoop 100% Whey Protein Isolate with Cold Water",
      "1 Crisp Green Apple or 2 Medjool Dates",
      "1 Cup Strong Black Coffee / Espresso Shot (Pre-lift stimulant)",
    ],
  },
  {
    mealNumber: 4,
    time: "08:30 PM",
    title: "Night Recovery // Cellular Synthesis",
    protein: "48g",
    calories: "590 kcal",
    items: [
      "200g Grilled Chicken Breast / Tofu / Fish Fillet",
      "150g Baked Sweet Potato Mash with Cinnamon",
      "Mixed Green Salad with Cucumbers, Lemon Juice & Himalayan Pink Salt",
    ],
  },
];

export const DEMO_MEMBERS: Member[] = [
  {
    id: "9580650262",
    name: "Alex Mercer",
    phone: "9580650262",
    trainer: "Coach Vikram",
    dietStatus: "Active",
    dietPlanTitle: "High-Protein Hypertrophy Protocol (180g Protein / 2200 kcal)",
    dietNotes: "Zero processed sugars. Hydrate with minimum 4L mineralized water daily. Creatine 5g post-workout.",
    password: "iron123",
    joinDate: "2024-01-15",
    splits: INITIAL_SPLITS,
    meals: INITIAL_MEALS,
  },
  {
    id: "9876543210",
    name: "Rohan Sharma",
    phone: "9876543210",
    trainer: "Coach Vikram",
    dietStatus: "Active",
    dietPlanTitle: "Powerlifting Strength Baseline (200g Protein / 2600 kcal)",
    dietNotes: "Focus on caloric surplus on Heavy Squat and Deadlift days. Supplement with Omega-3 and Zinc.",
    password: "iron123",
    joinDate: "2024-02-01",
    splits: INITIAL_SPLITS,
    meals: INITIAL_MEALS,
  },
  {
    id: "9123456789",
    name: "Kabir Singh",
    phone: "9123456789",
    trainer: "Coach Rakesh",
    dietStatus: "Pending",
    dietPlanTitle: "Athletic Lean Cut Protocol",
    dietNotes: "Awaiting body composition and caliper measurements for macro recalibration.",
    password: "iron123",
    joinDate: "2024-03-10",
    splits: INITIAL_SPLITS,
    meals: INITIAL_MEALS,
  },
];

const STORAGE_KEY = "kronos_members_data";

export function getMembers(): Member[] {
  if (typeof window === "undefined") return DEMO_MEMBERS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_MEMBERS));
      return DEMO_MEMBERS;
    }
    return JSON.parse(data);
  } catch {
    return DEMO_MEMBERS;
  }
}

export function saveMembers(members: Member[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (e) {
    console.error("Failed to save members to localStorage", e);
  }
}

export function getMemberByPhone(phone: string): Member | undefined {
  const members = getMembers();
  return members.find((m) => m.phone === phone.trim());
}

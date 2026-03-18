export interface Question {
  id: string;
  question: string;
  options: string[];
  /** Zero-based index of the correct option */
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: "Math" | "Science";
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  questions: Question[];
}

// ---------------------------------------------------------------------------
// Quiz catalogue
// ---------------------------------------------------------------------------

export const quizzes: Quiz[] = [
  // ── Math ─────────────────────────────────────────────────────────────────
  {
    id: "math-algebra-1",
    title: "Algebra Basics",
    subject: "Math",
    difficulty: "Easy",
    description:
      "Fundamental concepts of algebra including variables, expressions, and equations.",
    questions: [
      {
        id: "ma1-q1",
        question: "Solve for x: 2x + 4 = 12",
        options: ["x = 2", "x = 4", "x = 6", "x = 8"],
        correctIndex: 1,
        explanation: "Subtract 4 from both sides → 2x = 8, then divide by 2 → x = 4.",
      },
      {
        id: "ma1-q2",
        question: "Which expression is equivalent to 3(x + 2)?",
        options: ["3x + 2", "3x + 6", "3x + 5", "x + 6"],
        correctIndex: 1,
        explanation: "Distribute: 3 × x + 3 × 2 = 3x + 6.",
      },
      {
        id: "ma1-q3",
        question: "Solve for y: y − 7 = 15",
        options: ["y = 8", "y = 18", "y = 22", "y = 105"],
        correctIndex: 2,
        explanation: "Add 7 to both sides → y = 15 + 7 = 22.",
      },
      {
        id: "ma1-q4",
        question: "Simplify: 5x + 3x − 2",
        options: ["8x − 2", "8x + 2", "6x", "8 − 2x"],
        correctIndex: 0,
        explanation: "Combine like terms: (5 + 3)x − 2 = 8x − 2.",
      },
      {
        id: "ma1-q5",
        question: "If a = 3 and b = 4, what is 2a + b?",
        options: ["10", "11", "14", "24"],
        correctIndex: 0,
        explanation: "2(3) + 4 = 6 + 4 = 10.",
      },
    ],
  },
  {
    id: "math-geometry-1",
    title: "Geometry Essentials",
    subject: "Math",
    difficulty: "Medium",
    description:
      "Shapes, angles, area, and perimeter — the building blocks of geometry.",
    questions: [
      {
        id: "mg1-q1",
        question: "What is the area of a rectangle with length 8 and width 5?",
        options: ["13", "26", "40", "80"],
        correctIndex: 2,
        explanation: "Area = length × width = 8 × 5 = 40.",
      },
      {
        id: "mg1-q2",
        question: "How many degrees are in a right angle?",
        options: ["45°", "90°", "180°", "360°"],
        correctIndex: 1,
        explanation: "A right angle is exactly 90°.",
      },
      {
        id: "mg1-q3",
        question: "What is the perimeter of a square with side length 6?",
        options: ["12", "18", "24", "36"],
        correctIndex: 2,
        explanation: "Perimeter = 4 × side = 4 × 6 = 24.",
      },
      {
        id: "mg1-q4",
        question: "The sum of the interior angles in any triangle equals:",
        options: ["90°", "180°", "270°", "360°"],
        correctIndex: 1,
        explanation: "The angles of every triangle sum to exactly 180°.",
      },
      {
        id: "mg1-q5",
        question: "What is the area of a triangle with base 10 and height 6?",
        options: ["30", "60", "16", "20"],
        correctIndex: 0,
        explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30.",
      },
    ],
  },

  // ── Science ──────────────────────────────────────────────────────────────
  {
    id: "science-biology-1",
    title: "Biology Fundamentals",
    subject: "Science",
    difficulty: "Easy",
    description:
      "Core concepts in biology including cells, photosynthesis, and basic genetics.",
    questions: [
      {
        id: "sb1-q1",
        question: "What is known as the 'powerhouse of the cell'?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Vacuole"],
        correctIndex: 2,
        explanation:
          "Mitochondria produce ATP through cellular respiration, providing energy for the cell.",
      },
      {
        id: "sb1-q2",
        question: "Photosynthesis produces which two main outputs?",
        options: [
          "CO₂ and water",
          "Oxygen and glucose",
          "Nitrogen and starch",
          "ATP and ADP",
        ],
        correctIndex: 1,
        explanation:
          "6CO₂ + 6H₂O + light → C₆H₁₂O₆ (glucose) + 6O₂.",
      },
      {
        id: "sb1-q3",
        question: "DNA stands for:",
        options: [
          "Deoxyribonucleic Acid",
          "Dextrose Nucleic Acid",
          "Dual Nucleic Arrangement",
          "Direct Nucleotide Acid",
        ],
        correctIndex: 0,
        explanation: "DNA = Deoxyribonucleic Acid, the molecule that carries genetic information.",
      },
      {
        id: "sb1-q4",
        question: "Which organ is responsible for pumping blood through the body?",
        options: ["Brain", "Kidney", "Lung", "Heart"],
        correctIndex: 3,
        explanation: "The heart is a muscular organ that circulates blood through the cardiovascular system.",
      },
      {
        id: "sb1-q5",
        question: "Organisms that produce their own food via photosynthesis are called:",
        options: ["Consumers", "Decomposers", "Producers", "Scavengers"],
        correctIndex: 2,
        explanation: "Producers (autotrophs) synthesise their own food; consumers rely on others.",
      },
    ],
  },
  {
    id: "science-physics-1",
    title: "Physics Principles",
    subject: "Science",
    difficulty: "Medium",
    description:
      "Forces, motion, and energy — the fundamental laws that govern the physical world.",
    questions: [
      {
        id: "sp1-q1",
        question: "Newton's First Law of Motion states that:",
        options: [
          "An object at rest stays at rest unless acted upon by a net force",
          "Force equals mass times acceleration",
          "For every action there is an equal and opposite reaction",
          "Energy cannot be created or destroyed",
        ],
        correctIndex: 0,
        explanation: "Newton's First Law is the Law of Inertia: objects resist changes in their state of motion.",
      },
      {
        id: "sp1-q2",
        question: "The SI unit of force is:",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        correctIndex: 2,
        explanation: "Force is measured in Newtons (N). 1 N = 1 kg·m/s².",
      },
      {
        id: "sp1-q3",
        question: "Approximately how fast does light travel in a vacuum?",
        options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "299 km/s"],
        correctIndex: 0,
        explanation: "The speed of light in a vacuum is approximately 299,792 km/s, commonly rounded to 300,000 km/s.",
      },
      {
        id: "sp1-q4",
        question: "Which formula represents kinetic energy?",
        options: ["E = mc²", "KE = ½mv²", "F = ma", "p = mv"],
        correctIndex: 1,
        explanation: "Kinetic energy KE = ½mv², where m is mass (kg) and v is velocity (m/s).",
      },
      {
        id: "sp1-q5",
        question: "The SI unit of energy is:",
        options: ["Watt", "Newton", "Joule", "Pascal"],
        correctIndex: 2,
        explanation: "Energy is measured in Joules (J). 1 J = 1 N·m = 1 kg·m²/s².",
      },
    ],
  },
];

/** Look up a quiz by id.  Returns undefined if not found. */
export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

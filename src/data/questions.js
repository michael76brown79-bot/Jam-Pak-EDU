const questions = [
  {
    id: "q1",
    gradeBand: "3-4",
    subject: "Math",
    category: "Addition",
    difficulty: "easy",
    prompt: "What is 7 + 5?",
    options: [
      { id: "a", text: "11" },
      { id: "b", text: "12" },
      { id: "c", text: "13" },
      { id: "d", text: "10" }
    ],
    correctOptionId: "b",
    explanation: "7 plus 5 equals 12."
  },
  {
    id: "q2",
    gradeBand: "3-4",
    subject: "Math",
    category: "Subtraction",
    difficulty: "easy",
    prompt: "What is 15 - 7?",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "7" },
      { id: "c", text: "9" },
      { id: "d", text: "6" }
    ],
    correctOptionId: "a",
    explanation: "15 minus 7 equals 8."
  },
  {
    id: "q3",
    gradeBand: "7-9",
    subject: "Geography",
    category: "Jamaica",
    difficulty: "medium",
    prompt: "What is the capital city of Jamaica?",
    options: [
      { id: "a", text: "Montego Bay" },
      { id: "b", text: "Spanish Town" },
      { id: "c", text: "Kingston" },
      { id: "d", text: "Mandeville" }
    ],
    correctOptionId: "c",
    explanation: "Kingston is the capital and largest city of Jamaica."
  },
  {
    id: "pilot-g5-en-001",
    gradeBand: "5",
    subject: "English",
    category: "English Language",
    difficulty: "easy",
    type: "mcq",
    prompt: "Choose the verb that completes the sentence: The basket of mangoes ___ on the table.",
    options: [
      { id: "a", text: "are" },
      { id: "b", text: "is" },
      { id: "c", text: "were" },
      { id: "d", text: "have" }
    ],
    correctOptionId: "b",
    explanation: "The main subject is the singular noun 'basket', so the verb is 'is'."
  },
  {
    id: "pilot-g5-en-002",
    gradeBand: "5",
    subject: "English",
    category: "English Language",
    difficulty: "easy",
    type: "mcq",
    prompt: "The prefix 're-' usually means 'again'. What does 'reread' mean?",
    options: [
      { id: "a", text: "Read again" },
      { id: "b", text: "Read aloud" },
      { id: "c", text: "Read quickly" },
      { id: "d", text: "Stop reading" }
    ],
    correctOptionId: "a",
    explanation: "Adding 're-' to 'read' means to read again."
  },
  {
    id: "pilot-g5-en-003",
    gradeBand: "5",
    subject: "English",
    category: "English Language",
    difficulty: "easy",
    type: "mcq",
    prompt: "Which sentence uses commas correctly in a list?",
    options: [
      { id: "a", text: "We packed pencils books, and rulers." },
      { id: "b", text: "We packed, pencils, books and rulers." },
      { id: "c", text: "We packed pencils, books, and rulers." },
      { id: "d", text: "We packed pencils books and, rulers." }
    ],
    correctOptionId: "c",
    explanation: "Commas separate the items in a list: pencils, books, and rulers."
  },
  {
    id: "pilot-g5-en-004",
    gradeBand: "5",
    subject: "English",
    category: "English Language",
    difficulty: "medium",
    type: "mcq",
    prompt: "Read the passage: The school garden was dry after two weeks without rain. On Friday, the class watered the plants. By Monday, new leaves had appeared. What most likely helped the plants?",
    options: [
      { id: "a", text: "The class watered them." },
      { id: "b", text: "The class picked the leaves." },
      { id: "c", text: "The garden became drier." },
      { id: "d", text: "The class moved the garden." }
    ],
    correctOptionId: "a",
    explanation: "The passage says the class watered the plants before new leaves appeared."
  },
  {
    id: "pilot-g5-en-005",
    gradeBand: "5",
    subject: "English",
    category: "English Language",
    difficulty: "easy",
    type: "mcq",
    prompt: "Which word is the adjective in this sentence: The bright kite soared above the field.",
    options: [
      { id: "a", text: "soared" },
      { id: "b", text: "above" },
      { id: "c", text: "bright" },
      { id: "d", text: "field" }
    ],
    correctOptionId: "c",
    explanation: "'Bright' describes the kite, so it is the adjective."
  },
  {
    id: "pilot-g6-en-001",
    gradeBand: "6",
    subject: "English",
    category: "English Language",
    difficulty: "medium",
    type: "mcq",
    prompt: "Choose the correct word: The ___ nests were high in the trees.",
    options: [
      { id: "a", text: "birds" },
      { id: "b", text: "bird's" },
      { id: "c", text: "birds'" },
      { id: "d", text: "birdes" }
    ],
    correctOptionId: "c",
    explanation: "'Birds'' shows that the nests belong to more than one bird."
  },
  {
    id: "pilot-g6-en-002",
    gradeBand: "6",
    subject: "English",
    category: "English Language",
    difficulty: "easy",
    type: "mcq",
    prompt: "Choose the correct word: ___ going to visit the library after school.",
    options: [
      { id: "a", text: "Their" },
      { id: "b", text: "There" },
      { id: "c", text: "They're" },
      { id: "d", text: "Theirs" }
    ],
    correctOptionId: "c",
    explanation: "'They're' means 'they are', which fits before 'going'."
  },
  {
    id: "pilot-g6-en-003",
    gradeBand: "6",
    subject: "English",
    category: "English Language",
    difficulty: "medium",
    type: "mcq",
    prompt: "Which sentence is a compound sentence?",
    options: [
      { id: "a", text: "Although the rain stopped." },
      { id: "b", text: "The rain stopped, and the players returned to the field." },
      { id: "c", text: "The wet field near the school." },
      { id: "d", text: "Running quickly through the gate." }
    ],
    correctOptionId: "b",
    explanation: "It joins two complete thoughts with the conjunction 'and'."
  },
  {
    id: "pilot-g6-en-004",
    gradeBand: "6",
    subject: "English",
    category: "English Language",
    difficulty: "medium",
    type: "mcq",
    prompt: "Read the passage: When the final bell rang, Nia zipped her bag and hurried to the bus stop. She checked the time twice. What can you infer?",
    options: [
      { id: "a", text: "Nia wanted to catch her bus on time." },
      { id: "b", text: "Nia had forgotten where she lived." },
      { id: "c", text: "Nia planned to stay at school all night." },
      { id: "d", text: "Nia did not know how to read a clock." }
    ],
    correctOptionId: "a",
    explanation: "Hurrying and checking the time suggest Nia is trying not to miss the bus."
  },
  {
    id: "pilot-g6-en-005",
    gradeBand: "6",
    subject: "English",
    category: "English Language",
    difficulty: "medium",
    type: "mcq",
    prompt: "Read the passage: Mangroves grow along coastlines. Their tangled roots provide shelter for young sea animals and help hold soil in place. What is the main idea?",
    options: [
      { id: "a", text: "Mangroves are useful to coastal environments." },
      { id: "b", text: "All sea animals live in trees." },
      { id: "c", text: "Coastlines have no soil." },
      { id: "d", text: "Mangroves grow only in school gardens." }
    ],
    correctOptionId: "a",
    explanation: "Both details describe ways mangroves help coastal environments."
  }
];

module.exports = { questions };

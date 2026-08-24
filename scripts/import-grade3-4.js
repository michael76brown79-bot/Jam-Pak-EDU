/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

const qSA = (id, subject, category, prompt, correctAnswer) => ({
  id,
  gradeBand: "3-4",
  subject,
  category,
  type: "short_answer",
  difficulty: "easy",
  prompt,
  correctAnswer
});

const qTF = (id, subject, category, prompt, correctBoolean) => ({
  id,
  gradeBand: "3-4",
  subject,
  category,
  type: "true_false",
  difficulty: "easy",
  prompt,
  correctBoolean
});

const qMC = (id, subject, category, prompt, choices, correctChoice) => ({
  id,
  gradeBand: "3-4",
  subject,
  category,
  type: "multiple_choice",
  difficulty: "easy",
  prompt,
  choices,
  correctChoice
});

const questions = [
  // Math
  qSA("g3_4_math_001", "Mathematics", "Math", "What is the place value of the digit 5 in the number 3,524?", "Hundreds"),
  qSA("g3_4_math_002", "Mathematics", "Math", "Calculate: 145 + 238.", "383"),
  qSA("g3_4_math_003", "Mathematics", "Math", "What is 60 multiplied by 5?", "300"),
  qTF("g3_4_math_004", "Mathematics", "Math", "24 divided by 4 is equal to 6.", true),
  qSA("g3_4_math_005", "Mathematics", "Math", "Reduce the fraction 4/8 to its simplest form.", "1/2"),
  qSA("g3_4_math_006", "Mathematics", "Math", "What is the value of the Roman numeral 'X'?", "10"),
  qSA("g3_4_math_007", "Mathematics", "Math", "What do you call a shape with five straight sides?", "Pentagon"),
  qTF("g3_4_math_008", "Mathematics", "Math", "An obtuse angle is smaller than a 90-degree right angle.", false),
  qSA("g3_4_math_009", "Mathematics", "Math", "If a notebook costs $150, how much will 3 notebooks cost?", "$450"),
  qSA("g3_4_math_010", "Mathematics", "Math", "Find the perimeter of a square if each side is 6 cm long.", "24 cm"),
  qSA("g3_4_math_011", "Mathematics", "Math", "What number is 100 more than 1,850?", "1,950"),
  qTF("g3_4_math_012", "Mathematics", "Math", "The number 42 is an even number.", true),
  qSA("g3_4_math_013", "Mathematics", "Math", "Round the number 87 to the nearest ten.", "90"),
  qSA("g3_4_math_014", "Mathematics", "Math", "What is 1/2 of 50?", "25"),
  qSA("g3_4_math_015", "Mathematics", "Math", "Fill in the blank: 12, 24, 36, 48, ____.", "60"),
  qSA("g3_4_math_016", "Mathematics", "Math", "Subtract 75 from 200.", "125"),
  qTF("g3_4_math_017", "Mathematics", "Math", "A line that goes straight up and down is called a horizontal line.", false),
  qSA("g3_4_math_018", "Mathematics", "Math", "How many centimeters make up 1 meter?", "100 cm"),
  qSA("g3_4_math_019", "Mathematics", "Math", "If you go to bed at 8:30 PM and wake up at 6:30 AM, how many hours did you sleep?", "10 hours"),
  qSA("g3_4_math_020", "Mathematics", "Math", "What is the product of 9 and 7?", "63"),

  // Grammar
  qSA("g3_4_gram_001", "English", "Grammar", "Identify the proper noun in this sentence: \"We went to Hope Gardens on Sunday.\"", "Hope Gardens"),
  qSA("g3_4_gram_002", "English", "Grammar", "What is the plural form of the noun \"child\"?", "children"),
  qSA("g3_4_gram_003", "English", "Grammar", "Choose the adjective in this sentence: \"The sweet mango fell from the tall tree.\"", "sweet"),
  qTF("g3_4_gram_004", "English", "Grammar", "The past tense of the verb \"bring\" is \"brought\".", true),
  qMC("g3_4_gram_005", "English", "Grammar", "Fill in the blank with the correct pronoun: \"Mark and ____ are going to play football.\"",
    [
      { key: "A", text: "me" },
      { key: "B", text: "I" },
      { key: "C", text: "us" },
      { key: "D", text: "him" }
    ],
    "B"
  ),
  qSA("g3_4_gram_006", "English", "Grammar", "What punctuation mark is used to show ownership, as in \"the boy's hat\"?", "Apostrophe"),
  qSA("g3_4_gram_007", "English", "Grammar", "Identify the verb in this sentence: \"The energetic dog barked at the mailman.\"", "barked"),
  qTF("g3_4_gram_008", "English", "Grammar", "A conjunction is a word used to connect words, phrases, or clauses.", true),
  qSA("g3_4_gram_009", "English", "Grammar", "What is the antonym (opposite) of the word \"ancient\"?", "modern"),
  qSA("g3_4_gram_010", "English", "Grammar", "Fill in the blank with the correct article: \"I saw ____ owl sitting on the roof.\"", "an"),
  qMC("g3_4_gram_011", "English", "Grammar", "Which of these words is a synonym for \"assist\"?",
    [
      { key: "A", text: "Hinder" },
      { key: "B", text: "Help" },
      { key: "C", text: "Ignore" },
      { key: "D", text: "Walk" }
    ],
    "B"
  ),
  qTF("g3_4_gram_012", "English", "Grammar", "The word \"quickly\" is an adverb.", true),
  qSA("g3_4_gram_013", "English", "Grammar", "Identify the preposition in this sentence: \"The cat slept under the table.\"", "under"),
  qSA("g3_4_gram_014", "English", "Grammar", "What type of sentence asks a question?", "Interrogative sentence"),
  qSA("g3_4_gram_015", "English", "Grammar", "What is the plural form of the word \"wolf\"?", "wolves"),
  qTF("g3_4_gram_016", "English", "Grammar", "Capital letters must be used for the names of months and days of the week.", true),
  qMC("g3_4_gram_017", "English", "Grammar", "Choose the correct compound word:",
    [
      { key: "A", text: "Homework" },
      { key: "B", text: "Homely" },
      { key: "C", text: "Houseful" },
      { key: "D", text: "Homebase" }
    ],
    "A"
  ),
  qMC("g3_4_gram_018", "English", "Grammar", "Fill in the blank: \"They ____ watching a cricket match right now.\"",
    [
      { key: "A", text: "is" },
      { key: "B", text: "am" },
      { key: "C", text: "are" },
      { key: "D", text: "was" }
    ],
    "C"
  ),
  qSA("g3_4_gram_019", "English", "Grammar", "What is the prefix in the word \"unhappy\"?", "un"),
  qTF("g3_4_gram_020", "English", "Grammar", "The words \"there\", \"their\", and \"they're\" are homophones because they sound the same but have different meanings.", true),

  // Science
  qSA("g3_4_sci_001", "Science", "Science", "What process turns liquid water into a gas called water vapor?", "Evaporation"),
  qSA("g3_4_sci_002", "Science", "Science", "Which part of a plant uses sunlight to make food?", "The leaf"),
  qTF("g3_4_sci_003", "Science", "Science", "Sound travels through a solid faster than it travels through air.", true),
  qSA("g3_4_sci_004", "Science", "Science", "What do you call an animal that eats only plants?", "Herbivore"),
  qSA("g3_4_sci_005", "Science", "Science", "Name the three states of matter.", "Solid, liquid, and gas"),
  qSA("g3_4_sci_006", "Science", "Science", "Which organ system is responsible for breaking down the food we eat?", "Digestive system"),
  qTF("g3_4_sci_007", "Science", "Science", "The moon produces its own light.", false),
  qSA("g3_4_sci_008", "Science", "Science", "What force pulls all objects down toward the ground?", "Gravity"),
  qSA("g3_4_sci_009", "Science", "Science", "What is the name of the process where a seed begins to sprout and grow into a new plant?", "Germination"),
  qSA("g3_4_sci_010", "Science", "Science", "Which temperature scale is commonly used in Jamaica to measure weather temperatures?", "Celsius"),
  qTF("g3_4_sci_011", "Science", "Science", "An insect has eight legs.", false),
  qSA("g3_4_sci_012", "Science", "Science", "What material allows electricity to flow through it easily?", "Conductor"),
  qSA("g3_4_sci_013", "Science", "Science", "What do we call a habitat that is extremely dry and receives very little rainfall?", "Desert"),
  qTF("g3_4_sci_014", "Science", "Science", "A shadow is made when light is blocked by an opaque object.", true),
  qSA("g3_4_sci_015", "Science", "Science", "What vital gas do humans and animals breathe in to stay alive?", "Oxygen"),
  qSA("g3_4_sci_016", "Science", "Science", "Which sensory organ allows us to hear sounds?", "Ears"),
  qSA("g3_4_sci_017", "Science", "Science", "Fill in the blank: Ice turns back into liquid water through the process of ________.", "melting"),
  qTF("g3_4_sci_018", "Science", "Science", "Earth spins on its axis once every 24 hours, causing day and night.", true),
  qSA("g3_4_sci_019", "Science", "Science", "What do we call the green pigment in leaves that absorbs energy from sunlight?", "Chlorophyll"),
  qSA("g3_4_sci_020", "Science", "Science", "What instrument is used to measure temperature?", "Thermometer"),

  // Social Studies
  qSA("g3_4_soc_001", "Social Studies", "Social Studies", "How many counties is Jamaica divided into?", "3"),
  qSA("g3_4_soc_002", "Social Studies", "Social Studies", "Name the county located on the eastern side of Jamaica.", "Surrey"),
  qTF("g3_4_soc_003", "Social Studies", "Social Studies", "The Head of State in Jamaica is the Prime Minister.", false),
  qSA("g3_4_soc_004", "Social Studies", "Social Studies", "What type of family structure features a mother, a father, and their children living together?", "Nuclear family"),
  qSA("g3_4_soc_005", "Social Studies", "Social Studies", "What are the specific rules made by the government that all citizens must follow called?", "Laws"),
  qSA("g3_4_soc_006", "Social Studies", "Social Studies", "In which parish can you visit Dunns River Falls?", "St. Ann"),
  qTF("g3_4_soc_007", "Social Studies", "Social Studies", "CARICOM stands for the Caribbean Community.", true),
  qSA("g3_4_soc_008", "Social Studies", "Social Studies", "What color represents the sunshine and natural wealth on the Jamaican flag?", "Gold"),
  qSA("g3_4_soc_009", "Social Studies", "Social Studies", "What do we call the bad situation when the air, water, or land becomes dirty and unsafe?", "Pollution"),
  qSA("g3_4_soc_010", "Social Studies", "Social Studies", "Fill in the blank: The capital town of the parish of Westmoreland is ________.", "Savanna-la-Mar"),
  qSA("g3_4_soc_011", "Social Studies", "Social Studies", "Which local government group is responsible for cleaning up community spaces and maintaining parish roads?", "Parish Council"),
  qTF("g3_4_soc_012", "Social Studies", "Social Studies", "Jamaica is located in the Pacific Ocean.", false),
  qSA("g3_4_soc_013", "Social Studies", "Social Studies", "What is the name of Jamaica's currency?", "Jamaican Dollar"),
  qSA("g3_4_soc_014", "Social Studies", "Social Studies", "What do we call a person who buys and uses goods and services?", "Consumer"),
  qSA("g3_4_soc_015", "Social Studies", "Social Studies", "Which parish is the smallest in size on the island?", "Kingston"),
  qTF("g3_4_soc_016", "Social Studies", "Social Studies", "Port Antonio is the capital town of Portland.", true),
  qSA("g3_4_soc_017", "Social Studies", "Social Studies", "What is the name of the ocean current and wind system that brings heavy tropical rain storms to Jamaica between June and November?", "Hurricane season"),
  qSA("g3_4_soc_018", "Social Studies", "Social Studies", "Name one major export product that Jamaica sells to other countries.", "Bauxite"),
  qTF("g3_4_soc_019", "Social Studies", "Social Studies", "Voting in general elections in Jamaica is open to all citizens who are 18 years of age or older.", true),
  qSA("g3_4_soc_020", "Social Studies", "Social Studies", "What do we call the movement of people from their home country to live permanently in another country?", "Emigration"),

  // Jamaican History
  qSA("g3_4_hist_001", "Social Studies", "Jamaican History", "Who were the peaceful indigenous people living in Jamaica when Christopher Columbus arrived?", "Tainos"),
  qSA("g3_4_hist_002", "Social Studies", "Jamaican History", "In what year did Christopher Columbus first arrive in Jamaica?", "1494"),
  qTF("g3_4_hist_003", "Social Studies", "Jamaican History", "The Tainos called the island \"Xaymaca\", which means \"Land of Wood and Water\".", true),
  qSA("g3_4_hist_004", "Social Studies", "Jamaican History", "What group of runaway slaves lived in the mountains and fought bravely against British rule?", "The Maroons"),
  qSA("g3_4_hist_005", "Social Studies", "Jamaican History", "Name the great female Maroon leader who is Jamaica's only National Heroine.", "Nanny of the Maroons"),
  qSA("g3_4_hist_006", "Social Studies", "Jamaican History", "In what year did Jamaica gain its complete political independence from Great Britain?", "1962"),
  qTF("g3_4_hist_007", "Social Studies", "Jamaican History", "Full freedom (Emancipation) from slavery was celebrated in Jamaica on August 1, 1838.", true),
  qSA("g3_4_hist_008", "Social Studies", "Jamaican History", "Who was the Baptist deacon that led the tragic Morant Bay Rebellion in 1865?", "Paul Bogle"),
  qSA("g3_4_hist_009", "Social Studies", "Jamaican History", "Who was Jamaica's very first Prime Minister after Independence?", "Sir Alexander Bustamante"),
  qSA("g3_4_hist_010", "Social Studies", "Jamaican History", "Name the National Hero who was a wealthy businessman and fought alongside Paul Bogle for civil rights.", "George William Gordon"),
  qTF("g3_4_hist_011", "Social Studies", "Jamaican History", "The Spanish ruled Jamaica for over 300 years before the British captured it.", false),
  qSA("g3_4_hist_012", "Social Studies", "Jamaican History", "What was the name of the main crop grown on large Jamaican plantations during slavery?", "Sugar cane"),
  qSA("g3_4_hist_013", "Social Studies", "Jamaican History", "Which National Hero founded the Universal Negro Improvement Association (UNIA) and promoted black pride?", "Marcus Garvey"),
  qTF("g3_4_hist_014", "Social Studies", "Jamaican History", "Port Royal was known in the 17th century as a famous pirate city before it was destroyed by an earthquake.", true),
  qSA("g3_4_hist_015", "Social Studies", "Jamaican History", "In what year did a massive, destructive earthquake sink a large part of Port Royal?", "1692"),
  qSA("g3_4_hist_016", "Social Studies", "Jamaican History", "Who was the National Hero that founded the People's National Party (PNP) and was a premier of Jamaica?", "Norman Washington Manley"),
  qTF("g3_4_hist_017", "Social Studies", "Jamaican History", "The British captured Jamaica from the Spanish in the year 1655.", true),
  qSA("g3_4_hist_018", "Social Studies", "Jamaican History", "What item did the Maroons use to blow into to send coded warning signals across the hills?", "Abeng"),
  qSA("g3_4_hist_019", "Social Studies", "Jamaican History", "Name the slave leader who led the massive 1831 Christmas Rebellion (Baptist War).", "Sam Sharpe"),
  qTF("g3_4_hist_020", "Social Studies", "Jamaican History", "Sir Alexander Bustamante founded the Jamaica Labour Party (JLP).", true)
];

async function run() {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questions })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Import failed:", data);
    process.exit(1);
  }

  console.log(`Imported ${questions.length} questions.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
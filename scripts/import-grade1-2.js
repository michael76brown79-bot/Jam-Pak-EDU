/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

const qSA = (id, subject, category, prompt, correctAnswer) => ({
  id,
  gradeBand: "1-2",
  subject,
  category,
  type: "short_answer",
  difficulty: "easy",
  prompt,
  correctAnswer
});

const qTF = (id, subject, category, prompt, correctBoolean) => ({
  id,
  gradeBand: "1-2",
  subject,
  category,
  type: "true_false",
  difficulty: "easy",
  prompt,
  correctBoolean
});

const qMC = (id, subject, category, prompt, choices, correctChoice) => ({
  id,
  gradeBand: "1-2",
  subject,
  category,
  type: "multiple_choice",
  difficulty: "easy",
  prompt,
  choices,
  correctChoice
});

const questions = [
  // Basic Math
  qSA("g1_2_math_001", "Mathematics", "Basic Math", "What is 5 + 3?", "8"),
  qSA("g1_2_math_002", "Mathematics", "Basic Math", "What is 10 - 4?", "6"),
  qSA("g1_2_math_003", "Mathematics", "Basic Math", "Count the total: 3 apples plus 4 apples equals how many apples?", "7"),
  qTF("g1_2_math_004", "Mathematics", "Basic Math", "6 is greater than 9.", false),
  qSA("g1_2_math_005", "Mathematics", "Basic Math", "What number comes right after 19?", "20"),
  qSA("g1_2_math_006", "Mathematics", "Basic Math", "What number comes right before 15?", "14"),
  qSA("g1_2_math_007", "Mathematics", "Basic Math", "Fill in the blank: 2, 4, 6, 8, ____.", "10"),
  qTF("g1_2_math_008", "Mathematics", "Basic Math", "A square has 4 equal sides.", true),
  qSA("g1_2_math_009", "Mathematics", "Basic Math", "If you have 5 mangoes and eat 2, how many are left?", "3"),
  qSA("g1_2_math_010", "Mathematics", "Basic Math", "What shape looks like a round clock?", "Circle"),
  qSA("g1_2_math_011", "Mathematics", "Basic Math", "What is 0 + 12?", "12"),
  qTF("g1_2_math_012", "Mathematics", "Basic Math", "A triangle has 5 corners.", false),
  qSA("g1_2_math_013", "Mathematics", "Basic Math", "What is double the number 4?", "8"),
  qSA("g1_2_math_014", "Mathematics", "Basic Math", "Fill in the blank: 5, 10, 15, ____, 25.", "20"),
  qSA("g1_2_math_015", "Mathematics", "Basic Math", "Which number is smaller: 12 or 21?", "12"),
  qSA("g1_2_math_016", "Mathematics", "Basic Math", "What is 9 minus 9?", "0"),
  qSA("g1_2_math_017", "Mathematics", "Basic Math", "If a box has 6 sweets and you add 6 more, how many sweets are there?", "12"),
  qTF("g1_2_math_018", "Mathematics", "Basic Math", "15 is an odd number.", true),
  qSA("g1_2_math_019", "Mathematics", "Basic Math", "How many days are in one week?", "7"),
  qSA("g1_2_math_020", "Mathematics", "Basic Math", "What is 7 + 7?", "14"),
  qSA("g1_2_math_021", "Mathematics", "Basic Math", "Which is longer: a pencil or a small coin?", "A pencil"),
  qSA("g1_2_math_022", "Mathematics", "Basic Math", "What number is missing: 10, 9, 8, ____, 6, 5.", "7"),
  qTF("g1_2_math_023", "Mathematics", "Basic Math", "Half of 10 is 5.", true),
  qSA("g1_2_math_024", "Mathematics", "Basic Math", "What is 11 + 4?", "15"),
  qSA("g1_2_math_025", "Mathematics", "Basic Math", "If you have 3 boxes and each has 2 toys, how many toys do you have in total?", "6"),

  // Reading
  qSA("g1_2_read_001", "English", "Reading", "What is the action word in: \"The boy ran to the field.\"?", "ran"),
  qMC("g1_2_read_002", "English", "Reading", "Choose the opposite of \"hot\":", [
    { key: "A", text: "Warm" },
    { key: "B", text: "Cold" },
    { key: "C", text: "Fire" },
    { key: "D", text: "Ice" }
  ], "B"),
  qMC("g1_2_read_003", "English", "Reading", "Which word starts with a capital letter in the middle of a sentence?", [
    { key: "A", text: "cat" },
    { key: "B", text: "run" },
    { key: "C", text: "Kingston" },
    { key: "D", text: "happy" }
  ], "C"),
  qTF("g1_2_read_004", "English", "Reading", "The words \"sun\" and \"run\" rhyme.", true),
  qSA("g1_2_read_005", "English", "Reading", "Fill in the blank: The bird flew ____ the tree.", "into"),
  qSA("g1_2_read_006", "English", "Reading", "What is the naming word (noun) in: \"The dog barks.\"?", "dog"),
  qMC("g1_2_read_007", "English", "Reading", "Choose the opposite of \"big\":", [
    { key: "A", text: "Large" },
    { key: "B", text: "Tall" },
    { key: "C", text: "Small" },
    { key: "D", text: "Heavy" }
  ], "C"),
  qTF("g1_2_read_008", "English", "Reading", "A book is something you eat.", false),
  qSA("g1_2_read_009", "English", "Reading", "Fill in the blank: I use my ____ to read a story.", "eyes"),
  qMC("g1_2_read_010", "English", "Reading", "Which word is a color?", [
    { key: "A", text: "Table" },
    { key: "B", text: "Green" },
    { key: "C", text: "Jump" },
    { key: "D", text: "Slow" }
  ], "B"),
  qSA("g1_2_read_011", "English", "Reading", "What punctuation mark goes at the end of this sentence: \"Where is my bag\"?", "Question mark"),
  qTF("g1_2_read_012", "English", "Reading", "The word \"beautiful\" means something is ugly.", false),
  qSA("g1_2_read_013", "English", "Reading", "Identify the vowel in the word \"CAT\".", "A"),
  qMC("g1_2_read_014", "English", "Reading", "Which word means more than one:", [
    { key: "A", text: "Boy" },
    { key: "B", text: "Girls" },
    { key: "C", text: "Tree" },
    { key: "D", text: "Book" }
  ], "B"),
  qSA("g1_2_read_015", "English", "Reading", "Fill in the blank: The fish swims in the ____.", "water"),
  qSA("g1_2_read_016", "English", "Reading", "What is the opposite of \"up\"?", "down"),
  qTF("g1_2_read_017", "English", "Reading", "We use a full stop at the start of a sentence.", false),
  qMC("g1_2_read_018", "English", "Reading", "Which word rhymes with \"toy\"?", [
    { key: "A", text: "Play" },
    { key: "B", text: "Boy" },
    { key: "C", text: "Top" },
    { key: "D", text: "Fun" }
  ], "B"),
  qSA("g1_2_read_019", "English", "Reading", "What is the naming word in: \"The school is closed.\"?", "school"),
  qMC("g1_2_read_020", "English", "Reading", "Fill in the blank: She ____ a song yesterday.", [
    { key: "A", text: "sings" },
    { key: "B", text: "sang" },
    { key: "C", text: "sing" },
    { key: "D", text: "singing" }
  ], "B"),

  // Spelling
  qMC("g1_2_spell_001", "English", "Spelling", "Choose the correct spelling:", [
    { key: "A", text: "skewl" },
    { key: "B", text: "school" },
    { key: "C", text: "schule" },
    { key: "D", text: "scool" }
  ], "B"),
  qSA("g1_2_spell_002", "English", "Spelling", "What is the plural spelling of \"cat\"?", "cats"),
  qSA("g1_2_spell_003", "English", "Spelling", "Unscramble these letters to spell a fruit: P P L E A.", "APPLE"),
  qTF("g1_2_spell_004", "English", "Spelling", "The correct spelling for the first day of the school week is Monday.", true),
  qMC("g1_2_spell_005", "English", "Spelling", "Choose the correct spelling:", [
    { key: "A", text: "Happy" },
    { key: "B", text: "Hapi" },
    { key: "C", text: "Happie" },
    { key: "D", text: "Hapy" }
  ], "A"),
  qSA("g1_2_spell_006", "English", "Spelling", "Spell the missing word: The sky is white and ________.", "blue"),
  qSA("g1_2_spell_007", "English", "Spelling", "What is the plural spelling of \"bus\"?", "buses"),
  qMC("g1_2_spell_008", "English", "Spelling", "Choose the correct spelling:", [
    { key: "A", text: "Mother" },
    { key: "B", text: "Muther" },
    { key: "C", text: "Modher" },
    { key: "D", text: "Mothar" }
  ], "A"),
  qSA("g1_2_spell_009", "English", "Spelling", "Unscramble these letters to spell a number: E R H E T.", "THREE"),
  qTF("g1_2_spell_010", "English", "Spelling", "\"Freind\" is the correct spelling for a person you like to play with.", false),
  qSA("g1_2_spell_011", "English", "Spelling", "What is the missing letter in: B O _ K (a thing you read)?", "O"),
  qMC("g1_2_spell_012", "English", "Spelling", "Choose the correct spelling:", [
    { key: "A", text: "Teacher" },
    { key: "B", text: "Teecher" },
    { key: "C", text: "Tacher" },
    { key: "D", text: "Techar" }
  ], "A"),
  qSA("g1_2_spell_013", "English", "Spelling", "What is the plural spelling of \"dog\"?", "dogs"),
  qSA("g1_2_spell_014", "English", "Spelling", "Unscramble these letters to spell a color: E D R.", "RED"),
  qTF("g1_2_spell_015", "English", "Spelling", "The correct spelling is \"orange\".", true),

  // Jamaican Symbols
  qSA("g1_2_jm_001", "Social Studies", "Jamaican Symbols", "What is the name of Jamaica's National Bird?", "Doctor Bird"),
  qSA("g1_2_jm_002", "Social Studies", "Jamaican Symbols", "What are the three colors on the Jamaican flag?", "Black, green, and gold"),
  qSA("g1_2_jm_003", "Social Studies", "Jamaican Symbols", "What is the Jamaican National Fruit?", "Ackee"),
  qTF("g1_2_jm_004", "Social Studies", "Jamaican Symbols", "The Jamaican National Tree is the Blue Mahoe.", true),
  qSA("g1_2_jm_005", "Social Studies", "Jamaican Symbols", "Who is the female National Heroine of Jamaica?", "Nanny of the Maroons"),
  qSA("g1_2_jm_006", "Social Studies", "Jamaican Symbols", "What is the name of the Jamaican National Flower?", "Lignum Vitae"),
  qTF("g1_2_jm_007", "Social Studies", "Jamaican Symbols", "The Doctor Bird has two long feathers at its tail.", true),
  qSA("g1_2_jm_008", "Social Studies", "Jamaican Symbols", "What is the name of the gold object that stands for the King/Queen or Parliament in Jamaica?", "The Mace"),
  qSA("g1_2_jm_009", "Social Studies", "Jamaican Symbols", "Fill in the blank: The Jamaican Coat of Arms features a Taino man and a Taino ________.", "woman"),
  qSA("g1_2_jm_010", "Social Studies", "Jamaican Symbols", "What is Jamaica's National Motto?", "Out of Many, One People"),
  qSA("g1_2_jm_011", "Social Studies", "Jamaican Symbols", "Which color on the Jamaican flag stands for the green land and hope?", "Green"),
  qTF("g1_2_jm_012", "Social Studies", "Jamaican Symbols", "Marcus Garvey is one of Jamaica's National Heroes.", true),
  qSA("g1_2_jm_013", "Social Studies", "Jamaican Symbols", "What meat is cooked with ackee to make Jamaica's national dish?", "Saltfish"),
  qSA("g1_2_jm_014", "Social Studies", "Jamaican Symbols", "Where do you see the Jamaican flag flying on public school compounds?", "On the flagpole"),
  qTF("g1_2_jm_015", "Social Studies", "Jamaican Symbols", "The Jamaican flag has a cross design in gold.", true),

  // Animals
  qMC("g1_2_anim_001", "Science", "Animals", "Which of these animals can fly?", [
    { key: "A", text: "Goat" },
    { key: "B", text: "Doctor Bird" },
    { key: "C", text: "Lizard" },
    { key: "D", text: "Frog" }
  ], "B"),
  qSA("g1_2_anim_002", "Science", "Animals", "What do we call a baby dog?", "Puppy"),
  qTF("g1_2_anim_003", "Science", "Animals", "A fish uses lungs to breathe underwater.", false),
  qSA("g1_2_anim_004", "Science", "Animals", "What animal produces milk on a farm?", "Cow"),
  qSA("g1_2_anim_005", "Science", "Animals", "Which animal carries its home on its back?", "Snail"),
  qSA("g1_2_anim_006", "Science", "Animals", "What noise does a Jamaican rooster make in the morning?", "Cock-a-doodle-doo"),
  qTF("g1_2_anim_007", "Science", "Animals", "A frog can live both on land and in water.", true),
  qSA("g1_2_anim_008", "Science", "Animals", "What do caterpillars turn into?", "Butterflies"),
  qSA("g1_2_anim_009", "Science", "Animals", "Which animal has whiskers and chases mice?", "Cat"),
  qSA("g1_2_anim_010", "Science", "Animals", "Fill in the blank: A bird uses its ________ to fly.", "wings"),
  qSA("g1_2_anim_011", "Science", "Animals", "Which animal gives us wool?", "Sheep"),
  qTF("g1_2_anim_012", "Science", "Animals", "Crocodiles live in some rivers in Jamaica.", true),
  qSA("g1_2_anim_013", "Science", "Animals", "What is a baby cat called?", "Kitten"),
  qSA("g1_2_anim_014", "Science", "Animals", "What type of animal is a Jamaican Boa?", "A snake"),
  qTF("g1_2_anim_015", "Science", "Animals", "All birds can fly.", false),

  // Colours
  qSA("g1_2_col_001", "Art", "Colours", "What colour do you get when you mix red and white?", "Pink"),
  qSA("g1_2_col_002", "Art", "Colours", "Which colour on the Jamaican flag represents the hardships faced in the past?", "Black"),
  qSA("g1_2_col_003", "Art", "Colours", "What colour is a ripe banana skin?", "Yellow"),
  qTF("g1_2_col_004", "Art", "Colours", "Yellow is a primary colour.", true),
  qSA("g1_2_col_005", "Art", "Colours", "What colour is grass?", "Green"),
  qSA("g1_2_col_006", "Art", "Colours", "What colour do you get when you mix red and yellow?", "Orange"),
  qTF("g1_2_col_007", "Art", "Colours", "Black and white are primary colours.", false),
  qSA("g1_2_col_008", "Art", "Colours", "What colour is the clear daytime sky?", "Blue"),
  qSA("g1_2_col_009", "Art", "Colours", "What colour is a ripe tomato?", "Red"),
  qSA("g1_2_col_010", "Art", "Colours", "Fill in the blank: Mixing blue and red gives you ________.", "purple"),
  qSA("g1_2_col_011", "Art", "Colours", "What colour is charcoal?", "Black"),
  qTF("g1_2_col_012", "Art", "Colours", "A cloud before heavy rain looks dark grey or black.", true),
  qSA("g1_2_col_013", "Art", "Colours", "What colour is milk?", "White"),
  qSA("g1_2_col_014", "Art", "Colours", "What colour are the leaves of a healthy mango tree?", "Green"),
  qTF("g1_2_col_015", "Art", "Colours", "Mixing green and red makes clear blue.", false),

  // Simple Geography
  qSA("g1_2_geo_001", "Social Studies", "Simple Geography", "What is the capital city of Jamaica?", "Kingston"),
  qTF("g1_2_geo_002", "Social Studies", "Simple Geography", "Jamaica is an island.", true),
  qSA("g1_2_geo_003", "Social Studies", "Simple Geography", "What large sea surrounds the island of Jamaica?", "The Caribbean Sea"),
  qSA("g1_2_geo_004", "Social Studies", "Simple Geography", "Which direction does the sun rise from?", "East"),
  qSA("g1_2_geo_005", "Social Studies", "Simple Geography", "Is a mountain flat or very high?", "Very high"),
  qSA("g1_2_geo_006", "Social Studies", "Simple Geography", "What is the name of the parish you live in if you are in Montego Bay?", "St. James"),
  qTF("g1_2_geo_007", "Social Studies", "Simple Geography", "The sea is made of fresh drinking water.", false),
  qSA("g1_2_geo_008", "Social Studies", "Simple Geography", "Which direction is the opposite of North?", "South"),
  qSA("g1_2_geo_009", "Social Studies", "Simple Geography", "What do we call a large piece of land with many trees growing close together?", "A forest"),
  qTF("g1_2_geo_010", "Social Studies", "Simple Geography", "A map is a picture that shows where places are.", true),
  qSA("g1_2_geo_011", "Social Studies", "Simple Geography", "What type of landform is completely surrounded by water?", "An island"),
  qSA("g1_2_geo_012", "Social Studies", "Simple Geography", "Which town is the capital of the parish of St. Ann?", "St. Ann's Bay"),
  qTF("g1_2_geo_013", "Social Studies", "Simple Geography", "Spanish Town is a town in Jamaica.", true),
  qSA("g1_2_geo_014", "Social Studies", "Simple Geography", "What do we call a sandy place right next to the sea?", "A beach"),
  qSA("g1_2_geo_015", "Social Studies", "Simple Geography", "Which direction is to your left when you face North?", "West")
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
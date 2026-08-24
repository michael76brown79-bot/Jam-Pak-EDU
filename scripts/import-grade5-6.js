/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

const qSA = (id, subject, category, prompt, correctAnswer) => ({
  id,
  gradeBand: "5-6",
  subject,
  category,
  type: "short_answer",
  difficulty: "hard",
  prompt,
  correctAnswer
});

const qTF = (id, subject, category, prompt, correctBoolean) => ({
  id,
  gradeBand: "5-6",
  subject,
  category,
  type: "true_false",
  difficulty: "hard",
  prompt,
  correctBoolean
});

const qMC = (id, subject, category, prompt, choices, correctChoice) => ({
  id,
  gradeBand: "5-6",
  subject,
  category,
  type: "multiple_choice",
  difficulty: "hard",
  prompt,
  choices,
  correctChoice
});

const questions = [
  // Advanced Math
  qSA("g5_6_math_001", "Mathematics", "Advanced Math", "Find the lowest common multiple (LCM) of 8 and 12.", "24"),
  qSA("g5_6_math_002", "Mathematics", "Advanced Math", "Solve for the value of x: 4x + 7 = 31.", "x = 6"),
  qSA("g5_6_math_003", "Mathematics", "Advanced Math", "Calculate the area of a triangle with a base of 10 cm and a height of 6 cm.", "30 cm²"),
  qTF("g5_6_math_004", "Mathematics", "Advanced Math", "The fraction 3/4 is exactly equal to 75%.", true),
  qSA("g5_6_math_005", "Mathematics", "Advanced Math", "What is the square root of 144?", "12"),
  qSA("g5_6_math_006", "Mathematics", "Advanced Math", "Find the mean average of these test scores: 70, 80, 85, and 85.", "80"),
  qSA("g5_6_math_007", "Mathematics", "Advanced Math", "Express the ratio 15:45 in its lowest terms.", "1:3"),
  qTF("g5_6_math_008", "Mathematics", "Advanced Math", "A prime number has exactly two factors: 1 and itself.", true),
  qSA("g5_6_math_009", "Mathematics", "Advanced Math", "If a circle has a radius of 7 cm, what is its diameter?", "14 cm"),
  qSA("g5_6_math_010", "Mathematics", "Advanced Math", "Calculate: 2.5 x 4.", "10"),
  qSA("g5_6_math_011", "Mathematics", "Advanced Math", "What do you call an angle that is exactly 180 degrees?", "Straight angle"),
  qTF("g5_6_math_012", "Mathematics", "Advanced Math", "The number 1 is a prime number.", false),
  qSA("g5_6_math_013", "Mathematics", "Advanced Math", "Work out: (12 - 4) x (3 + 2).", "40"),
  qSA("g5_6_math_014", "Mathematics", "Advanced Math", "Change the mixed number 3 2/5 into an improper fraction.", "17/5"),
  qSA("g5_6_math_015", "Mathematics", "Advanced Math", "Find 20% of $1,500.", "$300"),
  qTF("g5_6_math_016", "Mathematics", "Advanced Math", "A regular octagon has 8 sides of equal length.", true),
  qSA("g5_6_math_017", "Mathematics", "Advanced Math", "What is the value of 5 cubed (5³)?", "125"),
  qSA("g5_6_math_018", "Mathematics", "Advanced Math", "If 3 containers hold a total of 15 liters of juice, how many liters can 7 of the same containers hold?", "35 liters"),
  qSA("g5_6_math_019", "Mathematics", "Advanced Math", "Subtract 4.25 from 10.", "5.75"),
  qTF("g5_6_math_020", "Mathematics", "Advanced Math", "In a data set, the mode is the value that appears most frequently.", true),

  // Geography
  qSA("g5_6_geo_001", "Social Studies", "Geography", "What is the highest point of elevation in Jamaica?", "Blue Mountain Peak"),
  qSA("g5_6_geo_002", "Social Studies", "Geography", "Name the largest river in Jamaica by volume of water.", "Rio Grande"),
  qTF("g5_6_geo_003", "Social Studies", "Geography", "The Cockpit Country is a rugged limestone region located mostly in western Jamaica.", true),
  qSA("g5_6_geo_004", "Social Studies", "Geography", "Which parish shares a border with Portland and contains the town of Port Maria?", "St. Mary"),
  qSA("g5_6_geo_005", "Social Studies", "Geography", "What type of natural disaster is graded using the Saffir-Simpson scale from Category 1 to 5?", "Hurricane"),
  qSA("g5_6_geo_006", "Social Studies", "Geography", "What is the capital town of the parish of Trelawny?", "Falmouth"),
  qTF("g5_6_geo_007", "Social Studies", "Geography", "Cuba is located directly south of Jamaica.", false),
  qSA("g5_6_geo_008", "Social Studies", "Geography", "Which Caribbean island group contains Jamaica, Cuba, Hispaniola, and Puerto Rico?", "Greater Antilles"),
  qSA("g5_6_geo_009", "Social Studies", "Geography", "What lines on a globe measure distances east or west of the Prime Meridian?", "Lines of longitude"),
  qSA("g5_6_geo_010", "Social Studies", "Geography", "Fill in the blank: The capital town of the parish of Clarendon is ________.", "May Pen"),
  qSA("g5_6_geo_011", "Social Studies", "Geography", "Which active underwater volcano is located just north of Grenada in the Caribbean Sea?", "Kick 'em Jenny"),
  qTF("g5_6_geo_012", "Social Studies", "Geography", "The parish of St. Elizabeth is famous for its dry savannahs and farming areas.", true),
  qSA("g5_6_geo_013", "Social Studies", "Geography", "What is the specific name of the deep, natural harbor located in Kingston?", "Kingston Harbour"),
  qSA("g5_6_geo_014", "Social Studies", "Geography", "Name the two independent nations that share the island of Hispaniola.", "Haiti and the Dominican Republic"),
  qTF("g5_6_geo_015", "Social Studies", "Geography", "Lines of latitude run all the way around the Earth from North to South Pole.", false),
  qSA("g5_6_geo_016", "Social Studies", "Geography", "What term is used to describe a narrow strip of land that connects two larger landmasses?", "Isthmus"),
  qSA("g5_6_geo_017", "Social Studies", "Geography", "Which Jamaican parish is known as the \"Manchester\" of Jamaica and contains the town of Mandeville?", "Manchester"),
  qTF("g5_6_geo_018", "Social Studies", "Geography", "A delta is a landform created at the mouth of a river by deposited sediment.", true),
  qSA("g5_6_geo_019", "Social Studies", "Geography", "What is the approximate location of the Equator?", "0 degrees latitude"),
  qSA("g5_6_geo_020", "Social Studies", "Geography", "Name the body of water that separates Jamaica from the island of Hispaniola.", "Jamaica Channel"),

  // History
  qSA("g5_6_hist_001", "Social Studies", "History", "In what year was chattel slavery completely abolished across the British colonies?", "1838"),
  qSA("g5_6_hist_002", "Social Studies", "History", "Name the slave leader who was executed after leading the 1831 Christmas Rebellion and became a National Hero.", "Sam Sharpe"),
  qTF("g5_6_hist_003", "Social Studies", "History", "The Spanish introduced the first enslaved Africans to Jamaica after the Taino population declined.", true),
  qSA("g5_6_hist_004", "Social Studies", "History", "Which British admiral led the fleet that captured Jamaica from the Spanish in 1655?", "Admiral William Penn and General Robert Venables"),
  qSA("g5_6_hist_005", "Social Studies", "History", "What was the name of the runaway slave community in the western part of Jamaica led by Cudjoe?", "Leeward Maroons"),
  qSA("g5_6_hist_006", "Social Studies", "History", "Who was the first native-born Governor-General of independent Jamaica?", "Sir Clifford Campbell"),
  qTF("g5_6_hist_007", "Social Studies", "History", "The Morant Bay Rebellion took place in the year 1901.", false),
  qSA("g5_6_hist_008", "Social Studies", "History", "What major economic treaty was signed in 1973 to create CARICOM?", "Treaty of Chaguaramas"),
  qSA("g5_6_hist_009", "Social Studies", "History", "What shipping route opened in Central America in 1914, greatly increasing trade travel past Jamaica?", "Panama Canal"),
  qSA("g5_6_hist_010", "Social Studies", "History", "Fill in the blank: Marcus Garvey published a famous black empowerment newspaper called ________.", "The Negro World"),
  qSA("g5_6_hist_011", "Social Studies", "History", "Which system allowed British plantation owners to bring workers from India and China after slavery ended?", "Indentured labor"),
  qTF("g5_6_hist_012", "Social Studies", "History", "Norman Manley and Alexander Bustamante were cousins.", true),
  qSA("g5_6_hist_013", "Social Studies", "History", "What global conflict between 1939 and 1945 saw many Jamaican volunteers fly out to serve in the Royal Air Force?", "World War II"),
  qSA("g5_6_hist_014", "Social Studies", "History", "Name the specific fort built by the British to protect the entrance of Kingston Harbour in Port Royal.", "Fort Charles"),
  qTF("g5_6_hist_015", "Social Studies", "History", "The universal right to vote for all Jamaican adults (Universal Adult Suffrage) was achieved in 1944.", true),
  qSA("g5_6_hist_016", "Social Studies", "History", "What was the name of the political alliance formed in 1958 between several Caribbean islands that failed before independence?", "West Indies Federation"),
  qSA("g5_6_hist_017", "Social Studies", "History", "Who was the Jamaican National Hero who served as the first president of the Jamaica Union of Teachers?", "J.A.G. Smith"),
  qTF("g5_6_hist_018", "Social Studies", "History", "The Maroons signed official peace treaties with the British government in 1739.", true),
  qSA("g5_6_hist_019", "Social Studies", "History", "What was the name of the administrative system where Great Britain ruled Jamaica directly through an appointed Governor after 1865?", "Crown Colony Government"),
  qSA("g5_6_hist_020", "Social Studies", "History", "Which National Hero is buried in a shrine at National Heroes Park in Kingston alongside other leaders?", "All of them"),

  // Science
  qSA("g5_6_sci_001", "Science", "Science", "What biological process allows green plants to convert solar energy into chemical energy?", "Photosynthesis"),
  qSA("g5_6_sci_002", "Science", "Science", "Name the three essential requirements for a plant to perform photosynthesis.", "Sunlight, water, and carbon dioxide"),
  qTF("g5_6_sci_003", "Science", "Science", "A reflection happens when light waves bounce off a smooth surface like a mirror.", true),
  qSA("g5_6_sci_004", "Science", "Science", "What name is given to animals that lack a backbone or vertebral column?", "Invertebrates"),
  qSA("g5_6_sci_005", "Science", "Science", "What force acts against the motion of two surfaces sliding or rubbing against each other?", "Friction"),
  qSA("g5_6_sci_006", "Science", "Science", "Which human organ system filters waste products from the blood and removes them as urine?", "Urinary system"),
  qTF("g5_6_sci_007", "Science", "Science", "Matter expands when it is cooled and contracts when it is heated.", false),
  qSA("g5_6_sci_008", "Science", "Science", "What type of energy is stored inside a battery?", "Chemical energy"),
  qSA("g5_6_sci_009", "Science", "Science", "What do you call the path through which an electrical current flows?", "Circuit"),
  qSA("g5_6_sci_010", "Science", "Science", "Fill in the blank: The tiny, microscopic building blocks of all living organisms are called ________.", "cells"),
  qSA("g5_6_sci_011", "Science", "Science", "What part of the human skeletal system protects the brain from external injury?", "The skull"),
  qTF("g5_6_sci_012", "Science", "Science", "Viruses can reproduce completely on their own without invading a host cell.", false),
  qSA("g5_6_sci_013", "Science", "Science", "What do we call a material that does not allow electricity or heat to pass through it?", "Insulator"),
  qSA("g5_6_sci_014", "Science", "Science", "What properties define a liquid's shape and volume?", "Definite volume but no definite shape"),
  qSA("g5_6_sci_015", "Science", "Science", "Which planet in our solar system is known as the \"Red Planet\"?", "Mars"),
  qTF("g5_6_sci_016", "Science", "Science", "Decomposers break down dead plant and animal matter, returning nutrients back to the soil.", true),
  qSA("g5_6_sci_017", "Science", "Science", "What gas makes up the largest percentage of Earth's atmosphere?", "Nitrogen"),
  qSA("g5_6_sci_018", "Science", "Science", "What type of blood cells fight infections and diseases inside the human body?", "White blood cells"),
  qTF("g5_6_sci_019", "Science", "Science", "The boiling point of pure water at sea level is exactly 100 degrees Celsius.", true),
  qSA("g5_6_sci_020", "Science", "Science", "What do you call the unique environment where an animal or plant naturally lives and grows?", "Habitat"),

  // English
  qSA("g5_6_eng_001", "English", "English", "What figure of speech is used in this phrase: \"The tropical wind whispered through the palms\"?", "Personification"),
  qSA("g5_6_eng_002", "English", "English", "Identify the conjunction in the sentence: \"We can go to the cinema, or we can stay home.\"", "or"),
  qTF("g5_6_eng_003", "English", "English", "A pronoun takes the place of a noun in a sentence.", true),
  qMC("g5_6_eng_004", "English", "English", "Choose the correctly spelled word:",
    [
      { key: "A", text: "Accomodate" },
      { key: "B", text: "Accommodate" },
      { key: "C", text: "Acomodate" },
      { key: "D", text: "Accomodait" }
    ],
    "B"
  ),
  qSA("g5_6_eng_005", "English", "English", "What do you call a word that has the same or nearly the same meaning as another word?", "Synonym"),
  qSA("g5_6_eng_006", "English", "English", "Change this sentence into the passive voice: \"The mechanic repaired the old car.\"", "The old car was repaired by the mechanic."),
  qTF("g5_6_eng_007", "English", "English", "A predicate is the part of a sentence that contains the verb and states something about the subject.", true),
  qSA("g5_6_eng_008", "English", "English", "What punctuation mark is used to separate items in a list or show a slight pause in a sentence?", "Comma"),
  qSA("g5_6_eng_009", "English", "English", "Identify the adverb in this sentence: \"The athlete ran swiftly across the finish line.\"", "swiftly"),
  qMC("g5_6_eng_010", "English", "English", "Fill in the blank with the correct homophone: \"I could hear the rolling ________ of the ocean waves from my room.\"",
    [
      { key: "A", text: "see" },
      { key: "B", text: "sea" },
      { key: "C", text: "cee" },
      { key: "D", text: "seam" }
    ],
    "B"
  ),
  qSA("g5_6_eng_011", "English", "English", "What is the comparative form of the adjective \"good\"?", "better"),
  qTF("g5_6_eng_012", "English", "English", "An exclamation mark is used at the end of a sentence that expresses strong emotion or surprise.", true),
  qSA("g5_6_eng_013", "English", "English", "What do you call a collection of lines or verses that forms a single unit in a poem?", "Stanza"),
  qSA("g5_6_eng_014", "English", "English", "What is the root word of the modification \"uncomfortable\"?", "comfort"),
  qSA("g5_6_eng_015", "English", "English", "Choose the preposition: \"The young boy hid behind the large wooden door.\"", "behind"),
  qTF("g5_6_eng_016", "English", "English", "A collective noun is used to name a group of people, animals, or things as a single unit.", true),
  qSA("g5_6_eng_017", "English", "English", "What type of writing aims to convince the reader to agree with a specific point of view?", "Persuasive writing"),
  qSA("g5_6_eng_018", "English", "English", "What is the plural form of the irregular noun \"criterion\"?", "criteria"),
  qTF("g5_6_eng_019", "English", "English", "The subject of a sentence is the person, place, or thing that is performing the action.", true),
  qSA("g5_6_eng_020", "English", "English", "Identify the direct object in this sentence: \"The teacher handed out the exam papers.\"", "exam papers"),

  // Social Studies
  qSA("g5_6_soc_001", "Social Studies", "Social Studies", "What is the name of the official system where the government counts a country's total population?", "Census"),
  qSA("g5_6_soc_002", "Social Studies", "Social Studies", "Which official branch of government is responsible for interpreting and applying the laws of the nation?", "The Judiciary"),
  qTF("g5_6_soc_003", "Social Studies", "Social Studies", "Jamaica is a member of the Commonwealth of Nations.", true),
  qSA("g5_6_soc_004", "Social Studies", "Social Studies", "What do we call a tax that is placed on goods imported from foreign countries?", "Tariff"),
  qSA("g5_6_soc_005", "Social Studies", "Social Studies", "What is the primary function of the Bank of Jamaica?", "Central Bank / Issuing currency and regulating the financial system."),
  qSA("g5_6_soc_006", "Social Studies", "Social Studies", "Name the specific arm of parliament whose members are appointed by the Governor-General, not elected by voters.", "The Senate"),
  qTF("g5_6_soc_007", "Social Studies", "Social Studies", "GCT stands for General Consumption Tax.", true),
  qSA("g5_6_soc_008", "Social Studies", "Social Studies", "What do you call the total value of all goods and services produced within a country over one year?", "Gross Domestic Product"),
  qSA("g5_6_soc_009", "Social Studies", "Social Studies", "Which regional organization assists Caribbean nations with emergency management and disaster response?", "CDEMA"),
  qSA("g5_6_soc_010", "Social Studies", "Social Studies", "Fill in the blank: The physical infrastructure system that moves clean water across Jamaica is run by the ________.", "NWC"),
  qSA("g5_6_soc_011", "Social Studies", "Social Studies", "What type of economy relies on both private businesses and government control to function?", "Mixed economy"),
  qTF("g5_6_soc_012", "Social Studies", "Social Studies", "The head of the judiciary branch in Jamaica is called the Chief Justice.", true),
  qSA("g5_6_soc_013", "Social Studies", "Social Studies", "What do we call the loss of highly educated and skilled workers who leave their home country to work abroad?", "Brain drain"),
  qSA("g5_6_soc_014", "Social Studies", "Social Studies", "What international financial institution is headquartered in Washington, D.C., and lends money to developing countries like Jamaica for structural developments?", "IMF / World Bank"),
  qTF("g5_6_soc_015", "Social Studies", "Social Studies", "Air pollution can contribute directly to the production of acid rain.", true),
  qSA("g5_6_soc_016", "Social Studies", "Social Studies", "What specific public service sector handles national security and law enforcement across Jamaica?", "JCF"),
  qSA("g5_6_soc_017", "Social Studies", "Social Studies", "What trade status allows CARICOM members to buy and sell goods with each other without paying import duties?", "Free trade"),
  qTF("g5_6_soc_018", "Social Studies", "Social Studies", "Inflation is a term that describes a steady decrease in the general prices of goods.", false),
  qSA("g5_6_soc_019", "Social Studies", "Social Studies", "What is the name of the official residence where the Governor-General of Jamaica lives and works?", "King's House"),
  qSA("g5_6_soc_020", "Social Studies", "Social Studies", "Name the document given to citizens that proves their identity and allows them to travel to other countries.", "Passport")
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
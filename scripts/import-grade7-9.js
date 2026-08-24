/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

const qSA = (id, subject, category, prompt, correctAnswer) => ({
  id,
  gradeBand: "7-9",
  subject,
  category,
  type: "short_answer",
  difficulty: "medium",
  prompt,
  correctAnswer
});

const qTF = (id, subject, category, prompt, correctBoolean) => ({
  id,
  gradeBand: "7-9",
  subject,
  category,
  type: "true_false",
  difficulty: "medium",
  prompt,
  correctBoolean
});

const qMC = (id, subject, category, prompt, choices, correctChoice) => ({
  id,
  gradeBand: "7-9",
  subject,
  category,
  type: "multiple_choice",
  difficulty: "medium",
  prompt,
  choices,
  correctChoice
});

const questions = [
  // Mathematics
  qMC("g7_9_math_001", "Mathematics", "Math", `What is the value of (-5) × (-4) + (-3)?`, [
    { key: "A", text: "-23" },
    { key: "B", text: "17" },
    { key: "C", text: "-17" },
    { key: "D", text: "23" }
  ], "B"),
  qSA("g7_9_math_002", "Mathematics", "Math", `Solve the linear equation for x: 3x - 7 = 14.`, `x = 7`),
  qSA("g7_9_math_003", "Mathematics", "Math", `Expand and simplify the algebraic expression: 4(2x - 5) + 3x.`, `11x - 20`),
  qTF("g7_9_math_004", "Mathematics", "Math", `A triangle with side lengths 5 cm, 12 cm, and 13 cm is a right-angled triangle.`, true),
  qSA("g7_9_math_005", "Mathematics", "Math", `Calculate the simple interest on a principal of $12,000 at a rate of 5% per annum for 3 years.`, `$1,800`),
  qSA("g7_9_math_006", "Mathematics", "Math", `Find the median of the following set of test scores: 55, 82, 67, 91, 74.`, `74`),
  qSA("g7_9_math_007", "Mathematics", "Math", `What is the value of x if the ratio 3:5 is equivalent to x:20?`, `12`),
  qSA("g7_9_math_008", "Mathematics", "Math", `Find the value of 2⁵ - 3².`, `23`),
  qSA("g7_9_math_009", "Mathematics", "Math", `Calculate the area of a circle with a radius of 14 cm. (Take π = 22/7)`, `616 cm²`),
  qTF("g7_9_math_010", "Mathematics", "Math", `The sum of the interior angles of any quadrilateral is always equal to 180 degrees.`, false),
  qSA("g7_9_math_011", "Mathematics", "Math", `What is the gradient (slope) of the straight line given by the equation y = -4x + 7?`, `-4`),
  qSA("g7_9_math_012", "Mathematics", "Math", `If a bicycle costs $25,000 and a 15% General Consumption Tax (GCT) is added, what is the total cost?`, `$28,750`),
  qSA("g7_9_math_013", "Mathematics", "Math", `Convert 2.5 kilometres into metres.`, `2,500 metres`),
  qTF("g7_9_math_014", "Mathematics", "Math", `The number 2 is the only even prime number.`, true),
  qSA("g7_9_math_015", "Mathematics", "Math", `Factorize the expression completely: 6ax - 9ay.`, `3a(2x - 3y)`),
  qSA("g7_9_math_016", "Mathematics", "Math", `Find the lower quartile (Q1) of the data set: 3, 5, 7, 8, 12, 13, 15.`, `5`),
  qSA("g7_9_math_017", "Mathematics", "Math", `What is the value of √169 × 2?`, `26`),
  qTF("g7_9_math_018", "Mathematics", "Math", `An obtuse angle measures strictly between 90 degrees and 180 degrees.`, true),
  qSA("g7_9_math_019", "Mathematics", "Math", `Solve the inequality for y: 2y + 5 ≤ 17.`, `y ≤ 6`),
  qMC("g7_9_math_020", "Mathematics", "Math", `A bag contains 4 blue marbles and 6 red marbles. If one marble is drawn at random, what is the probability that it is blue?`, [
    { key: "A", text: "1/2" },
    { key: "B", text: "2/5" },
    { key: "C", text: "3/5" },
    { key: "D", text: "2/3" }
  ], "B"),

  // English
  qSA("g7_9_eng_001", "English", "English", `What figure of speech is used in the phrase: "The old wooden door groaned loudly as it opened"?`, `Personification`),
  qMC("g7_9_eng_002", "English", "English", `Identify the part of speech of the underlined word: "The student completed the CSEC exam successfully."`, [
    { key: "A", text: "Adjective" },
    { key: "B", text: "Noun" },
    { key: "C", text: "Verb" },
    { key: "D", text: "Adverb" }
  ], "D"),
  qTF("g7_9_eng_003", "English", "English", `A relative clause can function perfectly on its own as a complete sentence.`, false),
  qMC("g7_9_eng_004", "English", "English", `Choose the sentence with the correct punctuation and capitalisation:`, [
    { key: "A", text: "we visited dunns river falls last monday." },
    { key: "B", text: "We visited Dunns River falls last Monday." },
    { key: "C", text: "We visited Dunns River Falls last Monday." },
    { key: "D", text: "We visited dunns river falls last Monday." }
  ], "C"),
  qSA("g7_9_eng_005", "English", "English", `What is the grammatical term for a word that sounds the same as another word but has a different spelling and meaning, such as "meat" and "meet"?`, `Homophone`),
  qSA("g7_9_eng_006", "English", "English", `Change the following active voice sentence into passive voice: "The mechanic repaired the old bus."`, `The old bus was repaired by the mechanic.`),
  qTF("g7_9_eng_007", "English", "English", `The prefix "mis-" added to the word "understand" changes its meaning to the opposite or an incorrect action.`, true),
  qSA("g7_9_eng_008", "English", "English", `Identify the conjunction in the sentence: "We wanted to play cricket outside, but the heavy rain started."`, `but`),
  qMC("g7_9_eng_009", "English", "English", `Choose the synonym for the word "prohibit":`, [
    { key: "A", text: "Allow" },
    { key: "B", text: "Forbid" },
    { key: "C", text: "Promote" },
    { key: "D", text: "Protect" }
  ], "B"),
  qSA("g7_9_eng_010", "English", "English", `Fill in the blank with the correct pronoun: "Between you and ____, I think our team will win the football match."`, `me`),
  qSA("g7_9_eng_011", "English", "English", `What punctuation mark is used to indicate a direct quote or spoken dialogue in a narrative text?`, `Quotation marks`),
  qTF("g7_9_eng_012", "English", "English", `The plural form of the noun "crisis" is written as "crisises".`, false),
  qSA("g7_9_eng_013", "English", "English", `Identify the main subject in this sentence: "The group of noisy children ran down the street."`, `The group of noisy children`),
  qSA("g7_9_eng_014", "English", "English", `What type of essay requires the writer to tell a story based on personal experience or imagination?`, `Narrative essay`),
  qTF("g7_9_eng_015", "English", "English", `In formal writing, it is correct to use double negatives like "I don't know nothing."`, false),
  qMC("g7_9_eng_016", "English", "English", `Choose the correct spelling for the missing word: "The headmaster made an important ____ this morning."`, [
    { key: "A", text: "anouncement" },
    { key: "B", text: "announcement" },
    { key: "C", text: "announsement" },
    { key: "D", text: "anouncment" }
  ], "B"),
  qMC("g7_9_eng_017", "English", "English", `Fill in the blank with the correct verb form: "The box of mangoes ____ sitting on the kitchen table."`, [
    { key: "A", text: "is" },
    { key: "B", text: "are" },
    { key: "C", text: "am" },
    { key: "D", text: "were" }
  ], "A"),
  qSA("g7_9_eng_018", "English", "English", `What is the antonym of the word "vague"?`, `clear`),
  qTF("g7_9_eng_019", "English", "English", `An adjective clause usually begins with a relative pronoun like "who", "which", or "that".`, true),
  qSA("g7_9_eng_020", "English", "English", `What is the term used for the main central point or message that an author wants to communicate in a piece of writing?`, `Theme`),

  // Social Studies
  qSA("g7_9_soc_001", "Social Studies", "Social Studies", `What type of family structure is formed when two divorced parents remarry and bring children from their previous relationships together?`, `Blended family`),
  qMC("g7_9_soc_002", "Social Studies", "Social Studies", `Which arm of government in Jamaica is responsible for making and passing new laws?`, [
    { key: "A", text: "The Judiciary" },
    { key: "B", text: "The Executive" },
    { key: "C", text: "The Legislature" },
    { key: "D", text: "The Civil Service" }
  ], "C"),
  qTF("g7_9_soc_003", "Social Studies", "Social Studies", `The Governor-General of Jamaica is directly elected by the citizens during standard general elections.`, false),
  qSA("g7_9_soc_004", "Social Studies", "Social Studies", `What term describes the custom, beliefs, and values passed down through generations within a specific society?`, `Culture`),
  qSA("g7_9_soc_005", "Social Studies", "Social Studies", `Which regional Caribbean organization was established by the Treaty of Chaguaramas in 1973?`, `CARICOM`),
  qMC("g7_9_soc_006", "Social Studies", "Social Studies", `What economic term describes a situation where a country's value of imports is higher than its value of exports?`, [
    { key: "A", text: "Trade surplus" },
    { key: "B", text: "Trade deficit" },
    { key: "C", text: "Inflation" },
    { key: "D", text: "Recession" }
  ], "B"),
  qTF("g7_9_soc_007", "Social Studies", "Social Studies", `Urbanization describes the migration of populations away from crowded cities into rural farming districts.`, false),
  qSA("g7_9_soc_008", "Social Studies", "Social Studies", `What is the official age of majority when a citizen legally gains adult rights, such as voting, in Jamaica?`, `18 years`),
  qSA("g7_9_soc_009", "Social Studies", "Social Studies", `Which entity is responsible for managing, organizing, and ensuring fairness during national elections in Jamaica?`, `Electoral Office of Jamaica`),
  qTF("g7_9_soc_010", "Social Studies", "Social Studies", `GCT stands for General Consumption Tax, which is an example of an indirect tax.`, true),
  qSA("g7_9_soc_011", "Social Studies", "Social Studies", `What do we call a formal, legally binding document that sets out the fundamental rules, structures, and human rights guidelines for a country?`, `Constitution`),
  qSA("g7_9_soc_012", "Social Studies", "Social Studies", `Which Caribbean country suffered a catastrophic earthquake in 2010 that severely damaged its capital city, Port-au-Prince?`, `Haiti`),
  qTF("g7_9_soc_013", "Social Studies", "Social Studies", `A bilateral trade agreement is an agreement made between exactly two countries.`, true),
  qSA("g7_9_soc_014", "Social Studies", "Social Studies", `What environmental term describes the clearing and removal of large forest areas for housing or farming use?`, `Deforestation`),
  qSA("g7_9_soc_015", "Social Studies", "Social Studies", `What is the title of the individual who acts as the political head of a local municipal corporation (parish council) in Jamaica?`, `Mayor`),
  qTF("g7_9_soc_016", "Social Studies", "Social Studies", `The primary purpose of a trade union is to protect the rights, wages, and working conditions of employees.`, true),
  qMC("g7_9_soc_017", "Social Studies", "Social Studies", `Choose the term that describes the loss of highly educated, skilled, and professional workers who emigrate to work in wealthier nations:`, [
    { key: "A", text: "Population density" },
    { key: "B", text: "Brain drain" },
    { key: "C", text: "Urban sprawl" },
    { key: "D", text: "Acculturation" }
  ], "B"),
  qSA("g7_9_soc_018", "Social Studies", "Social Studies", `What is the official name of the central bank that regulates the financial sector and prints money in Jamaica?`, `Bank of Jamaica`),
  qTF("g7_9_soc_019", "Social Studies", "Social Studies", `A dependency ratio compares the working-age population against the non-working young and elderly populations.`, true),
  qSA("g7_9_soc_020", "Social Studies", "Social Studies", `What is the term for a specific set of rules or codes of conduct established by a society that its citizens are expected to follow?`, `Laws`),

  // Integrated Science
  qSA("g7_9_sci_001", "Science", "Integrated Science", `What biological process allows living cells to break down glucose and release energy in the absence of oxygen?`, `Anaerobic respiration`),
  qMC("g7_9_sci_002", "Science", "Integrated Science", `Which organelle inside a cell is commonly known as the site where protein synthesis takes place?`, [
    { key: "A", text: "Mitochondrion" },
    { key: "B", text: "Ribosome" },
    { key: "C", text: "Vacuole" },
    { key: "D", text: "Nucleus" }
  ], "B"),
  qTF("g7_9_sci_003", "Science", "Integrated Science", `Physical weathering changes the chemical composition of a rock as it breaks down.`, false),
  qSA("g7_9_sci_004", "Science", "Integrated Science", `What type of thermal energy transfer happens through the movement of fluids (liquids or gases) caused by density differences?`, `Convection`),
  qSA("g7_9_sci_005", "Science", "Integrated Science", `State the chemical formula for standard table salt (Sodium Chloride).`, `NaCl`),
  qMC("g7_9_sci_006", "Science", "Integrated Science", `Which type of human blood vessels possess thick, muscular walls to carry blood away from the heart under high pressure?`, [
    { key: "A", text: "Veins" },
    { key: "B", text: "Capillaries" },
    { key: "C", text: "Arteries" },
    { key: "D", text: "Venules" }
  ], "C"),
  qTF("g7_9_sci_007", "Science", "Integrated Science", `Light waves travel through a vacuum at a speed faster than sound waves.`, true),
  qSA("g7_9_sci_008", "Science", "Integrated Science", `What structural component of an atom has a neutral charge and is found tightly packed inside the central nucleus?`, `Neutron`),
  qSA("g7_9_sci_009", "Science", "Integrated Science", `What type of symbiotic relationship occurs when one organism benefits while the other organism is harmed?`, `Parasitism`),
  qTF("g7_9_sci_010", "Science", "Integrated Science", `A solution with a pH value of 3 is considered to be highly alkaline.`, false),
  qSA("g7_9_sci_011", "Science", "Integrated Science", `What name is given to the uniform process where a liquid substance turns into a gas directly at its boiling point?`, `Boiling`),
  qMC("g7_9_sci_012", "Science", "Integrated Science", `Which vitamin deficiency is the direct cause of the condition known as scurvy, which affects gums and skin healing?`, [
    { key: "A", text: "Vitamin A" },
    { key: "B", text: "Vitamin B" },
    { key: "C", text: "Vitamin C" },
    { key: "D", text: "Vitamin D" }
  ], "C"),
  qTF("g7_9_sci_013", "Science", "Integrated Science", `Periodic table groups run vertically and contain elements that share similar outer-shell electron configurations.`, true),
  qSA("g7_9_sci_014", "Science", "Integrated Science", `What instrument is used by technicians to measure the total electrical resistance within an operational circuit?`, `Ohmmeter`),
  qSA("g7_9_sci_015", "Science", "Integrated Science", `What form of energy is stored up inside an object due to its high position or elevation relative to the ground?`, `Gravitational potential energy`),
  qTF("g7_9_sci_016", "Science", "Integrated Science", `Respiration is an example of an endothermic process because it stores solar energy in cells.`, false),
  qSA("g7_9_sci_017", "Science", "Integrated Science", `What mechanical device alters the direction or magnitude of a force, such as a lever, pulley, or inclined plane?`, `Simple machine`),
  qMC("g7_9_sci_018", "Science", "Integrated Science", `Choose the gas that is the primary contributor to global warming and the greenhouse effect:`, [
    { key: "A", text: "Oxygen" },
    { key: "B", text: "Nitrogen" },
    { key: "C", text: "Carbon dioxide" },
    { key: "D", text: "Helium" }
  ], "C"),
  qTF("g7_9_sci_019", "Science", "Integrated Science", `Pure distilled water conducts electricity as easily as seawater.`, false),
  qSA("g7_9_sci_020", "Science", "Integrated Science", `What force acts directly against the weight of an object when it is immersed in a liquid, pushing it upward?`, `Upthrust`),

  // Jamaican History
  qSA("g7_9_hist_001", "Social Studies", "Jamaican History", `Which National Hero of Jamaica organized and led the historic 1865 protest march known as the Morant Bay Rebellion?`, `Paul Bogle`),
  qMC("g7_9_hist_002", "Social Studies", "Jamaican History", `What was the name of the runaway slave community established in the mountains of western Jamaica, led by Cudjoe?`, [
    { key: "A", text: "Windward Maroons" },
    { key: "B", text: "Leeward Maroons" },
    { key: "C", text: "Taino Villages" },
    { key: "D", text: "Seville Nueva" }
  ], "B"),
  qTF("g7_9_hist_003", "Social Studies", "Jamaican History", `The Abolition of the Slave Trade Act passed by the British Parliament in 1807 immediately freed all slaves in Jamaica.`, false),
  qSA("g7_9_hist_004", "Social Studies", "Jamaican History", `What instrument made from a hollowed-out cow horn was blown by the Maroons to send encoded signals across long distances?`, `Abeng`),
  qSA("g7_9_hist_005", "Social Studies", "Jamaican History", `In what year did Jamaica officially lower the British flag and gain its political independence?`, `1962`),
  qMC("g7_9_hist_006", "Social Studies", "Jamaican History", `Choose the name of the system under which workers from India and China were brought to Jamaica to work on plantations after slavery ended:`, [
    { key: "A", text: "Encomienda system" },
    { key: "B", text: "Apprenticeship system" },
    { key: "C", text: "Indentured labour system" },
    { key: "D", text: "Chattel slavery" }
  ], "C"),
  qTF("g7_9_hist_007", "Social Studies", "Jamaican History", `Christopher Columbus first sighted the coast of Jamaica during his second voyage to the New World in 1494.`, true),
  qSA("g7_9_hist_008", "Social Studies", "Jamaican History", `Which National Hero was a successful mulatto businessman, politician, and close associate of Paul Bogle who was unjustly executed after the Morant Bay Rebellion?`, `George William Gordon`),
  qSA("g7_9_hist_009", "Social Studies", "Jamaican History", `What was the primary cash crop grown on large, labor-intensive Jamaican plantations during the 17th and 18th centuries?`, `Sugar cane`),
  qTF("g7_9_hist_010", "Social Studies", "Jamaican History", `The capital of Jamaica was moved from Spanish Town to Kingston in the year 1872.`, true),
  qSA("g7_9_hist_011", "Social Studies", "Jamaican History", `Name the massive slave insurrection that broke out during the holidays of 1831, led by a native Baptist deacon named Sam Sharpe.`, `Christmas Rebellion`),
  qSA("g7_9_hist_012", "Social Studies", "Jamaican History", `Which global civil rights organization was founded by Marcus Mosiah Garvey in Jamaica in 1914?`, `UNIA`),
  qTF("g7_9_hist_013", "Social Studies", "Jamaican History", `Sir Alexander Bustamante and Norman Washington Manley were the two central figures who led Jamaica's labor movements and political development toward independence.`, true),
  qSA("g7_9_hist_014", "Social Studies", "Jamaican History", `What administrative structure of government was imposed directly on Jamaica by Great Britain in 1866 following the collapse of the local House of Assembly?`, `Crown Colony Government`),
  qSA("g7_9_hist_015", "Social Studies", "Jamaican History", `What famous pirate haven and commercial port city in Jamaica was destroyed and partially submerged by a massive earthquake in 1692?`, `Port Royal`),
  qTF("g7_9_hist_016", "Social Studies", "Jamaican History", `Queen Nanny of the Maroons is revered as a military strategist who used guerrilla warfare to defend Nanny Town against British soldiers.`, true),
  qSA("g7_9_hist_017", "Social Studies", "Jamaican History", `Who was the first native-born Governor-General appointed to represent the British Crown in an independent Jamaica?`, `Sir Clifford Campbell`),
  qMC("g7_9_hist_018", "Social Studies", "Jamaican History", `Choose the system of forced labor that the Spanish used to exploit the indigenous Taino population when they first occupied Jamaica:`, [
    { key: "A", text: "Triangular Trade" },
    { key: "B", text: "Encomienda" },
    { key: "C", text: "Asiento" },
    { key: "D", text: "Amelioration" }
  ], "B"),
  qTF("g7_9_hist_019", "Social Studies", "Jamaican History", `Universal Adult Suffrage, achieved in Jamaica in 1944, gave all adults the right to vote in national elections regardless of race, gender, or property ownership.`, true),
  qSA("g7_9_hist_020", "Social Studies", "Jamaican History", `What short-lived political and economic alliance was formed in 1958 between several British Caribbean islands but collapsed shortly before Jamaica's independence?`, `West Indies Federation`),

  // Geography
  qSA("g7_9_geo_001", "Social Studies", "Geography", `What geological process involves the movement and grinding of giant plates of the Earth's lithosphere over the mantle?`, `Plate tectonics`),
  qMC("g7_9_geo_002", "Social Studies", "Geography", `Which type of rock is formed when existing sedimentary or igneous rocks are altered by intense heat and underground pressure?`, [
    { key: "A", text: "Volcanic rock" },
    { key: "B", text: "Metamorphic rock" },
    { key: "C", text: "Limestone rock" },
    { key: "D", text: "Pyroclastic rock" }
  ], "B"),
  qTF("g7_9_geo_003", "Social Studies", "Geography", `Lines of longitude run parallel to the Equator and measure distances north and south of it.`, false),
  qSA("g7_9_geo_004", "Social Studies", "Geography", `What atmospheric instrument is used by meteorologists to measure air pressure changes?`, `Barometer`),
  qSA("g7_9_geo_005", "Social Studies", "Geography", `What specific name is given to a rugged, limestone landscape characterized by sinkholes, caves, and steep cockpits?`, `Cockpit Country`),
  qMC("g7_9_geo_006", "Social Studies", "Geography", `Choose the scale that is primarily used to measure the total amount of energy or absolute magnitude released by an earthquake:`, [
    { key: "A", text: "Saffir-Simpson scale" },
    { key: "B", text: "Richter scale" },
    { key: "C", text: "Mercalli scale" },
    { key: "D", text: "Beaufort scale" }
  ], "B"),
  qTF("g7_9_geo_007", "Social Studies", "Geography", `Relief or orographic rainfall occurs when moisture-laden air is forced to rise up over a high mountain range.`, true),
  qSA("g7_9_geo_008", "Social Studies", "Geography", `What is the term for a narrow strip of water that connects two larger seas or oceans, such as the Windward Passage?`, `Strait`),
  qSA("g7_9_geo_009", "Social Studies", "Geography", `What specific layer of the Earth's atmosphere lies closest to the surface and contains almost all of our weather systems?`, `Troposphere`),
  qTF("g7_9_geo_010", "Social Studies", "Geography", `Constructive coastal waves have a powerful backwash that pulls large amounts of sand away from a beach.`, false),
  qSA("g7_9_geo_011", "Social Studies", "Geography", `What drainage feature is created at the mouth of a river when sediment builds up faster than ocean currents can carry it away?`, `Delta`),
  qMC("g7_9_geo_012", "Social Studies", "Geography", `Which parish in Jamaica is renowned for its vast, high-grade bauxite reserves and intensive mining operations?`, [
    { key: "A", text: "Hanover" },
    { key: "B", text: "Portland" },
    { key: "C", text: "Manchester" },
    { key: "D", text: "St. Thomas" }
  ], "C"),
  qTF("g7_9_geo_013", "Social Studies", "Geography", `Weathering refers strictly to the transport and removal of rock particles by active wind and river water.`, false),
  qSA("g7_9_geo_014", "Social Studies", "Geography", `What term describes the statistical calculation of the average number of people living within a square kilometre of land?`, `Population density`),
  qSA("g7_9_geo_015", "Social Studies", "Geography", `What name is given to the prevailing wind system that blows across the Caribbean region from a northeasterly direction?`, `Northeast trade winds`),
  qTF("g7_9_geo_016", "Social Studies", "Geography", `Global lines of latitude are used by cartographers to calculate local time zones around the world.`, false),
  qSA("g7_9_geo_017", "Social Studies", "Geography", `What type of map uses specialized brown lines connecting points of equal elevation to illustrate topography and terrain?`, `Topographic map`),
  qMC("g7_9_geo_018", "Social Studies", "Geography", `Choose the term that describes a rapid, gravity-driven movement of soil, rocks, and debris down a steep hillside:`, [
    { key: "A", text: "Soil creep" },
    { key: "B", text: "Landslide" },
    { key: "C", text: "Exfoliation" },
    { key: "D", text: "Abrasion" }
  ], "B"),
  qTF("g7_9_geo_019", "Social Studies", "Geography", `The Equator represents the line of 0 degrees latitude that divides the Earth into the Northern and Southern Hemispheres.`, true),
  qSA("g7_9_geo_020", "Social Studies", "Geography", `What index measures the total number of live births per 1,000 individuals in a population over the course of a single year?`, `Birth rate`),

  // Music
  qSA("g7_9_music_001", "Music", "Music", `What traditional Jamaican folk music is played using acoustic instruments like the banjo, guitar, hand drums, and a large rhumba box?`, `Mento`),
  qMC("g7_9_music_002", "Music", "Music", `Which fast-paced genre of popular music emerged in Jamaica in the late 1950s, combining elements of mento with American rhythm and blues?`, [
    { key: "A", text: "Rocksteady" },
    { key: "B", text: "Ska" },
    { key: "C", text: "Dub" },
    { key: "D", text: "Dancehall" }
  ], "B"),
  qTF("g7_9_music_003", "Music", "Music", `A sharp sign (♯) placed before a musical note lowers its pitch by a half-step or semitone.`, false),
  qSA("g7_9_music_004", "Music", "Music", `What musical term describes the specific pace or speed at which a piece of music is intended to be performed?`, `Tempo`),
  qSA("g7_9_music_005", "Music", "Music", `What clef sign is used to write down notes for higher-pitched instruments and is also known as the G clef?`, `Treble clef`),
  qMC("g7_9_music_006", "Music", "Music", `Choose the iconic Jamaican music genre that developed around 1966, noted for its slowed-down tempo, prominent basslines, and focus on romantic or social themes:`, [
    { key: "A", text: "Ska" },
    { key: "B", text: "Rocksteady" },
    { key: "C", text: "Mento" },
    { key: "D", text: "Soca" }
  ], "B"),
  qTF("g7_9_music_007", "Music", "Music", `A standard musical staff is constructed using exactly five horizontal lines and four spaces.`, true),
  qSA("g7_9_music_008", "Music", "Music", `What accidental sign completely cancels out any previous sharp or flat adjustments made to a musical note?`, `Natural sign`),
  qSA("g7_9_music_009", "Music", "Music", `What texture is created when a musical performance consists of a single melodic line with no accompanying harmonies?`, `Monophonic texture`),
  qTF("g7_9_music_010", "Music", "Music", `Syncopation involves placing dynamic rhythmic accents or stresses on the weak or off-beats of a measure.`, true),
  qSA("g7_9_music_011", "Music", "Music", `What short horizontal lines are added above or below a standard musical staff to extend its range for very high or low notes?`, `Ledger lines`),
  qMC("g7_9_music_012", "Music", "Music", `Which dynamic instruction tells a musician that a particular section of music should be played very softly?`, [
    { key: "A", text: "Fortissimo" },
    { key: "B", text: "Mezzo forte" },
    { key: "C", text: "Crescendo" },
    { key: "D", text: "Pianissimo" }
  ], "D"),
  qTF("g7_9_music_013", "Music", "Music", `An octave represents a musical interval that spans exactly eight notes on a standard diatonic scale.`, true),
  qSA("g7_9_music_014", "Music", "Music", `What structural term describes the acoustic quality or distinct tone color that allows a listener to distinguish a trumpet from a violin?`, `Timbre`),
  qSA("g7_9_music_015", "Music", "Music", `What studio technique, pioneered by Jamaican engineers like King Tubby, involves remixing reggae tracks by dropping out vocals and emphasizing heavy echo, delay, and reverb on the drum and bass?`, `Dub`),
  qMC("g7_9_music_016", "Music", "Music", `Choose the time signature that represents compound duple meter, commonly found in folk songs:`, [
    { key: "A", text: "2/4" },
    { key: "B", text: "3/4" },
    { key: "C", text: "4/4" },
    { key: "D", text: "6/8" }
  ], "D"),
  qTF("g7_9_music_017", "Music", "Music", `A triad is a chord consisting of exactly three distinct notes stacked in thirds.`, true),
  qSA("g7_9_music_018", "Music", "Music", `What structural sign at the very beginning of a musical piece indicates how many beats are contained in each measure?`, `Time signature`),
  qSA("g7_9_music_019", "Music", "Music", `Name the world-famous Jamaican singer, songwriter, and peace ambassador who popularized roots reggae music globally with the album Exodus.`, `Bob Marley`),
  qTF("g7_9_music_020", "Music", "Music", `Homophonic texture consists of multiple, entirely independent melodies playing simultaneously.`, false)
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
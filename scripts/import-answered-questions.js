/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

const qMC = (id, gradeBand, subject, category, prompt, choices, correctChoice) => ({
  id,
  gradeBand,
  subject,
  category,
  type: "multiple_choice",
  difficulty: gradeBand === "7-9" ? "medium" : "hard",
  prompt,
  choices,
  correctChoice
});

const qTF = (id, gradeBand, subject, category, prompt, correctBoolean) => ({
  id,
  gradeBand,
  subject,
  category,
  type: "true_false",
  difficulty: gradeBand === "7-9" ? "medium" : "hard",
  prompt,
  correctBoolean
});

const questions = [
  // =========================
  // GRADES 7–9
  // =========================
  qMC("g7_9_math_001", "7-9", "Mathematics", "Mathematics",
    "What is the value of (-5) × (-4) + (-3)?",
    [
      { key: "A", text: "-23" },
      { key: "B", text: "17" },
      { key: "C", text: "-17" },
      { key: "D", text: "23" }
    ],
    "B"
  ),
  qTF("g7_9_math_004", "7-9", "Mathematics", "Mathematics",
    "A triangle with side lengths 5 cm, 12 cm, and 13 cm is a right-angled triangle.",
    true
  ),
  qTF("g7_9_math_010", "7-9", "Mathematics", "Mathematics",
    "The sum of the interior angles of any quadrilateral is always equal to 180 degrees.",
    false
  ),
  qTF("g7_9_math_014", "7-9", "Mathematics", "Mathematics",
    "The number 2 is the only even prime number.",
    true
  ),
  qTF("g7_9_math_018", "7-9", "Mathematics", "Mathematics",
    "An obtuse angle measures strictly between 90 degrees and 180 degrees.",
    true
  ),
  qMC("g7_9_math_020", "7-9", "Mathematics", "Mathematics",
    "A bag contains 4 blue marbles and 6 red marbles. What is the probability that a marble drawn at random is blue?",
    [
      { key: "A", text: "1/2" },
      { key: "B", text: "2/5" },
      { key: "C", text: "3/5" },
      { key: "D", text: "2/3" }
    ],
    "B"
  ),

  qMC("g7_9_english_001", "7-9", "English", "English",
    "What figure of speech is used in the phrase: \"The old wooden door groaned loudly as it opened\"?",
    [
      { key: "A", text: "Simile" },
      { key: "B", text: "Metaphor" },
      { key: "C", text: "Personification" },
      { key: "D", text: "Hyperbole" }
    ],
    "C"
  ),
  qMC("g7_9_english_002", "7-9", "English", "English",
    "Identify the part of speech of the underlined word: \"The student completed the CSEC exam successfully.\"",
    [
      { key: "A", text: "Adjective" },
      { key: "B", text: "Noun" },
      { key: "C", text: "Verb" },
      { key: "D", text: "Adverb" }
    ],
    "D"
  ),
  qTF("g7_9_english_003", "7-9", "English", "English",
    "A relative clause can function perfectly on its own as a complete sentence.",
    false
  ),
  qMC("g7_9_english_004", "7-9", "English", "English",
    "Choose the sentence with the correct punctuation and capitalisation.",
    [
      { key: "A", text: "we visited dunns river falls last monday." },
      { key: "B", text: "We visited Dunns River falls last Monday." },
      { key: "C", text: "We visited Dunns River Falls last Monday." },
      { key: "D", text: "We visited dunns river falls last Monday." }
    ],
    "C"
  ),
  qTF("g7_9_english_005", "7-9", "English", "English",
    "The prefix \"mis-\" added to the word \"understand\" changes its meaning to the opposite or an incorrect action.",
    true
  ),
  qMC("g7_9_english_006", "7-9", "English", "English",
    "Choose the synonym for the word \"prohibit\".",
    [
      { key: "A", text: "Allow" },
      { key: "B", text: "Forbid" },
      { key: "C", text: "Promote" },
      { key: "D", text: "Protect" }
    ],
    "B"
  ),
  qTF("g7_9_english_007", "7-9", "English", "English",
    "In formal writing, it is correct to use double negatives like \"I don't know nothing.\"",
    false
  ),
  qTF("g7_9_english_008", "7-9", "English", "English",
    "The plural form of the noun \"crisis\" is written as \"crisises\".",
    false
  ),
  qTF("g7_9_english_009", "7-9", "English", "English",
    "An adjective clause usually begins with a relative pronoun like \"who\", \"which\", or \"that\".",
    true
  ),

  qMC("g7_9_social_001", "7-9", "Social Studies", "Social Studies",
    "Which arm of government in Jamaica is responsible for making and passing new laws?",
    [
      { key: "A", text: "The Judiciary" },
      { key: "B", text: "The Executive" },
      { key: "C", text: "The Legislature" },
      { key: "D", text: "The Civil Service" }
    ],
    "C"
  ),
  qTF("g7_9_social_002", "7-9", "Social Studies", "Social Studies",
    "The Governor-General of Jamaica is directly elected by the citizens during standard general elections.",
    false
  ),
  qMC("g7_9_social_003", "7-9", "Social Studies", "Social Studies",
    "What economic term describes a situation where a country's value of imports is higher than its value of exports?",
    [
      { key: "A", text: "Trade surplus" },
      { key: "B", text: "Trade deficit" },
      { key: "C", text: "Inflation" },
      { key: "D", text: "Recession" }
    ],
    "B"
  ),
  qTF("g7_9_social_004", "7-9", "Social Studies", "Social Studies",
    "Urbanization describes the migration of populations away from crowded cities into rural farming districts.",
    false
  ),
  qTF("g7_9_social_005", "7-9", "Social Studies", "Social Studies",
    "GCT stands for General Consumption Tax, which is an example of an indirect tax.",
    true
  ),
  qMC("g7_9_social_006", "7-9", "Social Studies", "Social Studies",
    "Choose the term that describes the loss of highly educated, skilled, and professional workers who emigrate to work in wealthier nations.",
    [
      { key: "A", text: "Population density" },
      { key: "B", text: "Brain drain" },
      { key: "C", text: "Urban sprawl" },
      { key: "D", text: "Acculturation" }
    ],
    "B"
  ),
  qTF("g7_9_social_007", "7-9", "Social Studies", "Social Studies",
    "A bilateral trade agreement is an agreement made between exactly two countries.",
    true
  ),
  qTF("g7_9_social_008", "7-9", "Social Studies", "Social Studies",
    "A dependency ratio compares the working-age population against the non-working young and elderly populations.",
    true
  ),

  qMC("g7_9_science_001", "7-9", "Integrated Science", "Integrated Science",
    "Which organelle inside a cell is commonly known as the site where protein synthesis takes place?",
    [
      { key: "A", text: "Mitochondrion" },
      { key: "B", text: "Ribosome" },
      { key: "C", text: "Vacuole" },
      { key: "D", text: "Nucleus" }
    ],
    "B"
  ),
  qTF("g7_9_science_002", "7-9", "Integrated Science", "Integrated Science",
    "Physical weathering changes the chemical composition of a rock as it breaks down.",
    false
  ),
  qMC("g7_9_science_003", "7-9", "Integrated Science", "Integrated Science",
    "Which type of human blood vessels possess thick, muscular walls to carry blood away from the heart under high pressure?",
    [
      { key: "A", text: "Veins" },
      { key: "B", text: "Capillaries" },
      { key: "C", text: "Arteries" },
      { key: "D", text: "Venules" }
    ],
    "C"
  ),
  qTF("g7_9_science_004", "7-9", "Integrated Science", "Integrated Science",
    "Light waves travel through a vacuum at a speed faster than sound waves.",
    true
  ),
  qTF("g7_9_science_005", "7-9", "Integrated Science", "Integrated Science",
    "A solution with a pH value of 3 is considered to be highly alkaline.",
    false
  ),
  qMC("g7_9_science_006", "7-9", "Integrated Science", "Integrated Science",
    "Which vitamin deficiency is the direct cause of the condition known as scurvy, which affects gums and skin healing?",
    [
      { key: "A", text: "Vitamin A" },
      { key: "B", text: "Vitamin B" },
      { key: "C", text: "Vitamin C" },
      { key: "D", text: "Vitamin D" }
    ],
    "C"
  ),
  qTF("g7_9_science_007", "7-9", "Integrated Science", "Integrated Science",
    "Periodic table groups run vertically and contain elements that share similar outer-shell electron configurations.",
    true
  ),
  qTF("g7_9_science_008", "7-9", "Integrated Science", "Integrated Science",
    "Respiration is an example of an endothermic process because it stores solar energy in cells.",
    false
  ),
  qMC("g7_9_science_009", "7-9", "Integrated Science", "Integrated Science",
    "Choose the gas that is the primary contributor to global warming and the greenhouse effect.",
    [
      { key: "A", text: "Oxygen" },
      { key: "B", text: "Nitrogen" },
      { key: "C", text: "Carbon dioxide" },
      { key: "D", text: "Helium" }
    ],
    "C"
  ),
  qTF("g7_9_science_010", "7-9", "Integrated Science", "Integrated Science",
    "Pure distilled water conducts electricity as easily as seawater.",
    false
  ),

  qMC("g7_9_history_001", "7-9", "Jamaican History", "Jamaican History",
    "What was the name of the runaway slave community established in the mountains of western Jamaica, led by Cudjoe?",
    [
      { key: "A", text: "Windward Maroons" },
      { key: "B", text: "Leeward Maroons" },
      { key: "C", text: "Taino Villages" },
      { key: "D", text: "Seville Nueva" }
    ],
    "B"
  ),
  qTF("g7_9_history_002", "7-9", "Jamaican History", "Jamaican History",
    "The Abolition of the Slave Trade Act passed by the British Parliament in 1807 immediately freed all slaves in Jamaica.",
    false
  ),
  qTF("g7_9_history_003", "7-9", "Jamaican History", "Jamaican History",
    "Christopher Columbus first sighted the coast of Jamaica during his second voyage to the New World in 1494.",
    true
  ),
  qTF("g7_9_history_004", "7-9", "Jamaican History", "Jamaican History",
    "The capital of Jamaica was moved from Spanish Town to Kingston in the year 1872.",
    true
  ),
  qTF("g7_9_history_005", "7-9", "Jamaican History", "Jamaican History",
    "Sir Alexander Bustamante and Norman Washington Manley were the two central figures who led Jamaica's labor movements and political development toward independence.",
    true
  ),
  qMC("g7_9_history_006", "7-9", "Jamaican History", "Jamaican History",
    "Choose the system of forced labor that the Spanish used to exploit the indigenous Taino population when they first occupied Jamaica.",
    [
      { key: "A", text: "Triangular Trade" },
      { key: "B", text: "Encomienda" },
      { key: "C", text: "Asiento" },
      { key: "D", text: "Amelioration" }
    ],
    "B"
  ),
  qTF("g7_9_history_007", "7-9", "Jamaican History", "Jamaican History",
    "Universal Adult Suffrage, achieved in Jamaica in 1944, gave all adults the right to vote in national elections regardless of race, gender, or property ownership.",
    true
  ),

  qMC("g7_9_geography_001", "7-9", "Geography", "Geography",
    "Which type of rock is formed when existing sedimentary or igneous rocks are altered by intense heat and underground pressure?",
    [
      { key: "A", text: "Volcanic rock" },
      { key: "B", text: "Metamorphic rock" },
      { key: "C", text: "Limestone rock" },
      { key: "D", text: "Pyroclastic rock" }
    ],
    "B"
  ),
  qTF("g7_9_geography_002", "7-9", "Geography", "Geography",
    "Lines of longitude run parallel to the Equator and measure distances north and south of it.",
    false
  ),
  qMC("g7_9_geography_003", "7-9", "Geography", "Geography",
    "Choose the scale that is primarily used to measure the total amount of energy or absolute magnitude released by an earthquake.",
    [
      { key: "A", text: "Saffir-Simpson scale" },
      { key: "B", text: "Richter scale" },
      { key: "C", text: "Mercalli scale" },
      { key: "D", text: "Beaufort scale" }
    ],
    "B"
  ),
  qTF("g7_9_geography_004", "7-9", "Geography", "Geography",
    "Relief or orographic rainfall occurs when moisture-laden air is forced to rise up over a high mountain range.",
    true
  ),
  qTF("g7_9_geography_005", "7-9", "Geography", "Geography",
    "Constructive coastal waves have a powerful backwash that pulls large amounts of sand away from a beach.",
    false
  ),
  qMC("g7_9_geography_006", "7-9", "Geography", "Geography",
    "Which parish in Jamaica is renowned for its vast, high-grade bauxite reserves and intensive mining operations?",
    [
      { key: "A", text: "Hanover" },
      { key: "B", text: "Portland" },
      { key: "C", text: "Manchester" },
      { key: "D", text: "St. Thomas" }
    ],
    "C"
  ),
  qTF("g7_9_geography_007", "7-9", "Geography", "Geography",
    "Weathering refers strictly to the transport and removal of rock particles by active wind and river water.",
    false
  ),
  qTF("g7_9_geography_008", "7-9", "Geography", "Geography",
    "Global lines of latitude are used by cartographers to calculate local time zones around the world.",
    false
  ),
  qMC("g7_9_geography_009", "7-9", "Geography", "Geography",
    "Choose the term that describes a rapid, gravity-driven movement of soil, rocks, and debris down a steep hillside.",
    [
      { key: "A", text: "Soil creep" },
      { key: "B", text: "Landslide" },
      { key: "C", text: "Exfoliation" },
      { key: "D", text: "Abrasion" }
    ],
    "B"
  ),
  qTF("g7_9_geography_010", "7-9", "Geography", "Geography",
    "The Equator represents the line of 0 degrees latitude that divides the Earth into the Northern and Southern Hemispheres.",
    true
  ),

  qMC("g7_9_music_001", "7-9", "Music", "Music",
    "Which fast-paced genre of popular music emerged in Jamaica in the late 1950s, combining elements of mento with American rhythm and blues?",
    [
      { key: "A", text: "Rocksteady" },
      { key: "B", text: "Ska" },
      { key: "C", text: "Dub" },
      { key: "D", text: "Dancehall" }
    ],
    "B"
  ),
  qTF("g7_9_music_002", "7-9", "Music", "Music",
    "A sharp sign placed before a musical note lowers its pitch by a half-step or semitone.",
    false
  ),
  qMC("g7_9_music_003", "7-9", "Music", "Music",
    "Choose the iconic Jamaican music genre that developed around 1966, noted for its slowed-down tempo, prominent basslines, and focus on romantic or social themes.",
    [
      { key: "A", text: "Ska" },
      { key: "B", text: "Rocksteady" },
      { key: "C", text: "Mento" },
      { key: "D", text: "Soca" }
    ],
    "B"
  ),
  qTF("g7_9_music_004", "7-9", "Music", "Music",
    "A standard musical staff is constructed using exactly five horizontal lines and four spaces.",
    true
  ),
  qTF("g7_9_music_005", "7-9", "Music", "Music",
    "Syncopation involves placing dynamic rhythmic accents or stresses on the weak or off-beats of a measure.",
    true
  ),
  qMC("g7_9_music_006", "7-9", "Music", "Music",
    "Which dynamic instruction tells a musician that a particular section of music should be played very softly?",
    [
      { key: "A", text: "Fortissimo" },
      { key: "B", text: "Mezzo forte" },
      { key: "C", text: "Crescendo" },
      { key: "D", text: "Pianissimo" }
    ],
    "D"
  ),
  qTF("g7_9_music_007", "7-9", "Music", "Music",
    "An octave represents a musical interval that spans exactly eight notes on a standard diatonic scale.",
    true
  ),
  qTF("g7_9_music_008", "7-9", "Music", "Music",
    "Homophonic texture consists of multiple, entirely independent melodies playing simultaneously.",
    false
  ),
  qMC("g7_9_music_009", "7-9", "Music", "Music",
    "What time signature represents compound duple meter, commonly found in folk songs?",
    [
      { key: "A", text: "2/4" },
      { key: "B", text: "3/4" },
      { key: "C", text: "4/4" },
      { key: "D", text: "6/8" }
    ],
    "D"
  ),

  // =========================
  // GRADES 10–11
  // =========================
  qTF("g10_11_math_001", "10-11", "Mathematics", "Mathematics",
    "If two lines are perpendicular, the product of their gradients is exactly -1.",
    true
  ),
  qTF("g10_11_math_002", "10-11", "Mathematics", "Mathematics",
    "The sine of a 150-degree angle is a negative value.",
    false
  ),
  qTF("g10_11_math_003", "10-11", "Mathematics", "Mathematics",
    "A cyclic quadrilateral must have opposite angles that add up to 180 degrees.",
    true
  ),
  qTF("g10_11_math_004", "10-11", "Mathematics", "Mathematics",
    "The transpose of a 2x3 matrix results in a matrix with dimensions 3x2.",
    true
  ),

  qTF("g10_11_english_001", "10-11", "English Language", "English Language",
    "A summary must include your personal interpretation and opinions of the source text.",
    false
  ),
  qTF("g10_11_english_002", "10-11", "English Language", "English Language",
    "In formal persuasive writing, conversational contractions like \"don't\" and \"won't\" should be avoided.",
    true
  ),
  qMC("g10_11_english_003", "10-11", "English Language", "English Language",
    "Fill in the blank: \"The heavy rainfall will drastically ____ the crop harvest this year.\"",
    [
      { key: "A", text: "affect" },
      { key: "B", text: "effect" },
      { key: "C", text: "infect" },
      { key: "D", text: "defect" }
    ],
    "A"
  ),
  qTF("g10_11_english_004", "10-11", "English Language", "English Language",
    "An expository essay aims to entertain the reader using highly descriptive language.",
    false
  ),
  qMC("g10_11_english_005", "10-11", "English Language", "English Language",
    "Choose the word closest in meaning to \"Pragmatic\".",
    [
      { key: "A", text: "Idealistic" },
      { key: "B", text: "Practical" },
      { key: "C", text: "Theoretical" },
      { key: "D", text: "Emotional" }
    ],
    "B"
  ),
  qTF("g10_11_english_006", "10-11", "English Language", "English Language",
    "Irregardless is accepted as standard formal English vocabulary in descriptive essays.",
    false
  ),
  qMC("g10_11_english_007", "10-11", "English Language", "English Language",
    "Fill in the blank: \"Neither the principal nor the teachers ____ present at the conference.\"",
    [
      { key: "A", text: "was" },
      { key: "B", text: "were" },
      { key: "C", text: "is" },
      { key: "D", text: "am" }
    ],
    "B"
  ),
  qTF("g10_11_english_008", "10-11", "English Language", "English Language",
    "Redundancy is the unnecessary repetition of words or expressions that mean the same thing.",
    true
  ),

  qTF("g10_11_lit_001", "10-11", "English Literature", "English Literature",
    "A sonnet always consists of exactly fourteen lines.",
    true
  ),
  qTF("g10_11_lit_002", "10-11", "English Literature", "English Literature",
    "An omniscient narrator is a character inside the story who tells events from their personal perspective.",
    false
  ),
  qTF("g10_11_lit_003", "10-11", "English Literature", "English Literature",
    "A motif is a recurring image, object, or phrase that helps develop the central theme of a literary work.",
    true
  ),
  qTF("g10_11_lit_004", "10-11", "English Literature", "English Literature",
    "A ballad is a narrative poem originally structured to be sung or recited.",
    true
  ),
  qTF("g10_11_lit_005", "10-11", "English Literature", "English Literature",
    "Free verse poetry must conform to a strict rhyme scheme and regular rhythmic meter.",
    false
  ),

  qTF("g10_11_bio_001", "10-11", "Biology", "Biology",
    "Anaerobic respiration in human muscle tissue yields lactic acid and carbon dioxide gas.",
    false
  ),
  qTF("g10_11_bio_002", "10-11", "Biology", "Biology",
    "Meiosis results in four genetically diverse haploid daughter cells.",
    true
  ),
  qTF("g10_11_bio_003", "10-11", "Biology", "Biology",
    "Phloem vessels consist of living cells that transport manufactured sugars throughout a plant.",
    true
  ),
  qTF("g10_11_bio_004", "10-11", "Biology", "Biology",
    "Deconstructive breakdown of ozone layers is caused by photosynthetic plant activity.",
    false
  ),
  qTF("g10_11_bio_005", "10-11", "Biology", "Biology",
    "Glucagon triggers the liver to break down stored glycogen into glucose when blood sugar is low.",
    true
  ),

  qTF("g10_11_chem_001", "10-11", "Chemistry", "Chemistry",
    "Exothermic reactions absorb heat energy from the surrounding environment, causing temperatures to drop.",
    false
  ),
  qTF("g10_11_chem_002", "10-11", "Chemistry", "Chemistry",
    "Isotopes are atoms of the same element with identical numbers of protons but different numbers of neutrons.",
    true
  ),
  qTF("g10_11_chem_003", "10-11", "Chemistry", "Chemistry",
    "Adding a catalyst shifts the equilibrium position of a reversible chemical reaction.",
    false
  ),
  qTF("g10_11_chem_004", "10-11", "Chemistry", "Chemistry",
    "Oxidation is defined as the structural gain of electrons during a chemical reaction.",
    false
  ),
  qTF("g10_11_chem_005", "10-11", "Chemistry", "Chemistry",
    "Hard water contains high concentrations of dissolved Calcium and Magnesium ions.",
    true
  ),

  qTF("g10_11_phys_001", "10-11", "Physics", "Physics",
    "Total internal reflection can only happen when light travels from a less dense medium to a more dense medium.",
    false
  ),
  qTF("g10_11_phys_002", "10-11", "Physics", "Physics",
    "Alpha radiation has the highest penetrating power among the three main types of nuclear radiation.",
    false
  ),
  qTF("g10_11_phys_003", "10-11", "Physics", "Physics",
    "Real images are always inverted and can be projected onto a screen.",
    true
  ),
  qTF("g10_11_phys_004", "10-11", "Physics", "Physics",
    "Pressure in a fluid decreases as depth increases.",
    false
  ),
  qTF("g10_11_phys_005", "10-11", "Physics", "Physics",
    "Vector quantities possess both magnitude and a specific structural direction.",
    true
  ),

  qTF("g10_11_hist_001", "10-11", "History", "History",
    "The Amelioration proposals were introduced by British humanitarians in 1823 to immediately abolish slavery without a transition period.",
    false
  ),
  qTF("g10_11_hist_002", "10-11", "History", "History",
    "The encomienda system was designed by the Spanish to grant protective lands and total equality to Taino communities.",
    false
  ),
  qTF("g10_11_hist_003", "10-11", "History", "History",
    "The Dutch West India Company played a leading role in supplying enslaved laborers to Caribbean sugar plantations during the 17th century.",
    true
  ),
  qTF("g10_11_hist_004", "10-11", "History", "History",
    "The corporate status of Crown Colony Government was declared in Jamaica in 1655 immediately following the British capture.",
    false
  ),
  qTF("g10_11_hist_005", "10-11", "History", "History",
    "Pure, unmodified chattel slavery allowed enslaved individuals to buy legal shares in the plantation infrastructure.",
    false
  ),

  qTF("g10_11_geo_001", "10-11", "Geography", "Geography",
    "Lines of longitude run parallel to the Equator and measure distances north and south of it.",
    false
  ),
  qTF("g10_11_geo_002", "10-11", "Geography", "Geography",
    "Relief or orographic rainfall occurs when moisture-laden air is forced to rise up over a high mountain range.",
    true
  ),
  qTF("g10_11_geo_003", "10-11", "Geography", "Geography",
    "Constructive coastal waves have a powerful backwash that pulls large amounts of sand away from a beach.",
    false
  ),
  qTF("g10_11_geo_004", "10-11", "Geography", "Geography",
    "Weathering refers strictly to the transport and removal of rock particles by active wind and river water.",
    false
  ),
  qTF("g10_11_geo_005", "10-11", "Geography", "Geography",
    "Global lines of latitude are used by cartographers to calculate local time zones around the world.",
    false
  ),
  qTF("g10_11_geo_006", "10-11", "Geography", "Geography",
    "The Equator represents the line of 0 degrees latitude that divides the Earth into the Northern and Southern Hemispheres.",
    true
  ),

  qTF("g10_11_bus_001", "10-11", "Business", "Business",
    "Double-entry bookkeeping dictates that for every debit entry, there must be a corresponding credit entry.",
    true
  ),
  qTF("g10_11_bus_002", "10-11", "Business", "Business",
    "A franchise is a business setup where a person owns shares in a cooperative state utility.",
    false
  ),
  qTF("g10_11_bus_003", "10-11", "Business", "Business",
    "Collateral is an asset pledged by a borrower to secure a loan, which can be claimed by the lender if default occurs.",
    true
  ),
  qTF("g10_11_bus_004", "10-11", "Business", "Business",
    "A nominal account is an account used to record long-term tangible capital assets like machinery and buildings.",
    false
  ),
  qTF("g10_11_bus_005", "10-11", "Business", "Business",
    "The imprest system is an accounting method used to manage and control petty cash expenditures.",
    true
  ),

  qTF("g10_11_it_001", "10-11", "Information Technology", "Information Technology",
    "ROM is a volatile form of memory that clears its content when the system loses power.",
    false
  ),
  qTF("g10_11_it_002", "10-11", "Information Technology", "Information Technology",
    "Phishing is an administrative method used to encrypt hard drive storage units to prevent data theft.",
    false
  ),
  qTF("g10_11_it_003", "10-11", "Information Technology", "Information Technology",
    "Cloud computing refers to storing data on localized physical magnetic tape drives inside an office.",
    false
  ),
  qTF("g10_11_it_004", "10-11", "Information Technology", "Information Technology",
    "A primary key value can be duplicate or null within a database table.",
    false
  ),
  qTF("g10_11_it_005", "10-11", "Information Technology", "Information Technology",
    "Ascending order means sorting text data from Z to A.",
    false
  ),

  qTF("g10_11_music_001", "10-11", "Music", "Music",
    "In compound time signatures, the basic beat unit is always divisible into three equal parts.",
    true
  ),
  qTF("g10_11_music_002", "10-11", "Music", "Music",
    "A diatonic scale consists of a specific arrangement of five whole steps and two half steps.",
    true
  ),
  qTF("g10_11_music_003", "10-11", "Music", "Music",
    "A diminished triad chord consists of a root note stacked with a minor third and a diminished fifth interval.",
    true
  ),
  qTF("g10_11_music_004", "10-11", "Music", "Music",
    "A semitone is the largest pitch interval possible within traditional Western musical scales.",
    false
  ),
  qTF("g10_11_music_005", "10-11", "Music", "Music",
    "Monophonic texture features a complex weave of independent, competing vocal lines.",
    false
  )
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
/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

const qSA = (id, subject, category, prompt, correctAnswer, explanation) => ({
  id,
  gradeBand: "10-11",
  subject,
  category,
  type: "short_answer",
  difficulty: "hard",
  prompt,
  correctAnswer,
  explanation
});

const qTF = (id, subject, category, prompt, correctBoolean, explanation) => ({
  id,
  gradeBand: "10-11",
  subject,
  category,
  type: "true_false",
  difficulty: "hard",
  prompt,
  correctBoolean,
  explanation
});

const qMC = (id, subject, category, prompt, choices, correctChoice, explanation) => ({
  id,
  gradeBand: "10-11",
  subject,
  category,
  type: "multiple_choice",
  difficulty: "hard",
  prompt,
  choices,
  correctChoice,
  explanation
});

const questions = [
  // Mathematics
  qSA("g10_11_math_001", "Mathematics", "Mathematics", "If f(x) = 3x^2 - 5x + 2, find the value of f(-2).", "24", "Substitute x = -2, then calculate 3(-2)^2 - 5(-2) + 2 = 24."),
  qSA("g10_11_math_002", "Mathematics", "Mathematics", "Calculate the length of the vector v = (5, -12).", "13", "The length of a vector is the square root of the sum of the squares of its components."),
  qTF("g10_11_math_003", "Mathematics", "Mathematics", "If two lines are perpendicular, the product of their gradients is exactly -1.", true, "The product of the gradients of two perpendicular lines is -1."),
  qSA("g10_11_math_004", "Mathematics", "Mathematics", "Solve for x using the matrix equation: [[2,3],[1,4]] [x,1] = [7,9].", "2", "The matrix equation can be solved using matrix operations."),
  qSA("g10_11_math_005", "Mathematics", "Mathematics", "What is the scale factor of an enlargement if the area of the image is 36 times the area of the object?", "6", "The scale factor is the ratio of the areas of the image and object."),
  qSA("g10_11_math_006", "Mathematics", "Mathematics", "State the number of subsets that can be formed from a set containing 5 elements.", "32", "The number of subsets is 2^n, where n is the number of elements."),
  qSA("g10_11_math_007", "Mathematics", "Mathematics", "Find the sum of the interior angles of a regular polygon with 10 sides.", "1440 degrees", "The sum of the interior angles of a regular polygon with n sides is (n-2)*180 degrees."),
  qTF("g10_11_math_008", "Mathematics", "Mathematics", "The sine of a 150-degree angle is a negative value.", false, "The sine of a 150-degree angle is a negative value."),
  qSA("g10_11_math_009", "Mathematics", "Mathematics", "Calculate the volume of a cylinder with a radius of 3 cm and a height of 7 cm. Use pi = 22/7.", "198 cm³", "The volume of a cylinder is pi*r²*h."),
  qSA("g10_11_math_010", "Mathematics", "Mathematics", "Factorize the quadratic expression completely: 2x^2 - 7x + 3.", "(2x - 1)(x - 3)", "The quadratic expression can be factorized."),
  qSA("g10_11_math_011", "Mathematics", "Mathematics", "What is the gradient of a line running parallel to the line 4x - 2y = 8?", "2", "The gradient of a line parallel to 4x - 2y = 8 is 2."),
  qSA("g10_11_math_012", "Mathematics", "Mathematics", "Find the upper class boundary for the class interval 25 - 29.", "29.5", "The upper class boundary is 29.5."),
  qTF("g10_11_math_013", "Mathematics", "Mathematics", "A cyclic quadrilateral must have opposite angles that add up to 180 degrees.", true, "The opposite angles of a cyclic quadrilateral add up to 180 degrees."),
  qSA("g10_11_math_014", "Mathematics", "Mathematics", "If log2(x) = 5, find x.", "32", "The value of x is 32."),
  qSA("g10_11_math_015", "Mathematics", "Mathematics", "Calculate the total surface area of a cube whose volume is 64 cm³.", "96 cm²", "The total surface area of a cube is 6a², where a is the side length."),
  qSA("g10_11_math_016", "Mathematics", "Mathematics", "Find the coordinates of the midpoint between P(-3, 8) and Q(5, -2).", "(1, 3)", "The midpoint is (1, 3)."),
  qTF("g10_11_math_017", "Mathematics", "Mathematics", "The transpose of a 2x3 matrix results in a matrix with dimensions 3x2.", true, "The transpose of a 2x3 matrix is a 3x2 matrix."),
  qSA("g10_11_math_018", "Mathematics", "Mathematics", "Determine the standard deviation of a dataset where all values are identical.", "0", "The standard deviation is 0."),
  qSA("g10_11_math_019", "Mathematics", "Mathematics", "What is the value of tan(45°)?", "1", "The value of tan(45°) is 1."),
  qSA("g10_11_math_020", "Mathematics", "Mathematics", "Find the roots of the equation x^2 - 9 = 0.", "x = 3, x = -3", "The roots are 3 and -3."),

  // English Language
  qSA("g10_11_eng_001", "English", "English Language", "Identify the grammatical error: 'The criteria for passing the CSEC exam requires steady practice.'", "'requires' should be 'require'"),
  qSA("g10_11_eng_002", "English", "English Language", "What type of clause is underlined: 'The student who scored the highest marks received a prize.'", "Adjective clause"),
  qTF("g10_11_eng_003", "English", "English Language", "A summary must include your personal interpretation and opinions of the source text.", false, "The summary must include personal interpretation."),
  qSA("g10_11_eng_004", "English", "English Language", "Choose the word that best completes the analogy: Condone is to Punish as Accept is to ________.", "Reject"),
  qSA("g10_11_eng_005", "English", "English Language", "What is the formal term for an overused expression that has lost its vividness?", "Cliché"),
  qSA("g10_11_eng_006", "English", "English Language", "Replace the underlined phrase with a single word: 'The manager called off the meeting without any warning.'", "Abruptly"),
  qTF("g10_11_eng_007", "English", "English Language", "In formal persuasive writing, conversational contractions like 'don't' and 'won't' should be avoided.", true, "The contractions should be avoided."),
  qSA("g10_11_eng_008", "English", "English Language", "Identify the tone of: 'Oh wonderful, another leak in the ceiling to fix during my vacation.'", "Sarcastic"),
  qSA("g10_11_eng_009", "English", "English Language", "What error occurs when two independent clauses are joined with only a comma and no coordinating conjunction?", "Comma splice"),
  qMC("g10_11_eng_010", "English", "English Language", "Fill in the blank: 'The heavy rainfall will drastically ____ the crop harvest this year.'", [
    { key: "A", text: "affect" },
    { key: "B", text: "effect" },
    { key: "C", text: "infect" },
    { key: "D", text: "defect" }
  ], "A", "The rainfall will affect the crop harvest."),
  qSA("g10_11_eng_011", "English", "English Language", "Identify the passive voice version of: 'The wind destroyed the old canopy.'", "The old canopy was destroyed by the wind."),
  qTF("g10_11_eng_012", "English", "English Language", "An expository essay aims to entertain the reader using highly descriptive language.", false, "The essay aims to inform."),
  qSA("g10_11_eng_013", "English", "English Language", "What punctuation mark is used to introduce a long structural block quote or list of items?", "Colon"),
  qMC("g10_11_eng_014", "English", "English Language", "Choose the word closest in meaning to 'Pragmatic':", [
    { key: "A", text: "Idealistic" },
    { key: "B", text: "Practical" },
    { key: "C", text: "Theoretical" },
    { key: "D", text: "Emotional" }
  ], "B", "The word 'pragmatic' means practical."),
  qSA("g10_11_eng_015", "English", "English Language", "What sentence element is missing from a fragment?", "A subject or a predicate"),
  qTF("g10_11_eng_016", "English", "English Language", "The word 'irregardless' is accepted as standard formal English vocabulary in descriptive essays.", false, "The word 'irregardless' is not standard."),
  qSA("g10_11_eng_017", "English", "English Language", "Identify the figure of speech: 'The island economy is a ship navigating stormy seas.'", "Metaphor"),
  qMC("g10_11_eng_018", "English", "English Language", "Fill in the blank: 'Neither the principal nor the teachers ____ present at the conference.'", [
    { key: "A", text: "was" },
    { key: "B", text: "were" },
    { key: "C", text: "is" },
    { key: "D", text: "am" }
  ], "B", "The principal and teachers were present."),
  qSA("g10_11_eng_019", "English", "English Language", "What formal writing structural element links paragraphs smoothly together to maintain logical flow?", "Transitions"),
  qTF("g10_11_eng_020", "English", "English Language", "Redundancy is the unnecessary repetition of words or expressions that mean the same thing.", true, "The repetition is redundant."),

  // English Literature
  qSA("g10_11_lit_001", "English", "English Literature", "What form of dramatic dialogue involves a character speaking their thoughts out loud to the audience while alone on stage?", "Soliloquy"),
  qSA("g10_11_lit_002", "English", "English Literature", "Name the poetic device where a sentence or phrase runs over from one poetic line to the next without terminal punctuation.", "Enjambment"),
  qTF("g10_11_lit_003", "English", "English Literature", "A sonnet always consists of exactly fourteen lines.", true, "The sonnet consists of exactly fourteen lines."),
  qSA("g10_11_lit_004", "English", "English Literature", "What literary term describes an opening event or background information that sets up the main conflict in a play?", "Exposition"),
  qSA("g10_11_lit_005", "English", "English Literature", "Which West Indian author wrote The Wine of Astonishment?", "Earl Lovelace"),
  qSA("g10_11_lit_006", "English", "English Literature", "What term describes a stark contrast between what a character expects to happen and what actually happens?", "Situational irony"),
  qTF("g10_11_lit_007", "English", "English Literature", "An omniscient narrator is a character inside the story who tells events from their personal perspective.", false, "The narrator is omniscient."),
  qSA("g10_11_lit_008", "English", "English Literature", "What poetic foot consists of an unstressed syllable followed by a stressed syllable?", "Iamb"),
  qSA("g10_11_lit_009", "English", "English Literature", "Name the tragic flaw or error in judgment that leads directly to the downfall of a tragic hero.", "Hamartia"),
  qSA("g10_11_lit_010", "English", "English Literature", "Fill in the blank: A poem written to express grief or lamentation for someone who has died is an ________.", "elegy"),
  qSA("g10_11_lit_011", "English", "English Literature", "Identify the device used here: 'Parting is such sweet sorrow.'", "Oxymoron"),
  qTF("g10_11_lit_012", "English", "English Literature", "A motif is a recurring image, object, or phrase that helps develop the central theme of a literary work.", true, "The motif is a recurring image."),
  qSA("g10_11_lit_013", "English", "English Literature", "Who wrote Ti-Jean and His Brothers?", "Derek Walcott"),
  qSA("g10_11_lit_014", "English", "English Literature", "What do we call a character who contrasts sharply with another character, highlighting specific traits of the protagonist?", "Foil"),
  qSA("g10_11_lit_015", "English", "English Literature", "What figure of speech uses an understatement to imply a positive attribute, such as saying 'He is not unwise'?", "Litotes"),
  qTF("g10_11_lit_016", "English", "English Literature", "A ballad is a narrative poem originally structured to be sung or recited.", true, "The ballad is structured to be sung."),
  qSA("g10_11_lit_017", "English", "English Literature", "What is the final resolution or unraveling of the plot details at the end of a drama called?", "Denouement"),
  qSA("g10_11_lit_018", "English", "English Literature", "Identify the structural format of a play where actors speak directly to the audience, breaking the illusion of the stage.", "Breaking the fourth wall"),
  qTF("g10_11_lit_019", "English", "English Literature", "Free verse poetry must conform to a strict rhyme scheme and regular rhythmic meter.", false, "The poetry is free verse."),
  qSA("g10_11_lit_020", "English", "English Literature", "What literary term describes an object, action, or setting that stands for an abstract idea beyond its literal meaning?", "Symbol"),

  // Biology
  qSA("g10_11_bio_001", "Biology", "Biology", "What is the precise name of the process by which green plants split water molecules using solar energy during light-dependent reactions?", "Photolysis"),
  qSA("g10_11_bio_002", "Biology", "Biology", "Which organelle inside eukaryotic cells contains hydrolytic enzymes used for cellular digestion and waste breakdown?", "Lysosome"),
  qTF("g10_11_bio_003", "Biology", "Biology", "Anaerobic respiration in human muscle tissue yields lactic acid and carbon dioxide gas.", false, "The respiration yields lactic acid and carbon dioxide."),
  qSA("g10_11_bio_004", "Biology", "Biology", "What nitrogenous base pairs up with Adenine inside DNA?", "Thymine"),
  qSA("g10_11_bio_005", "Biology", "Biology", "Which hormone lowers high blood glucose levels by triggering body cells to store it as glycogen?", "Insulin"),
  qSA("g10_11_bio_006", "Biology", "Biology", "What structural valve prevents the backflow of blood from the left ventricle into the left atrium?", "Bicuspid valve"),
  qTF("g10_11_bio_007", "Biology", "Biology", "Meiosis results in four genetically diverse haploid daughter cells.", true, "The meiosis results in four genetically diverse haploid daughter cells."),
  qSA("g10_11_bio_008", "Biology", "Biology", "What specialized plant cells control the opening and closing of stomata to regulate transpiration?", "Guard cells"),
  qSA("g10_11_bio_009", "Biology", "Biology", "Name the deficiency disease caused by a severe lack of protein in an individual's diet, despite getting enough calories.", "Kwashiorkor"),
  qSA("g10_11_bio_010", "Biology", "Biology", "Fill in the blank: The structural movement of food along the human digestive tract via wave-like muscle contractions is called ________.", "peristalsis"),
  qSA("g10_11_bio_011", "Biology", "Biology", "What blood vessels contain thin walls and one-way valves to return blood back to the heart under low pressure?", "Veins"),
  qTF("g10_11_bio_012", "Biology", "Biology", "Phloem vessels consist of living cells that transport manufactured sugars throughout a plant.", true, "The phloem consists of living cells."),
  qSA("g10_11_bio_013", "Biology", "Biology", "What term describes an organism that possesses two identical alleles for a specific gene?", "Homozygous"),
  qSA("g10_11_bio_014", "Biology", "Biology", "Which structural organ filters toxic substances out of the blood and converts excess amino acids into urea?", "Liver"),
  qSA("g10_11_bio_015", "Biology", "Biology", "What process allows water molecules to cross a selectively permeable membrane from low to high solute concentration?", "Osmosis"),
  qTF("g10_11_bio_016", "Biology", "Biology", "Deconstructive breakdown of ozone layers is caused by photosynthetic plant activity.", false, "The breakdown is not caused by photosynthetic plant activity."),
  qSA("g10_11_bio_017", "Biology", "Biology", "What unique category of consumer organism breaks down dead organic matter externally before absorbing nutrients?", "Saprophytes"),
  qSA("g10_11_bio_018", "Biology", "Biology", "What layer of the skin contains sweat glands, hair follicles, and blood capillaries?", "Dermis"),
  qTF("g10_11_bio_019", "Biology", "Biology", "Glucagon triggers the liver to break down stored glycogen into glucose when blood sugar is low.", true, "The glucagon triggers the liver to break down stored glycogen."),
  qSA("g10_11_bio_020", "Biology", "Biology", "What do you call the mechanical and chemical barriers that defend the human body against incoming pathogens?", "Immune system"),

  // Chemistry
  qSA("g10_11_chem_001", "Chemistry", "Chemistry", "What type of bonding involves the electrostatic attraction between a shared pair of electrons and the nuclei of two non-metals?", "Covalent bonding"),
  qSA("g10_11_chem_002", "Chemistry", "Chemistry", "State the number of moles present in 44 grammes of carbon dioxide gas (CO2).", "1 mole"),
  qTF("g10_11_chem_003", "Chemistry", "Chemistry", "Exothermic reactions absorb heat energy from the surrounding environment, causing temperatures to drop.", false, "The reactions absorb heat."),
  qSA("g10_11_chem_004", "Chemistry", "Chemistry", "What name is given to elements in Group 7 of the periodic table?", "Halogens"),
  qSA("g10_11_chem_005", "Chemistry", "Chemistry", "What indicator turns a bright pink or magenta colour when added to a basic alkaline solution?", "Phenolphthalein"),
  qSA("g10_11_chem_006", "Chemistry", "Chemistry", "What structural method is used to separate a mixture of miscible liquids with different boiling points?", "Fractional distillation"),
  qTF("g10_11_chem_007", "Chemistry", "Chemistry", "Isotopes are atoms of the same element with identical numbers of protons but different numbers of neutrons.", true, "The isotopes are atoms of the same element."),
  qSA("g10_11_chem_008", "Chemistry", "Chemistry", "What raw mineral ore is refined through electrochemical reduction to produce pure aluminum metal?", "Bauxite"),
  qSA("g10_11_chem_009", "Chemistry", "Chemistry", "What structural functional group defines a molecule as a carboxylic acid?", "-COOH"),
  qSA("g10_11_chem_010", "Chemistry", "Chemistry", "Fill in the blank: The regular reaction between an acid and a base to form salt and water is called ________.", "neutralization"),
  qSA("g10_11_chem_011", "Chemistry", "Chemistry", "What structural particle is produced at the cathode during electrolysis of molten sodium chloride?", "Sodium metal"),
  qTF("g10_11_chem_012", "Chemistry", "Chemistry", "Adding a catalyst shifts the equilibrium position of a reversible chemical reaction.", false, "The catalyst shifts the equilibrium."),
  qSA("g10_11_chem_013", "Chemistry", "Chemistry", "What structural gas is evolved when a dilute acid reacts with a metal carbonate?", "Carbon dioxide"),
  qSA("g10_11_chem_014", "Chemistry", "Chemistry", "What specific property defines an unsaturated hydrocarbon molecule?", "Presence of at least one carbon-carbon double or triple bond"),
  qSA("g10_11_chem_015", "Chemistry", "Chemistry", "What atomic particle determines the atomic number of an element?", "Proton"),
  qTF("g10_11_chem_016", "Chemistry", "Chemistry", "Hard water contains high concentrations of dissolved calcium and magnesium ions.", true, "The water contains high concentrations."),
  qSA("g10_11_chem_017", "Chemistry", "Chemistry", "What is the term for a solution that cannot dissolve any more solute at a given specific temperature?", "Saturated solution"),
  qSA("g10_11_chem_018", "Chemistry", "Chemistry", "Name the process used to prevent iron from rusting by coating it with a protective layer of zinc.", "Galvanization"),
  qTF("g10_11_chem_019", "Chemistry", "Chemistry", "Oxidation is defined as the structural gain of electrons during a chemical reaction.", false, "The oxidation is the gain of electrons."),
  qSA("g10_11_chem_020", "Chemistry", "Chemistry", "What is the valency of an element belonging to Group 2 of the periodic table?", "2"),

  // Physics
  qSA("g10_11_phy_001", "Physics", "Physics", "State the operational formula for calculating kinetic energy.", "KE = 1/2mv^2"),
  qSA("g10_11_phy_002", "Physics", "Physics", "What physics principle states that the total upthrust on an object immersed in a fluid equals the weight of fluid displaced?", "Archimedes' principle"),
  qTF("g10_11_phy_003", "Physics", "Physics", "Total internal reflection can only happen when light travels from a less dense medium to a more dense medium.", false, "The reflection can only happen from a less dense to a more dense medium."),
  qSA("g10_11_phy_004", "Physics", "Physics", "What electrical instrument is always connected in parallel across a component to measure potential difference?", "Voltmeter"),
  qSA("g10_11_phy_005", "Physics", "Physics", "What is the unit of measurement for frequency?", "Hertz"),
  qSA("g10_11_phy_006", "Physics", "Physics", "Determine the current flowing through a 5-ohm resistor connected across a 10-volt power supply.", "2 Amperes"),
  qTF("g10_11_phy_007", "Physics", "Physics", "Alpha radiation has the highest penetrating power among the three main types of nuclear radiation.", false, "The alpha radiation has the highest penetrating power."),
  qSA("g10_11_phy_008", "Physics", "Physics", "What state property remains constant during an isothermal process?", "Temperature"),
  qSA("g10_11_phy_009", "Physics", "Physics", "What specific structural point inside an object acts as the location where its entire weight appears to be concentrated?", "Center of gravity"),
  qSA("g10_11_phy_010", "Physics", "Physics", "Fill in the blank: The rate of change of momentum of an object is directly proportional to the applied ________.", "force"),
  qSA("g10_11_phy_011", "Physics", "Physics", "What logic gate produces a high output only when all its inputs are low?", "NOR gate"),
  qTF("g10_11_phy_012", "Physics", "Physics", "Real images are always inverted and can be projected onto a screen.", true, "The images are inverted."),
  qSA("g10_11_phy_013", "Physics", "Physics", "What structural phenomenon causes two overlapping wave trains to form regions of reinforcement or cancellation?", "Interference"),
  qSA("g10_11_phy_014", "Physics", "Physics", "What unit measures thermodynamic work and mechanical energy?", "Joule"),
  qSA("g10_11_phy_015", "Physics", "Physics", "What scalar measurement counts the total path length traveled by an object, regardless of direction?", "Distance"),
  qTF("g10_11_phy_016", "Physics", "Physics", "Pressure in a fluid decreases as depth increases.", false, "The pressure decreases."),
  qSA("g10_11_phy_017", "Physics", "Physics", "What physical property describes a material's resistance to heat transfer?", "Thermal resistance"),
  qSA("g10_11_phy_018", "Physics", "Physics", "Name the atomic component released during nuclear fission that can trigger a self-sustaining chain reaction.", "Neutron"),
  qTF("g10_11_phy_019", "Physics", "Physics", "Vector quantities possess both magnitude and a specific structural direction.", true, "The vector quantities possess both magnitude and direction."),
  qSA("g10_11_phy_020", "Physics", "Physics", "What constant value defines the acceleration due to gravity near the Earth's surface in standard SI units?", "9.81 m/s²"),

  // History
  qSA("g10_11_hist_001", "History", "History", "What specific administrative agreement unified the British West Indies into a single political unit from 1958 to 1962?", "The West Indies Federation"),
  qSA("g10_11_hist_002", "History", "History", "Which indigenous group inhabited the Lesser Antilles and fiercely resisted early Spanish incursions using poisoned arrows?", "Kalinagos"),
  qTF("g10_11_hist_003", "History", "History", "The Amelioration proposals were introduced by British humanitarians in 1823 to immediately abolish slavery without a transition period.", false, "The proposals were not immediately abolished."),
  qSA("g10_11_hist_004", "History", "History", "Which legal act passed in Great Britain completely dissolved the trade of enslaved Africans across the Atlantic in 1807?", "The Slave Trade Abolition Act"),
  qSA("g10_11_hist_005", "History", "History", "Who was the historic leader of the 1791 slave insurrection in Saint-Domingue that led to the creation of the world's first black republic?", "Toussaint Louverture"),
  qSA("g10_11_hist_006", "History", "History", "What economic policy required European colonies to trade exclusively with their mother country to maximize national gold reserves?", "Mercantilism"),
  qTF("g10_11_hist_007", "History", "History", "The encomienda system was designed by the Spanish to grant protective lands and total equality to Taino communities.", false, "The encomienda system was not designed for that."),
  qSA("g10_11_hist_008", "History", "History", "What major riots broke out across the British Caribbean in 1938, leading directly to the establishment of the Moyne Commission?", "The 1938 Labour Riots"),
  qSA("g10_11_hist_009", "History", "History", "Which treaty signed in 1763 forced France to cede several Caribbean islands to Great Britain at the end of the Seven Years' War?", "Treaty of Paris"),
  qSA("g10_11_hist_010", "History", "History", "Fill in the blank: The historical movement of newly freed Africans off plantations to establish independent towns after 1838 is called the ________ movement.", "Free Village"),
  qSA("g10_11_hist_011", "History", "History", "Which religious group was active in Jamaica, establishing schools and preaching the gospel of freedom to slaves, directly leading to the 1831 war?", "Baptists"),
  qTF("g10_11_hist_012", "History", "History", "The Dutch West India Company played a leading role in supplying enslaved laborers to Caribbean sugar plantations during the 17th century.", true, "The Dutch West India Company played a leading role."),
  qSA("g10_11_hist_013", "History", "History", "What system of trade brought East Indian indentured laborers to the Caribbean between 1838 and 1917?", "Indentured immigration system"),
  qSA("g10_11_hist_014", "History", "History", "Name the dynamic female political figure who co-founded the Jamaica Labour Party alongside Alexander Bustamante.", "Lady Gladys Bustamante"),
  qTF("g10_11_hist_015", "History", "History", "Crown Colony Government was declared in Jamaica in 1655 immediately following the British capture.", false, "The Crown Colony Government was declared."),
  qSA("g10_11_hist_016", "History", "History", "What was the primary purpose of the Defiance and Slave Codes passed by Caribbean colonial assemblies?", "To legalise control, punishment, and subjection of enslaved people"),
  qSA("g10_11_hist_017", "History", "History", "Which Caribbean island was the first to experience a successful sugar revolution, shifting completely from tobacco to sugar by 1650?", "Barbados"),
  qTF("g10_11_hist_018", "History", "History", "Pure, unmodified chattel slavery allowed enslaved individuals to buy legal shares in plantation infrastructure.", false, "The enslaved individuals could buy legal shares."),
  qSA("g10_11_hist_019", "History", "History", "What specific dynamic led to the structural collapse of the West Indies Federation in 1961?", "Jamaica's withdrawal following a national referendum"),
  qSA("g10_11_hist_020", "History", "History", "Name the British Prime Minister whose administration passed the Emancipation Act of 1833.", "Earl Grey"),

  // Geography
  qSA("g10_11_geo_001", "Geography", "Geography", "What type of delta is formed when a river enters a sea with strong wave action, forming a smooth, arc-like shape?", "Arcuate delta"),
  qSA("g10_11_geo_002", "Geography", "Geography", "What specific layer of the soil profile contains the highest concentration of organic matter and humus?", "Topsoil"),
  qTF("g10_11_geo_003", "Geography", "Geography", "Limestone is a classic example of an intrusive igneous rock form.", false, "The limestone is not intrusive."),
  qSA("g10_11_geo_004", "Geography", "Geography", "What term describes the cooling of air as it rises and expands due to a decrease in atmospheric pressure?", "Adiabatic cooling"),
  qSA("g10_11_geo_005", "Geography", "Geography", "Which structural fold features a downward, trough-like bend in the layers of rock within the Earth's crust?", "Syncline"),
  qSA("g10_11_geo_006", "Geography", "Geography", "What specific statistical chart plots a country's population distribution by age groups and gender?", "Population pyramid"),
  qTF("g10_11_geo_007", "Geography", "Geography", "Mass wasting refers strictly to the transport of sediments by running river water.", false, "The mass wasting is not strictly by running river water."),
  qSA("g10_11_geo_008", "Geography", "Geography", "What type of coral reef is separated from a mainland coast by a deep, wide lagoon?", "Barrier reef"),
  qSA("g10_11_geo_009", "Geography", "Geography", "What index calculates the number of children who die before their first birthday per 1,000 live births in a year?", "Infant Mortality Rate"),
  qSA("g10_11_geo_010", "Geography", "Geography", "Fill in the blank: The global climate pattern characterized by the periodic warming of sea surface temperatures in the central and eastern Pacific is called ________.", "El Niño"),
  qSA("g10_11_geo_011", "Geography", "Geography", "What atmospheric instrument measures the relative humidity of the air using dry and wet-bulb thermometers?", "Hygrometer"),
  qTF("g10_11_geo_012", "Geography", "Geography", "Constructive waves possess a powerful swash and a weak backwash, building up sand on a beach.", true, "The constructive waves build up sand."),
  qSA("g10_11_geo_013", "Geography", "Geography", "What specific type of farming focuses on cultivating crops strictly for sale on global markets rather than local consumption?", "Commercial agriculture"),
  qSA("g10_11_geo_014", "Geography", "Geography", "Name the deep oceanic trench located directly north of Puerto Rico, marking a convergent plate boundary.", "Puerto Rico Trench"),
  qTF("g10_11_geo_015", "Geography", "Geography", "Secondary economic activities involve the direct extraction of raw natural resources from the Earth.", false, "The secondary activities involve the extraction."),
  qSA("g10_11_geo_016", "Geography", "Geography", "What specific term describes the zone where the trade winds of the Northern and Southern Hemispheres meet near the Equator?", "ITCZ"),
  qSA("g10_11_geo_017", "Geography", "Geography", "What form of mass movement occurs when clay soils absorb large amounts of water and flow rapidly down steep slopes?", "Mudflow"),
  qTF("g10_11_geo_018", "Geography", "Geography", "Laterite soils are highly fertile, nutrient-rich volcanic soils found across the Blue Mountains.", false, "The laterite soils are fertile."),
  qSA("g10_11_geo_019", "Geography", "Geography", "What process describes the peeling away of outer layers of rock due to large temperature shifts between day and night?", "Exfoliation"),
  qSA("g10_11_geo_020", "Geography", "Geography", "What type of urban settlement plan is characterized by a central business district surrounded by concentric rings of development?", "Burgess model"),

  // Business
  qSA("g10_11_bus_001", "Business", "Principles of Business & Principles of Accounts", "What financial statement details a firm's structural assets, liabilities, and capital at a specific single point in time?", "Balance Sheet"),
  qSA("g10_11_bus_002", "Business", "Principles of Business & Principles of Accounts", "What document serves as an invitation to the public to subscribe for shares in a newly registering Public Limited Company?", "Prospectus"),
  qTF("g10_11_bus_003", "Business", "Principles of Business & Principles of Accounts", "Double-entry bookkeeping dictates that for every debit entry, there must be a corresponding credit entry.", true),
  qSA("g10_11_bus_004", "Business", "Principles of Business & Principles of Accounts", "What type of contract involves an agreement that is legally binding but can be set aside by one of the parties due to a defect?", "Voidable contract"),
  qSA("g10_11_bus_005", "Business", "Principles of Business & Principles of Accounts", "What ratio measures a firm's operational short-term liquidity by comparing current assets to current liabilities?", "Current ratio"),
  qSA("g10_11_bus_006", "Business", "Principles of Business & Principles of Accounts", "Which department in a business organization handles the recruitment, training, and welfare of employees?", "Human Resources"),
  qTF("g10_11_bus_007", "Business", "Principles of Business & Principles of Accounts", "A franchise is a business setup where a person owns shares in a cooperative state utility.", false),
  qSA("g10_11_bus_008", "Business", "Principles of Business & Principles of Accounts", "What financial document is sent by a seller to a buyer to correct an overcharge on a previous invoice?", "Credit note"),
  qSA("g10_11_bus_009", "Business", "Principles of Business & Principles of Accounts", "What economic term describes a market structure dominated by a small number of large, powerful firms?", "Oligopoly"),
  qSA("g10_11_bus_010", "Business", "Principles of Business & Principles of Accounts", "Fill in the blank: The structural ledger where all individual accounts for credit customers are kept is called the ________ ledger.", "Sales ledger"),
  qSA("g10_11_bus_011", "Business", "Principles of Business & Principles of Accounts", "What system protects a business against loss from dishonest employees handling large sums of cash?", "Fidelity guarantee insurance"),
  qTF("g10_11_bus_012", "Business", "Principles of Business & Principles of Accounts", "Collateral is an asset pledged by a borrower to secure a loan, which can be claimed by the lender if default occurs.", true),
  qSA("g10_11_bus_013", "Business", "Principles of Business & Principles of Accounts", "What specific document outlines the internal regulations and running rules of a limited liability company?", "Articles of Association"),
  qSA("g10_11_bus_014", "Business", "Principles of Business & Principles of Accounts", "Name the accounting concept that dictates transactions must be recorded in the period they occur rather than when cash changes hands.", "Accruals concept"),
  qSA("g10_11_bus_015", "Business", "Principles of Business & Principles of Accounts", "What marketing term refers to the deliberate process of dividing a broad target market into smaller, defined segments based on traits?", "Market segmentation"),
  qTF("g10_11_bus_016", "Business", "Principles of Business & Principles of Accounts", "A nominal account is an account used to record long-term tangible capital assets like machinery and buildings.", false),
  qSA("g10_11_bus_017", "Business", "Principles of Business & Principles of Accounts", "What calculation yields a business firm's working capital?", "Current assets minus current liabilities"),
  qSA("g10_11_bus_018", "Business", "Principles of Business & Principles of Accounts", "What is a visual diagram that maps out the chain of command and structural relationships between positions in a firm?", "Organizational chart"),
  qTF("g10_11_bus_019", "Business", "Principles of Business & Principles of Accounts", "The imprest system is an accounting method used to manage and control petty cash expenditures.", true),
  qSA("g10_11_bus_020", "Business", "Principles of Business & Principles of Accounts", "What source document acts as official proof that cash has been received for a business transaction?", "Receipt"),

  // Information Technology
  qSA("g10_11_it_001", "Information Technology", "Information Technology", "What specific structural paradigm uses logical tables linked together via common fields to manage data?", "Relational Database Management System"),
  qSA("g10_11_it_002", "Information Technology", "Information Technology", "What structural translation program converts high-level source code into machine code all at once before execution?", "Compiler"),
  qTF("g10_11_it_003", "Information Technology", "Information Technology", "ROM is a volatile form of memory that clears its content when the system loses power.", false),
  qSA("g10_11_it_004", "Information Technology", "Information Technology", "What type of validation check ensures that entered numerical values fall within a specified upper and lower limit?", "Range check"),
  qSA("g10_11_it_005", "Information Technology", "Information Technology", "What transmission protocol structures and safely routes data packets across the internet global network?", "TCP/IP"),
  qSA("g10_11_it_006", "Information Technology", "Information Technology", "In binary arithmetic, calculate the sum of the bits 1 + 1.", "10"),
  qTF("g10_11_it_007", "Information Technology", "Information Technology", "Phishing is an administrative method used to encrypt hard drive storage units to prevent data theft.", false),
  qSA("g10_11_it_008", "Information Technology", "Information Technology", "What spreadsheet function counts the number of cells within a range that meet a specific condition?", "COUNTIF"),
  qSA("g10_11_it_009", "Information Technology", "Information Technology", "What structural network design connects all workstations directly to a single central hub or switch device?", "Star topology"),
  qSA("g10_11_it_010", "Information Technology", "Information Technology", "Fill in the blank: The structural system software that manages a computer's hardware resources and provides common services is the ________ system.", "Operating"),
  qSA("g10_11_it_011", "Information Technology", "Information Technology", "What type of error is detected by a compiler when a programmer violates the structural rules of a coding language?", "Syntax error"),
  qTF("g10_11_it_012", "Information Technology", "Information Technology", "Cloud computing refers to storing data on localized physical magnetic tape drives inside an office.", false),
  qSA("g10_11_it_013", "Information Technology", "Information Technology", "What data specification uniquely identifies every internet-connected hardware device globally?", "IP Address"),
  qSA("g10_11_it_014", "Information Technology", "Information Technology", "Name the specific structural phase of the system development life cycle where testing and user training happen.", "Implementation phase"),
  qSA("g10_11_it_015", "Information Technology", "Information Technology", "What tool is a step-by-step diagrammatic representation of an algorithm using standard geometric shapes?", "Flowchart"),
  qTF("g10_11_it_016", "Information Technology", "Information Technology", "Ascending order means sorting text data from Z to A.", false),
  qSA("g10_11_it_017", "Information Technology", "Information Technology", "What structural mechanism acts as a protective perimeter shield to filter unauthorized incoming network traffic?", "Firewall"),
  qSA("g10_11_it_018", "Information Technology", "Information Technology", "What term describes the intentional modification of data into unreadable ciphertext to secure it during transit?", "Encryption"),
  qTF("g10_11_it_019", "Information Technology", "Information Technology", "A primary key value can be duplicate or null within a database table.", false),
  qSA("g10_11_it_020", "Information Technology", "Information Technology", "What specific structural programming loop executes a block of code a predetermined number of times?", "For loop"),

  // Music
  qSA("g10_11_music_001", "Music", "Music", "What structural term describes the texture of a musical piece consisting of a clear melody supported by chordal accompaniment?", "Homophonic"),
  qSA("g10_11_music_002", "Music", "Music", "Which highly influential electronic studio development technique, featuring spatial delay and echoing vocals, was created by Jamaican sound engineers like King Tubby?", "Dub"),
  qTF("g10_11_music_003", "Music", "Music", "In compound time signatures, the basic beat unit is always divisible into three equal parts.", true),
  qSA("g10_11_music_004", "Music", "Music", "What musical form structures a piece into three distinct parts where the third part is a literal repeat of the first (ABA)?", "Ternary form"),
  qSA("g10_11_music_005", "Music", "Music", "What clef is used to notationally represent lower pitch registers and is also known as the F Clef?", "Bass Clef"),
  qSA("g10_11_music_006", "Music", "Music", "Name the rhythmic arrangement where accents are placed away from the strong pulse, foundational to Ska and Reggae strumming profiles.", "Skank"),
  qTF("g10_11_music_007", "Music", "Music", "A diatonic scale consists of a specific arrangement of five whole steps and two half steps.", true),
  qSA("g10_11_music_008", "Music", "Music", "What classical term directs a musician to speed up the tempo of a performance gradually?", "Accelerando"),
  qSA("g10_11_music_009", "Music", "Music", "Which fundamental frequency interval is created when two identical notes are played together, with one vibrating at exactly double the rate of the other?", "Octave"),
  qSA("g10_11_music_010", "Music", "Music", "Fill in the blank: The dynamic marking 'fortissimo' instructs the performer to play the musical passage ________.", "very loudly"),
  qSA("g10_11_music_011", "Music", "Music", "What structural device alters or limits the volume and harmonic spectrum of a brass instrument when placed inside its bell opening?", "Mute"),
  qTF("g10_11_music_012", "Music", "Music", "A diminished triad chord consists of a root note stacked with a minor third and a diminished fifth interval.", true),
  qSA("g10_11_music_013", "Music", "Music", "What type of cadence creates an unfinished, suspended effect by ending a phrase directly on a dominant chord?", "Half cadence"),
  qSA("g10_11_music_014", "Music", "Music", "Name the iconic trombone player and founding member of The Skatalites who profoundly shaped the instrumental landscape of Jamaican Ska.", "Don Drummond"),
  qTF("g10_11_music_015", "Music", "Music", "A semitone is the largest pitch interval possible within traditional Western musical scales.", false),
  qSA("g10_11_music_016", "Music", "Music", "What acoustic quality enables an individual to perceive the difference in sound between a flute and an oboe playing the exact same pitch?", "Timbre"),
  qSA("g10_11_music_017", "Music", "Music", "What specific metrical structure is defined by a 6/8 time signature?", "Compound duple time"),
  qSA("g10_11_music_018", "Music", "Music", "What accidental symbol completely cancels the operational effect of a previous sharp or flat marking on a note?", "Natural"),
  qTF("g10_11_music_019", "Music", "Music", "Monophonic texture features a complex weave of independent, competing vocal lines.", false),
  qSA("g10_11_music_020", "Music", "Music", "What production unit consists of multiple audio frequencies grouped together and manipulated inside an electronic sound system?", "Equalizer")
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
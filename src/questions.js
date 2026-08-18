'use strict';

/**
 * Sample question bank for Jam-Pak EDU.
 * Each question has: id, subject, grade, text, options, answer, explanation.
 */
const questions = [
  {
    id: 1,
    subject: 'Mathematics',
    grade: 7,
    text: 'What is 12 × 12?',
    options: ['120', '132', '144', '148'],
    answer: '144',
    explanation: '12 × 12 = 144'
  },
  {
    id: 2,
    subject: 'Mathematics',
    grade: 7,
    text: 'What is the value of π (pi) to two decimal places?',
    options: ['3.14', '3.41', '2.14', '3.12'],
    answer: '3.14',
    explanation: 'Pi is approximately 3.14159…'
  },
  {
    id: 3,
    subject: 'Science',
    grade: 8,
    text: 'What is the chemical symbol for water?',
    options: ['O2', 'H2O', 'CO2', 'NaCl'],
    answer: 'H2O',
    explanation: 'Water is composed of two hydrogen atoms and one oxygen atom.'
  },
  {
    id: 4,
    subject: 'Science',
    grade: 8,
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    answer: 'Mars',
    explanation: 'Mars appears red due to iron oxide (rust) on its surface.'
  },
  {
    id: 5,
    subject: 'History',
    grade: 9,
    text: 'In which year did Jamaica gain independence?',
    options: ['1958', '1960', '1962', '1966'],
    answer: '1962',
    explanation: 'Jamaica gained independence from Britain on 6 August 1962.'
  },
  {
    id: 6,
    subject: 'History',
    grade: 9,
    text: 'Who was the first Prime Minister of Jamaica?',
    options: ['Michael Manley', 'Norman Manley', 'Alexander Bustamante', 'Hugh Shearer'],
    answer: 'Alexander Bustamante',
    explanation: 'Sir Alexander Bustamante became Jamaica\'s first Prime Minister in 1962.'
  },
  {
    id: 7,
    subject: 'English',
    grade: 7,
    text: 'Which of the following is a noun?',
    options: ['Run', 'Quickly', 'Beautiful', 'Mountain'],
    answer: 'Mountain',
    explanation: 'A noun is a person, place, or thing. Mountain is a place/thing.'
  },
  {
    id: 8,
    subject: 'English',
    grade: 8,
    text: 'What is the plural of "child"?',
    options: ['Childs', 'Childes', 'Children', 'Childrens'],
    answer: 'Children',
    explanation: '"Child" has the irregular plural "children".'
  },
  {
    id: 9,
    subject: 'Geography',
    grade: 9,
    text: 'What is the capital city of Jamaica?',
    options: ['Montego Bay', 'Ocho Rios', 'Kingston', 'Portmore'],
    answer: 'Kingston',
    explanation: 'Kingston is the capital and largest city of Jamaica.'
  },
  {
    id: 10,
    subject: 'Geography',
    grade: 7,
    text: 'On which continent is Jamaica located?',
    options: ['South America', 'North America', 'Africa', 'Europe'],
    answer: 'North America',
    explanation: 'Jamaica is an island nation in the Caribbean Sea, part of North America.'
  }
];

module.exports = { questions };

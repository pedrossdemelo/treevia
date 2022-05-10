export default function shuffle(answers) {
  for (let i = answers.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = answers[i];
    answers[i] = answers[j];
    answers[j] = temp;
  }
  return answers;
}

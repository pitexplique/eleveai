// Types partagés des decks « Cartes défis » (réutilisés par chaque niveau).

export type QuestionCarte = {
  matiere: string; // maths, francais, anglais, histoire, sciences, geo, sport, nutrition
  q: string;
  r: string;
};

export type CarteDefi = {
  ref: string; // ex "6E·01"
  questions: [QuestionCarte, QuestionCarte, QuestionCarte, QuestionCarte];
  bouge: string; // « Sport du jour » : défi physique
};

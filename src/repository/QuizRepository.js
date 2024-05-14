import { quizzes } from './quizzes';

class QuizRepository {
  constructor() {
    this.map = new Map();
    const userQuizzes = JSON.parse(localStorage.getItem('quizzes'));
    if (userQuizzes) {
      userQuizzes.forEach((q) => this.map.set(q.id, q));
    }
    quizzes.forEach((q) => this.map.set(q.id, q));
  }

  getQuiz(id) {
    return this.map.get(id);
  }

  setQuiz(quiz) {
    this.map.set(quiz.id, quiz);
    const userQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    userQuizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(userQuizzes));
  }

  getAllQuizzes() {
    return Array.from(this.map.values());
  }

  setQuizResult(id, result) {
    const userResults = JSON.parse(localStorage.getItem('results') || '[]');
    userResults[id] = result;
    localStorage.setItem('results', JSON.stringify(userResults));
  }
}

export const quizRepository = new QuizRepository();

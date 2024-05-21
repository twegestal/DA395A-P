import { quizzes } from './quizzes';

class QuizRepository {
  constructor() {
    this.map = new Map();
    const userQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    [...userQuizzes, ...quizzes].forEach((q) => this.map.set(q.id, q));
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

  setQuizResult(id, isFinished) {
    let userResults = JSON.parse(localStorage.getItem('results') || '{}');

    userResults[id] = isFinished;

    localStorage.setItem('results', JSON.stringify(userResults));
  }

  getQuizResults() {
    return JSON.parse(localStorage.getItem('results') || '{}');
  }

  getTotalAmountOfQuizzes() {
    return this.map.size;
  }
}

export const quizRepository = new QuizRepository();

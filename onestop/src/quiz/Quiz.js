import React, { useState } from "react";
import "./Quiz.css";

const questions = [
  // Medical
  { id: 1, text: "I enjoy understanding how living organisms function and interact with their environment.", category: "medical", subject: "Biology" },
  { id: 2, text: "I am curious about the human body, diseases, and medical treatments.", category: "medical", subject: "Medical Science" },
  { id: 3, text: "I find it interesting to study anatomy, physiology, and how medications work.", category: "medical", subject: "Health Sciences" },
  { id: 4, text: "I am passionate about helping people recover from illnesses and maintaining good health.", category: "medical", subject: "Healthcare" },
  { id: 5, text: "I enjoy studying genetics, microbiology, and biochemical processes.", category: "medical", subject: "Life Sciences" },

  // Engineering
  { id: 6, text: "I am interested in understanding the laws of motion, energy, and matter.", category: "engineering", subject: "Physics" },
  { id: 7, text: "I enjoy solving mathematical problems and working with numbers and formulas.", category: "engineering", subject: "Mathematics" },
  { id: 8, text: "I find it fascinating to conduct experiments and observe chemical reactions.", category: "engineering", subject: "Chemistry" },
  { id: 9, text: "I am interested in building and designing mechanical systems or structures.", category: "engineering", subject: "Engineering Design" },
  { id: 10, text: "I enjoy understanding how machines work and solving technical problems.", category: "engineering", subject: "Applied Sciences" },

  // Technology
  { id: 11, text: "I enjoy working with computers and learning about new software applications.", category: "technology", subject: "Computer Science" },
  { id: 12, text: "I like creating websites, mobile apps, or digital solutions to problems.", category: "technology", subject: "Information Technology" },
  { id: 13, text: "I am fascinated by robotics, artificial intelligence, and automation.", category: "technology", subject: "Advanced Technology" },
  { id: 14, text: "I enjoy analyzing data and finding patterns in large datasets.", category: "technology", subject: "Data Science" },
  { id: 15, text: "I am interested in cybersecurity, networks, and protecting digital information.", category: "technology", subject: "Information Security" },

  // Arts
  { id: 16, text: "I enjoy reading literature, writing stories, or analyzing texts.", category: "arts", subject: "Literature/Language" },
  { id: 17, text: "I am interested in understanding different cultures, societies, and human behavior.", category: "arts", subject: "Social Studies" },
  { id: 18, text: "I enjoy learning about historical events and their impact on the present.", category: "arts", subject: "History" },
  { id: 19, text: "I am interested in geography, maps, and understanding different places.", category: "arts", subject: "Geography" },
  { id: 20, text: "I enjoy creative activities like drawing, painting, music, or performing arts.", category: "arts", subject: "Creative Arts" },

  // Commerce
  { id: 21, text: "I am interested in understanding how businesses operate and make decisions.", category: "commerce", subject: "Business Studies" },
  { id: 22, text: "I enjoy working with financial data, budgets, and accounting principles.", category: "commerce", subject: "Accounting" },
  { id: 23, text: "I am interested in economic trends, market behavior, and financial systems.", category: "commerce", subject: "Economics" },
  { id: 24, text: "I enjoy planning events, managing teams, and organizing projects.", category: "commerce", subject: "Management" },
  { id: 25, text: "I am interested in marketing, sales, and understanding consumer behavior.", category: "commerce", subject: "Marketing" }
];

function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    const quizAnswers = questions.map(q => ({
      questionId: q.id,
      answer: answers[q.id] || 1,
      category: q.category
    }));
    onComplete(quizAnswers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="quiz-container">
      {/* Progress */}
      <div className="quiz-progress-header">
        <div>
          <h2>Career Aptitude Quiz</h2>
          <p>Discovering your academic strengths</p>
        </div>
        <div className="quiz-progress-header-pro">
          <span>Progress</span>
          <div className="cur">
            {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Card */}
      <div className="quiz-card">
        <div className="quiz-subject">{question.subject}</div>
        <h3>{question.text}</h3>

        <div className="options">
          {[
            { value: "1", label: "Strongly Disagree", emoji: "😟" },
            { value: "2", label: "Disagree", emoji: "🙁" },
            { value: "3", label: "Neutral", emoji: "😐" },
            { value: "4", label: "Agree", emoji: "🙂" },
            { value: "5", label: "Strongly Agree", emoji: "😊" }
          ].map(option => (
            <div
              key={option.value}
              className={`quiz-option ${currentAnswer?.toString() === option.value ? "selected" : ""}`}
              onClick={() => handleAnswerChange(question.id, parseInt(option.value))}
            >
              <span className="emoji">{option.emoji}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="quiz-nav">
          <button onClick={previousQuestion} disabled={currentQuestion === 0}>
            Previous
          </button>
          {currentQuestion === questions.length - 1 ? (
            <button onClick={submitQuiz} disabled={!currentAnswer}>
              Complete Assessment
            </button>
          ) : (
            <button onClick={nextQuestion} disabled={!currentAnswer}>
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;

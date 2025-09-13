import React, { useState } from "react";
import "./Dashboard.css";
import CourseToCareer from "../coursetocareer/CourseToCareer";
import CollegeDirectory from "../collegedirectory/CollegeDirectory";
import TimelineTracker from "../timeline/TimelineTracker";
import Alerts from "../timeline/Alerts";

// Quiz imports
import QuizHome from "../quiz/QuizHome";
import Quiz from "../quiz/Quiz";
import { QuizResults } from "../quiz/QuizResults";

function Dashboard({ username }) {
  const [activeView, setActiveView] = useState("main");

  // Quiz states
  const [quizState, setQuizState] = useState("home"); // 'home' | 'quiz' | 'results'
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({
    engineering: 0,
    medical: 0,
    arts: 0,
    commerce: 0,
    technology: 0,
  });

  // Quiz functions
  const startQuiz = () => {
    setQuizState("quiz");
    setAnswers([]);
  };

  const completeQuiz = (quizAnswers) => {
    setAnswers(quizAnswers);

    const calculatedScores = {
      engineering: 0,
      medical: 0,
      arts: 0,
      commerce: 0,
      technology: 0,
    };

    quizAnswers.forEach((answer) => {
      calculatedScores[answer.category] += answer.answer;
    });

    setScores(calculatedScores);
    setQuizState("results");
  };

  const resetQuiz = () => {
    setQuizState("home");
    setAnswers([]);
    setScores({
      engineering: 0,
      medical: 0,
      arts: 0,
      commerce: 0,
      technology: 0,
    });
  };

  // Navigation header (always visible)
  const NavigationBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <div className="nav-bar">
        <div className="nav-left">🎓 Career Dashboard</div>

        {/* Hamburger menu button (mobile) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Menu items */}
        <div className={`nav-right ${menuOpen ? "show" : ""}`}>
          <button onClick={() => setActiveView("main")}>Home</button>
          <button onClick={() => setActiveView("quiz")}>Aptitude Quiz</button>
          <button onClick={() => setActiveView("career-mapping")}>
            Course to Career
          </button>
          <button onClick={() => setActiveView("college-directory")}>
            College Directory
          </button>
          <button onClick={() => setActiveView("alerts")}>Alerts</button>
        </div>
      </div>
    );
  };

  // Routing logic
  let content;
  if (activeView === "career-mapping") {
    content = <CourseToCareer />;
  } else if (activeView === "college-directory") {
    content = <CollegeDirectory />;
  } else if (activeView === "timeline") {
    content = <TimelineTracker />;
  } else if (activeView === "alerts") {
    content = <Alerts />;
  } else if (activeView === "quiz") {
    content = (
      <div className="dashboard-quiz">
        {quizState === "home" && <QuizHome onStartQuiz={startQuiz} />}
        {quizState === "quiz" && <Quiz onComplete={completeQuiz} />}
        {quizState === "results" && (
          <QuizResults
            scores={scores}
            answers={answers}
            onRetakeQuiz={resetQuiz}
          />
        )}
      </div>
    );
  } else {
    content = (
      <div className="dashboard-landing">
        <header className="hero-section">
          <h1>Welcome, {username}! 🎉</h1>
          <p>
            Your one-stop guide after 12th – explore careers, colleges, exams,
            and scholarships!
          </p>
        </header>

        <section className="features">
          <h2>🚀 Features for You</h2>
          <div className="features-grid">
            <div className="feature-card">
              🎯 Personalized Career Guidance
              <p>Get suggestions based on your interests & aptitude.</p>
            </div>
            <div className="feature-card">
              🏫 College Finder
              <p>
                Explore top colleges with cut-offs, fees, and admission process.
              </p>
            </div>
            {/* <div className="feature-card">
              📚 Entrance Exams Tracker
              <p>Stay updated with exam dates, forms, and results.</p>
            </div> */}
            {/* <div className="feature-card">
              💰 Scholarships
              <p>Find scholarships based on your merit & background.</p>
            </div> */}
            <div className="feature-card">
              📝 Aptitude Quiz
              <p>Discover the best-fit streams and careers for you.</p>
            </div>
            <div className="feature-card">
              📈 Career Roadmap
              <p>Plan your journey step by step towards success.</p>
            </div>
          </div>
        </section>

        <section className="call-to-action">
          <h2>✨ Ready to Begin?</h2>
          <p>Start with the Aptitude Quiz to know where you fit best!</p>
          <button className="cta-btn" onClick={() => setActiveView("quiz")}>
            Start Quiz 🚀
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      {content}
    </div>
  );
}

export default Dashboard;

import React from "react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Progress } from "./ui/Progress";
import { Badge } from "./ui/Badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Award, BookOpen, Briefcase, Monitor, RotateCcw, TrendingUp, Users } from "lucide-react";
import "./QuizResults.css";

export function QuizResults({ scores, onRetakeQuiz }) {
  const maxPossibleScore = 25;
  const percentages = {
    engineering: Math.round((scores.engineering / maxPossibleScore) * 100),
    medical: Math.round((scores.medical / maxPossibleScore) * 100),
    arts: Math.round((scores.arts / maxPossibleScore) * 100),
    commerce: Math.round((scores.commerce / maxPossibleScore) * 100),
    technology: Math.round((scores.technology / maxPossibleScore) * 100),
  };

  const recommendations = [
    {
      stream: "Engineering",
      score: percentages.engineering,
      description: "Perfect for students interested in design, problem-solving, and technical innovation",
      subjects: ["Physics", "Chemistry", "Mathematics", "Engineering Drawing"],
      careers: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Chemical Engineer", "Aerospace Engineer"],
      icon: <Award className="icon-small" />,
      color: "blue",
    },
    {
      stream: "Medical/Healthcare",
      score: percentages.medical,
      description: "Ideal for students passionate about healthcare, life sciences, and helping others",
      subjects: ["Biology", "Chemistry", "Physics", "Health Sciences"],
      careers: ["Doctor", "Nurse", "Pharmacist", "Physiotherapist", "Medical Researcher"],
      icon: <BookOpen className="icon-small" />,
      color: "red",
    },
    {
      stream: "Arts/Humanities",
      score: percentages.arts,
      description: "Great for creative minds interested in literature, social sciences, and culture",
      subjects: ["History", "Geography", "Literature", "Political Science", "Psychology"],
      careers: ["Teacher", "Journalist", "Civil Servant", "Lawyer", "Social Worker"],
      icon: <BookOpen className="icon-small" />,
      color: "green",
    },
    {
      stream: "Commerce",
      score: percentages.commerce,
      description: "Excellent for future business leaders and finance professionals",
      subjects: ["Accounting", "Business Studies", "Economics", "Mathematics"],
      careers: ["Chartered Accountant", "Business Analyst", "Banker", "Entrepreneur", "Financial Advisor"],
      icon: <Briefcase className="icon-small" />,
      color: "orange",
    },
    {
      stream: "Technology/IT",
      score: percentages.technology,
      description: "Perfect for the digital age - programming, AI, and innovation",
      subjects: ["Computer Science", "Mathematics", "Physics", "Information Technology"],
      careers: ["Software Developer", "Data Scientist", "Cybersecurity Expert", "AI Engineer", "Product Manager"],
      icon: <Monitor className="icon-small" />,
      color: "purple",
    },
  ];

  const sortedRecommendations = recommendations.sort((a, b) => b.score - a.score);
  const topRecommendation = sortedRecommendations[0];

  const chartData = [
    { name: "Engineering", score: percentages.engineering },
    { name: "Medical", score: percentages.medical },
    { name: "Arts", score: percentages.arts },
    { name: "Commerce", score: percentages.commerce },
    { name: "Technology", score: percentages.technology },
  ];

  const getStreamGradient = (stream) => {
    if (stream === "Engineering") return "engineering-gradient";
    if (stream === "Medical/Healthcare") return "medical-gradient";
    if (stream === "Arts/Humanities") return "arts-gradient";
    if (stream === "Commerce") return "commerce-gradient";
    if (stream === "Technology/IT") return "technology-gradient";
    return "quiz-gradient-bg";
  };

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="results-header">
        <div className="results-icon">
          <Award className="icon-large white" />
        </div>
        <h1 className="results-title">Your Career Assessment Results</h1>
        <p className="results-subtitle">
          Based on your responses, we've analyzed your interests and aptitudes to provide personalized career guidance
          tailored specifically for your academic journey.
        </p>
      </div>

      {/* Top Recommendation */}
      <Card className="top-recommendation">
        <div className={`top-recommendation-bar ${getStreamGradient(topRecommendation.stream)}`}></div>
        <CardHeader className="top-recommendation-header">
          <div className="top-recommendation-icon">{topRecommendation.icon}</div>
          <div className="top-recommendation-text">
            <div className="top-recommendation-row">
              <CardTitle className="top-recommendation-label">🎯 Recommended Stream:</CardTitle>
              <span className="top-recommendation-stream">{topRecommendation.stream}</span>
              <Badge className={`top-recommendation-badge ${getStreamGradient(topRecommendation.stream)}`}>
                {topRecommendation.score}% Match
              </Badge>
            </div>
            <CardDescription className="top-recommendation-desc">{topRecommendation.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="top-recommendation-grid">
            <div>
              <div className="section-heading">
                <BookOpen className="icon-small primary" />
                <h4>Suggested Subjects:</h4>
              </div>
              <div className="badge-list">
                {topRecommendation.subjects.map((subject) => (
                  <Badge key={subject} className="subject-badge">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="section-heading">
                <Briefcase className="icon-small primary" />
                <h4>Potential Careers:</h4>
              </div>
              <div className="badge-list">
                {topRecommendation.careers.map((career) => (
                  <Badge key={career} className={`career-badge ${getStreamGradient(topRecommendation.stream)}`}>
                    {career}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="score-breakdown">
        <Card className="chart-card">
          <CardHeader>
            <CardTitle className="card-title">
              <TrendingUp className="icon-small primary" />
              Your Aptitude Scores
            </CardTitle>
            <CardDescription>Visual breakdown of your interests across different academic domains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 14 }} tickLine={{ stroke: "#d0d0d0" }} />
                  <YAxis tick={{ fontSize: 14 }} tickLine={{ stroke: "#d0d0d0" }} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Interest Score"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="score" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="details-card">
          <CardHeader>
            <CardTitle className="card-title">
              <Monitor className="icon-small primary" />
              Detailed Breakdown
            </CardTitle>
            <CardDescription>Your interest level in each domain</CardDescription>
          </CardHeader>
          <CardContent className="details-list">
            {sortedRecommendations.map((rec, index) => (
              <div key={rec.stream} className="details-item">
                <div className="details-header">
                  <div className={`details-icon ${rec.color}`}>{rec.icon}</div>
                  <div>
                    <span className="details-stream">{rec.stream.replace("/IT", "")}</span>
                    {index === 0 && <div className="top-match">TOP MATCH</div>}
                  </div>
                  <span className="details-score">{rec.score}%</span>
                </div>
                <div className="progress-wrapper">
                  <Progress value={rec.score} />
                  <div className={`progress-bar ${getStreamGradient(rec.stream)}`} style={{ width: `${rec.score}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alternatives */}
      <div className="alternatives">
        <div className="alternatives-header">
          <h3>Alternative Career Paths</h3>
          <p>Explore other streams that align with your interests</p>
        </div>
        <div className="alternatives-grid">
          {sortedRecommendations.slice(1).map((rec) => (
            <Card key={rec.stream} className="alternative-card">
              <div className={`alternative-bar ${getStreamGradient(rec.stream)}`}></div>
              <CardHeader>
                <CardTitle className="alternative-title">
                  <div className={`alternative-icon ${rec.color}`}>{rec.icon}</div>
                  <div className="alternative-info">
                    <div>{rec.stream}</div>
                    <Badge className="alt-badge">{rec.score}% Match</Badge>
                  </div>
                </CardTitle>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="alt-section">
                  <div className="section-heading">
                    <BookOpen className="icon-small gray" />
                    <span>Key Subjects:</span>
                  </div>
                  <div className="badge-list">
                    {rec.subjects.slice(0, 4).map((subject) => (
                      <Badge key={subject} className="alt-subject">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="alt-section">
                  <div className="section-heading">
                    <Briefcase className="icon-small gray" />
                    <span>Career Options:</span>
                  </div>
                  <div className="badge-list">
                    {rec.careers.slice(0, 3).map((career) => (
                      <Badge key={career} className={`alt-career ${getStreamGradient(rec.stream)}`}>
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <Card className="next-steps">
        <CardHeader>
          <div className="next-steps-icon">
            <TrendingUp className="icon-medium white" />
          </div>
          <CardTitle>Your Next Steps</CardTitle>
          <CardDescription>Here's your personalized roadmap to academic success</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon blue">
                <BookOpen className="icon-small" />
              </div>
              <h4>Research Colleges</h4>
              <p>Look for government colleges offering courses in your recommended stream. Check admission requirements and application deadlines.</p>
            </div>
            <div className="step-card">
              <div className="step-icon green">
                <Users className="icon-small" />
              </div>
              <h4>Talk to Counselors</h4>
              <p>Discuss your results with school counselors or career guidance experts. Get personalized advice for your specific situation.</p>
            </div>
            <div className="step-card">
              <div className="step-icon purple">
                <Monitor className="icon-small" />
              </div>
              <h4>Explore Further</h4>
              <p>Take additional aptitude tests or try subjects through online courses. Build practical experience in your areas of interest.</p>
            </div>
          </div>
          <div className="next-steps-footer">
            <div className="next-steps-buttons">
              <Button onClick={onRetakeQuiz} className="retake-btn">
                <RotateCcw className="icon-small" /> Retake Assessment
              </Button>
              <Button className="find-btn">
                <BookOpen className="icon-small" /> Find Colleges
              </Button>
            </div>
            <p className="note">Remember, this assessment is a guide. Your interests and strengths may evolve as you grow and learn more about different fields.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

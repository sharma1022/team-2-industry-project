import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserInfoForm from "./components/UserInfoForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { useState } from "react";
import questions from "./data/questions";
const App = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    email: "",
    location: "",
  });

  const handleAnswer = (category) => {
    setAnswers([...answers, category]);
    handleNextStep();
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = (userData) => {
    setUserInfo(userData);
    handleNextStep();
  };

  const calculatePersonalityType = () => {
    const frequency = {};
    answers.forEach((answer) => {
      frequency[answer] = (frequency[answer] || 0) + 1;
    });

    let maxFrequency = 0;
    let personalityType = "";

    for (const category in frequency) {
      if (frequency[category] > maxFrequency) {
        maxFrequency = frequency[category];
        personalityType = category;
      }
    }

    return personalityType;
  };

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              step === 0 ? (
                <UserInfoForm onSubmit={handleFormSubmit} />
              ) : step <= questions.length ? (
                <Quiz
                  step={step}
                  question={questions[step - 1]?.question}
                  options={questions[step - 1]?.options}
                  onAnswer={handleAnswer}
                  onNext={handleNextStep}
                  onBack={handlePreviousStep}
                />
              ) : (
                <Result
                  userInfo={userInfo}
                  personalityType={calculatePersonalityType()}
                />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import { Grid } from "react-loader-spinner";

const Quiz = ({ question, options, onAnswer, step, onNext, onBack }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImages = () => {
      const imagePromises = options.map((option) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = option.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch((error) => {
          console.error("Failed to preload images", error);
        });
    };

    loadImages();
  }, [options]);

  const handleAnswer = (option) => {
    const selectedOptionIndex = options.findIndex(
      (opt) => opt.text === option.text
    );
    const category = questions[step - 1].categories[selectedOptionIndex];
    onAnswer(category);
  };

  if (!imagesLoaded) {
    return (
      <div className="loader-wrapper">
        <div className="loader-container">
          <Grid
            visible={true}
            height="80"
            width="80"
            color="#222222"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="para">
        Question {step} of {questions.length}
      </div>
      <div className="question">
        <h2 className="heading">{question}</h2>
        <p className="para">(select one.)</p>
      </div>
      <ul className="options-grid">
        {options.map((option, index) => (
          <li key={index} className="option-item">
            <div className="overlay">
              <button
                onClick={() => handleAnswer(option)}
                className="option-button"
                style={{ backgroundImage: `url(${option.image})` }}
              >
                <span className="option-text">{option.text}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="navigation-buttons">
        <button
          onClick={onBack}
          disabled={step === 1}
          className="btn btn--back"
        >
          Back
        </button>
        <button
          className="btn btn--submit"
          onClick={onNext}
          disabled={step > questions.length}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Quiz;

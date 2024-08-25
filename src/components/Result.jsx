import React from "react";

const Result = ({ userInfo, personalityType }) => {
  const getPersonalityDescription = () => {
    switch (personalityType) {
      case "Audio":
        return `You're a Story Seeker! You might enjoy our riveting podcasts and narrated articles.`;
      case "Wirecutter":
        return "You're a Gadget Guru! Check out our latest tech reviews for your savvy selections.";
      case "Cooking":
        return "You're a Culinary Connoisseur! Dive into our delicious cooking content.";
      case "Games":
        return `You're a Puzzle Master! You would love our intriguing games and challenges.`;
      case "The Athletic":
        return "You're a Sports Fanatic! Explore in-depth coverage of your favorite sports.";
      default:
        return "We couldn't determine your personality type!";
    }
  };

  return (
    <div className="result">
      <h2 className="subheading">
        Thank you for taking the quiz, {userInfo.name}!
      </h2>
      <p className="heading">{getPersonalityDescription()}</p>
      <div className="recommendations">
        <h3>Recommended Products ({})</h3>
      </div>
    </div>
  );
};

export default Result;

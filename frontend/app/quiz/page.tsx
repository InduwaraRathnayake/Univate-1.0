"use client";

import Button from "@/components/ui/button";
import React, { useState } from "react";

const QuizPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [hasStarted, setHasStarted] = useState(false);

  const questions = [
    {
      question: "What type of tasks do you enjoy the most?",
      options: [
        { answer: "Analyzing data", points: 3 },
        { answer: "Securing systems", points: 2 },
        { answer: "Building software", points: 4 },
        { answer: "General tasks", points: 1 },
      ],
    },
    {
      question: "Which of the following excites you the most?",
      options: [
        { answer: "Predictive analytics", points: 3 },
        { answer: "Network security", points: 2 },
        { answer: "Embedded systems", points: 4 },
        { answer: "Problem-solving in general", points: 1 },
      ],
    },
    {
      question: "What’s your approach to problem-solving?",
      options: [
        { answer: "Data-driven decisions", points: 3 },
        { answer: "Research and experimentation", points: 2 },
        { answer: "Collaborating with others", points: 4 },
        { answer: "Trial and error", points: 1 },
      ],
    },
    {
      question: "How do you prefer to learn new skills?",
      options: [
        { answer: "Through online courses", points: 3 },
        { answer: "By working on projects", points: 4 },
        { answer: "From hands-on experience", points: 2 },
        { answer: "Through reading books", points: 1 },
      ],
    },
    {
      question: "Which of these do you find most challenging?",
      options: [
        { answer: "Understanding complex algorithms", points: 3 },
        { answer: "Ensuring system security", points: 2 },
        { answer: "Designing scalable systems", points: 4 },
        { answer: "Working with hardware", points: 1 },
      ],
    },
    {
      question: "How comfortable are you with coding?",
      options: [
        { answer: "I enjoy coding and do it often", points: 4 },
        { answer: "I code occasionally", points: 3 },
        { answer: "I'm still learning", points: 2 },
        { answer: "I don't code much", points: 1 },
      ],
    },
    {
      question: "Which kind of work environment do you prefer?",
      options: [
        { answer: "Solo work and research", points: 3 },
        { answer: "Working with a team on projects", points: 4 },
        { answer: "A mix of independent and team tasks", points: 2 },
        { answer: "Hands-on, practical work", points: 1 },
      ],
    },
  ];

  const handleAnswerClick = (answer: string, points: number) => {
    setSelectedAnswer(answer);
    setScore(score + points);
  };

  const nextQuestion = () => {
    if (selectedAnswer) {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
      setSelectedAnswer(null);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setHasStarted(false);
  };

  const currentQuestion = questions[questionIndex];
  const recommendations =
    score >= 8
      ? "You might enjoy Data Science!"
      : score >= 5
      ? "Cyber Security could be a good fit for you."
      : score >= 3
      ? "Integrated Computer Engineering is worth considering."
      : "The General Stream might suit your preferences.";

  const progressPercentage = (questionIndex / (questions.length - 1)) * 100;
  if (!hasStarted) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/wallpaper3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60 "></div>
        <div className="px-4 max-w-3xl mx-auto relative z-10 w-full pt-20 pb-32 mb-14 flex flex-col items-center text-center">
          <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold text-border-black mt-10 mb-10">
            Welcome to the Stream Selection Quiz
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-gray-300 mb-10">
            Answer a few questions to find out which CSE specialization stream
            suits you best.
          </p>
          <button
            onClick={() => setHasStarted(true)}
            className="py-3 px-6 text-lg sm:text-xl font-semibold rounded-full border-2 border-white text-white bg-black hover:bg-white hover:text-black transition duration-300 transform hover:scale-105"
          >
            Let&apos;s Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full rounded-md flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/wallpaper3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 "></div>
      <div className="px-4 max-w-7xl mx-auto relative z-10 w-full pt-20 pb-32 mb-14 flex flex-col items-center">
        {!quizCompleted ? (
          <>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-10">
              {currentQuestion.question}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 w-full max-w-3xl mt-5">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-4 text-xl sm:text-2xl justify-center font-semibold rounded-lg flex items-center transition duration-300 transform ${
                    selectedAnswer === option.answer
                      ? " bg-black/50 text-white"
                      : " bg-white text-black hover:bg-black hover:text-white"
                  }`}
                  onClick={() =>
                    handleAnswerClick(option.answer, option.points)
                  }
                >
                  {option.answer}
                </button>
              ))}
            </div>

            <div className="relative top-28 w-full max-w-3xl mx-auto z-20">
              <div className="relative w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="absolute h-full rounded-full duration-1000
              animate-shimmer bg-[linear-gradient(110deg,black,45%,gray,55%,black)] bg-[length:200%_100%] transition-colors "
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="relative top-44 left-0 right-0 flex justify-between px-4 w-full max-w-7xl mx-auto z-20">
              <Button
                title="Previous"
                handleClick={prevQuestion}
                otherClasses={`p-4 w-32 sm:w-40 text-lg sm:text-xl font-semibold rounded-full justify-center `}
                disabled={questionIndex === 0}
              />

              <Button
                title="Next"
                handleClick={nextQuestion}
                disabled={!selectedAnswer}
                otherClasses={`p-4 w-32 sm:w-40 text-lg sm:text-xl font-semibold rounded-full justify-center ${
                  selectedAnswer ? "" : "cursor-not-allowed"
                }`}
              />
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-white text-6xl font-extrabold mb-6 md:mb-8 text-gradient bg-clip-text bg-gradient-to-r from-neutral-50 to-neutral-400 pb-4">
              Quiz Completed!
            </h2>
            <p className="text-border-black text-3xl mb-6 md:mb-8">
              {recommendations}
            </p>
            <button
              onClick={restartQuiz}
              className="py-3 px-6 text-lg sm:text-xl font-semibold rounded-full border-2 border-white text-white bg-black hover:bg-white hover:text-black transition duration-300 transform hover:scale-105"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;

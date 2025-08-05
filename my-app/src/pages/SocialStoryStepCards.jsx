import React, { useState } from "react";

const stories = [
  {
    id: "taking-turns",
    title: "Taking Turns While Playing",
    imageUrl: "/SocialStories/TakingTurn/scene2_starting_to_play.png",
    steps: [
      {
        id: 1,
        caption: "Ram and Meera are good friends. They love playing games together.",
        imageUrl: "/SocialStories/TakingTurn/scene1_sitting_together.png"
      },
      {
        id: 2,
        caption: "Ram and Meera sit down together to play a board game.",
        imageUrl: "/SocialStories/TakingTurn/scene2_starting_to_play.png"
      },
      {
        id: 3,
        caption: "It’s Meera’s turn first. Ram waits patiently for his turn",
        imageUrl: "/SocialStories/TakingTurn/scene3_meera_turn.png"
      },
      {
        id: 4,
        caption: "Now it’s Ram’s turn. He rolls the dice and moves his piece.",
        imageUrl: "/SocialStories/TakingTurn/scene4_ram_turn.png"
      },
      {
        id: 5,
        caption: "They cheer when someone makes a good move. It feels good to celebrate together!",
        imageUrl: "/SocialStories/TakingTurn/scene5_cheering_each_other.png"
      },
      {
        id: 6,
        caption: "Sometimes we win. Sometimes we don’t. That’s okay. Everyone has fun",
        imageUrl: "/SocialStories/TakingTurn/scene6_handling_losing.png"
      },
      {
        id: 7,
        caption: "Ram says, ‘Let’s play again tomorrow!’ Taking turns is fun.",
        imageUrl: "/SocialStories/TakingTurn/scene7_cleaning_up.png"
      }
    ]
  },
  {
    id: "dentist-visit",
    title: "Dentist visit",
    imageUrl: "/SocialStories/DentistVisit/ThumbNail.png",
    steps: [
      {
        id: 1,
        caption: "Ram is getting ready to visit the dentist today. He wears his orange t-shirt and sits calmly.",
        imageUrl: "/SocialStories/DentistVisit/scene1_getting_ready.png"
      },
      {
        id: 2,
        caption: "Ram and his mom arrive at the dental clinic. They walk in through the glass door.",
        imageUrl: "/SocialStories/DentistVisit/scene2_arriving_clinic.png"
      },
      {
        id: 3,
        caption: "They sit in the waiting room. Ram looks a little nervous but stays calm while holding a coloring book.",
        imageUrl: "/SocialStories/DentistVisit/scene3_waiting_room.png"
      },
      {
        id: 4,
        caption: "The dentist aunty smiles and welcomes Ram. She asks him to sit on the special chair.",
        imageUrl: "/SocialStories/DentistVisit/scene4_meeting_dentist.png"
      },
      {
        id: 5,
        caption: "Ram opens his mouth and lets the dentist check his teeth gently. It doesn’t hurt at all!",
        imageUrl: "/SocialStories/DentistVisit/scene5_checkup.png"
      },
      {
        id: 6,
        caption: "The dentist says, ‘Great job, Ram!’ and gives him a sticker. Ram feels proud and happy.",
        imageUrl: "/SocialStories/DentistVisit/scene6_finish.png"
      }
    ]
  }
];

const SocialStoryStepCards = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleSelectStory = (story) => {
    setSelectedStory(story);
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    if (currentStepIndex < selectedStory.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleBackToStories = () => {
    setSelectedStory(null);
    setCurrentStepIndex(0);
  };

  return (
    <div className="p-4">
      {!selectedStory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => handleSelectStory(story)}
              className="bg-white rounded-2xl shadow-md overflow-hidden border cursor-pointer hover:shadow-lg"
            >
              <div className="p-6 text-center">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h2 className="text-lg font-semibold">{story.title}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <button
            className="mb-4 text-blue-600 hover:underline"
            onClick={handleBackToStories}
          >
            ← Back to Stories
          </button>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
            <img
              src={selectedStory.steps[currentStepIndex].imageUrl}
              alt={`Step ${currentStepIndex + 1}`}
              className="w-full object-cover"
            />
            <div className="p-4 text-center text-lg font-medium">
              {selectedStory.steps[currentStepIndex].caption}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded-md ${
                currentStepIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              ⬅️ Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {currentStepIndex + 1} of {selectedStory.steps.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === selectedStory.steps.length - 1}
              className={`px-4 py-2 rounded-md ${
                currentStepIndex === selectedStory.steps.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next ➡️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialStoryStepCards;

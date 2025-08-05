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
        caption: "They cheer when someone makes a good move. It feels good to celebrate together!",
        imageUrl: "/SocialStories/TakingTurn/scene6_handling_losing.png"
      },
      {
        id: 7,
        caption: "Ram says, ‘Let’s play again tomorrow!’ Taking turns is fun.",
        imageUrl: "/SocialStories/TakingTurn/scene7_cleaning_up.png"
      }
    ]
  }
  // You can add more stories here in the same structure
];

const SocialStoryStepCards = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="p-4">
      {!selectedStory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-white rounded-2xl shadow-md overflow-hidden border cursor-pointer hover:shadow-lg"
            >
              <div className="p-6 text-center">
               <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-auto object-cover"
                />
                <h2 className="text-lg font-semibold">{story.title}</h2>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="mb-4 text-blue-600 hover:underline"
            onClick={() => setSelectedStory(null)}
          >
            ← Back to Stories
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedStory.steps.map((step) => (
              <div
                key={step.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border"
              >
                <img
                  src={step.imageUrl}
                  alt={step.caption}
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 text-center text-base font-medium">
                  {step.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialStoryStepCards;
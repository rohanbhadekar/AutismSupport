import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
<Helmet>
  <title>Parenting Autism Together | Support for Indian Parents</title>
  <meta name="description" content="Explore resources, activities, and government schemes for autism parenting in India. Available in Marathi, Hindi, and English." />
  <meta name="keywords" content="Autism, Parenting, India, Activities, Government Schemes, Marathi, Hindi, English" />
  <link rel="canonical" href="https://parentingautismtogether.in/" />
</Helmet>

const SocialStoryStepCards = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { i18n } = useTranslation();
  const lang = i18n.language || "en";


  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    console.log("Fetching stories from:", `${baseUrl}/stories?lang=${lang}`);

    setLoading(true);
    setError("");

    fetch(`${baseUrl}/stories?lang=${lang}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setError(err.message || "Failed to fetch stories");
        setLoading(false);
      });
  }, [lang]);

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

  if (loading) return <div className="p-4">Loading stories...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

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

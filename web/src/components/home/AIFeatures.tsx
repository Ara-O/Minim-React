import GoBackIcon from "../../assets/go-back-icon.png";
import { useEffect, useState } from "react";
import { AIFeature } from "../../types/types";
import axios from "axios";
import BoxedButton from "./BoxedButton";
interface Props {
  feature: AIFeature;
  noteData: string;
  returnToNotes: any;
}
const AIFeatures = ({ feature, noteData, returnToNotes }: Props) => {
  let [summarizedNote, setSummarizedNote] = useState<string>("");
  let [testQuestions, setTestQuestions] = useState("");
  const parser = new DOMParser();
  const plainText = parser.parseFromString(noteData, "text/html")
    .documentElement.textContent;

  function generateSummary() {
    setSummarizedNote("");
    axios
      .post("https://minim-react.onrender.com/api/generateNoteSummary", {
        noteData: plainText,
      })
      .then((res) => {
        console.log(res.data);
        // setSummarizedNote(res.data.summary);
      })
      .catch((err) => {
        console.error(err);
        // alert(err.response.data.message);
      });
  }

  function generateTestQuestions() {
    setTestQuestions("");

    // if (plainText && plainText?.length < 200) {
    // alert("More input is needed to generate questions")
    // }
    console.log(plainText)
    axios
      .post("https://minim-react.onrender.com/api/generateTestQuestions", {
        noteData: plainText,
      })
      .then((res) => {
        console.log(res)
        // setTestQuestions(res.data.testQuestions);
      })
      .catch((err) => {
        console.error(err);
        // alert(err.response.data.message);
      });
  }

  let [ideaToVisualize, setIdeaToVisualize] = useState("");
  let [loadingMessage, setLoadingMessage] = useState("Waiting for prompt...");
  let [ideaImage, setIdeaImage] = useState<{ url: string }[]>([]);
  function handleIdeaVisualizationChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setIdeaToVisualize(e.target.value);
  }

  function generateVisualization() {
    setIdeaImage([])
    setLoadingMessage("Loading images...");
    axios
      .post("https://minim-react.onrender.com/api/generateIdeaVisualization", {
        ideaToVisualize,
      })
      .then((res) => {
        console.log(res)
        setIdeaImage(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (feature === "Summarize Notes") {
      generateSummary();
    }

    if (feature === "Generate Test Questions") {
      generateTestQuestions();
    }
  }, []);

  return (
    <section
      className={`sidebar relative w-[600px] patterned-bg bg-black h-screen px-14 py-20`}
    >
      <div>
        <img
          src={GoBackIcon}
          onClick={returnToNotes}
          alt="Minimize icon"
          className="absolute top-10 right-6 cursor-pointer w-[17px]"
        />
        <h3 className="font-medium">Welcome to our AI features section</h3>
        {feature === "Summarize Notes" && (
          <section className="mt-3">
            <h3 className="mt-5 text-[15px] font-medium">
              Here is your notes summary:{" "}
            </h3>
            {summarizedNote ? (
              <>
                <h3 className="leading-7 font-light text-[13.5px] mt-3">
                  {summarizedNote}
                </h3>

                <div className="mt-6">
                  <BoxedButton onclick={generateSummary}>
                    Generate Another Summary
                  </BoxedButton>
                </div>
              </>
            ) : (
              <h3 className="font-light text-sm mt-3">Summarizing notes..</h3>
            )}
          </section>
        )}

        {/* TEST QUESTIONS */}
        {feature === "Generate Test Questions" && (
          <section className="mt-3 h-[83vh] overflow-auto test-questions-section">
            <h3 className="mt-5 text-[15px] font-medium">
              Here are the test questions:
            </h3>
            {testQuestions.length > 0 ? (
              <>
                <div className="leading-7 h-[66vh] overflow-auto font-normal text-[13.5px] mt-3">
                  <h3 className="whitespace-pre-line">
                    {" "}
                    {testQuestions.trim()}
                  </h3>
                </div>

                <div className="mt-4">
                  <BoxedButton onclick={generateSummary}>
                    Generate New Questions
                  </BoxedButton>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-light text-sm mt-3">
                  Generating test questions..
                </h3>
              </>
            )}
          </section>
        )}

        {/* IDEA VISUALIZATION */}
        {feature === "Generate Idea Visualization" && (
          <section className="mt-3 h-[83vh] overflow-auto  test-questions-section">
            <h3 className="mt-5 text-[15px] ">
              Put in the idea you want to visualize:
            </h3>
            <input
              type="text"
              value={ideaToVisualize}
              onChange={handleIdeaVisualizationChange}
              className="mb-5 mt-5 rounded-[5px] outline-none pl-6 text-sm bg-minim-gray-a h-10 w-80"
            />
            <BoxedButton onclick={generateVisualization}>
              Generate Visualization
            </BoxedButton>
            <br /> <br />
            <div className="flex flex-col gap-5 ">
              {ideaImage.length === 0 ? (
                <h3 className="text-sm font-light">{loadingMessage}</h3>
              ) : (
                ideaImage.map((image) => {
                  return (
                    <img
                      src={image.url}
                      alt="Idea image"
                      className="w-80 rounded-md"
                    />
                  );
                })
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default AIFeatures;

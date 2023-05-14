import GoBackIcon from "../../assets/go-back-icon.png";
import { useEffect, useState } from "react";
import { AIFeature } from "../../types/@types";
import axios from "axios";
import BoxedButton from "./BoxedButton";

interface Props {
  feature: AIFeature;
  noteInformation: string;
  returnToNotes: any;
}
const AIFeatures = ({ feature, noteInformation, returnToNotes }: Props) => {
  let [summarizedNote, setSummarizedNote] = useState<string>("");
  let [testQuestions, setTestQuestions] = useState([]);
  const parser = new DOMParser();
  const plainText = parser.parseFromString(noteInformation, "text/html")
    .documentElement.textContent;

  function generateSummary() {
    setSummarizedNote("");
    axios
      .post("/api/summarizeNote", { noteData: plainText })
      .then((res) => {
        console.log(res.data);
        setSummarizedNote(res.data.summary);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data.message);
      });
  }

  function generateTestQuestions() {
    setTestQuestions([]);
    axios
      .post("/api/generateTestQuestions", { noteData: plainText })
      .then((res) => {
        console.log(res.data.testQuestions);
        let parsedTestQuestion = JSON.parse(res.data.testQuestions);
        console.log("parsed question is ", parsedTestQuestion);
        setTestQuestions(parsedTestQuestion);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data.message);
      });
  }

  let [ideaToVisualize, setIdeaToVisualize] = useState("");

  let [ideaImage, setIdeaImage] = useState("");
  function handleIdeaVisualizationChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setIdeaToVisualize(e.target.value);
  }

  function generateVisualization() {
    setIdeaImage("potato");
    axios
      .post("/api/generateIdeaVisualization", { ideaToVisualize })
      .then((res) => {
        setIdeaImage(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("use effect is called");
    if (feature === "Summarize Notes") {
      generateSummary();
    }

    if (feature === "Generate Test Questions") {
      generateTestQuestions();
    }
    if (feature === "Generate Idea Visualization") {
      generateVisualization();
    }
  }, [feature]);

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
            <h3 className="mt-10 text-[15px] font-medium">
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
          <section className="mt-3 h-[83vh] test-questions-section">
            <h3 className="mt-10 text-[15px] font-medium">
              Here are the test questions:
            </h3>
            {testQuestions.length > 0 ? (
              <>
                <div className="leading-7 h-[66vh] overflow-auto font-light text-[13.5px] mt-3">
                  {testQuestions.map((question: any) => {
                    return (
                      <>
                        <h3>
                          {" "}
                          <span className="font-medium">Question:</span>{" "}
                          {question.question}
                        </h3>
                        <h3 className="mt-1">
                          <span className="font-medium">View Answer:</span>{" "}
                          {question.answer}
                        </h3>
                        <br />
                      </>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <BoxedButton onclick={generateSummary}>
                    Generate New Questions
                  </BoxedButton>
                </div>
              </>
            ) : (
              <h3 className="font-light text-sm mt-3">
                Generating test questions..
              </h3>
            )}
          </section>
        )}

        {feature === "Generate Idea Visualization" && (
          <section className="mt-3 h-[83vh] test-questions-section">
            <h3 className="mt-10 text-[15px] ">
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
            {ideaImage ? (
              <>
                <img src={ideaImage} alt="Idea image" className="w-72" />
              </>
            ) : (
              <h3 className="text-sm font-light">Loading Image...</h3>
            )}
          </section>
        )}
      </div>
    </section>
  );
};

export default AIFeatures;

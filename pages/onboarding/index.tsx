import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import { OnboardingQuestionType } from "../../types/questions";
import Div100vh from "react-div-100vh";
import Card from "@mui/material/Card";
import ArrowCircleRightOutlined from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { useRouter } from "next/router";


const Onboarding = () => {
  const { axios, initialized } = useAxios({});

  const router = useRouter();

  const [questions, setQuestions] = useState<OnboardingQuestionType[]>();
  
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getOnboarding() {
      try {
        const response = await axios.get("onboarding");
        setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (initialized) getOnboarding();
  }, [axios]);

  const pushData = async () => {
    try {
      const response = await axios.post(
        "/onboarding-response/",
        JSON.stringify({ questions: questions })
      );
      router.push("/onboarding-return");
    } catch (error) {
      console.log(error);
    }
  };

  const [id, setId] = useState(0);
  const [answerNextId, setAnswerNextId] = useState<number | null>(0);
  const [x, setX] = useState(0);
  const [page, setPage] = useState(0);
  const [temp, setTemp] = useState("");
  const OnboardingQuestions: JSX.Element[] = [];


  questions?.map((question) => {
    OnboardingQuestions.push(
      <div className="flex flex-col  items-center">
        <>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 mt-1">
            {question.prompt}
          </h1>

          {question.widget_type === "choice" && (
            <div className="flex flex-col space-y-2 w-full items-start">
              {question.choices!.map((choice) => {
                return (
                  <div className="flex space-x-1 items-center justify-center px-2">
                    <input
                      type="radio"
                      name="choice"
                      checked={questions[id]?.answer ? undefined : false}
                      value={choice.response}
                      onChange={(e) => {
                        setAnswerNextId(choice.next || null);
                        {
                          setQuestions((questions) => {
                            questions![id].answer = e.target.value;
                            return questions;
                          });
                        }
                      }}
                      className={`
                        ${x === choice.id ? "bg-blue-500" : "bg-gray-300"}
                        mb-0.5
                        
                      `}
                    />
                    <h1 className={`font-medium`}>{choice.response}</h1>
                  </div>
                );
              })}
            </div>
          )}

          {question.widget_type === "dropdown" && (
            <div className="flex flex-col rounded-md items-center p-2 space-y-1">
              <h1 className="text-xl font-normal text-gray-800">
                {question.prompt}
              </h1>
              <div className="flex flex-col items-center">
                <select
                  className={`
                     rounded-full bg-transparent text-center
                `}
                  value={questions![id]?.answer}
                  onChange={(e) => {
                    setAnswerNextId(
                      question.choices!.find(
                        (choice) => choice.response === e.target.value
                      )?.next || null
                    );
                    //   add new key to questions object called answer
                    {
                      questions &&
                        setQuestions((questions) => {
                          questions![id].answer = e.target.value;
                          return questions;
                        });
                    }
                  }}
                >
                  <option>-- Seleccionar --</option>
                  {question.choices!.map((choice) => {
                    return <option>{choice.response}</option>;
                  })}
                </select>
              </div>
            </div>
          )}

          {question.widget_type === "text" && (
            <input
              placeholder={`Escribe tu respuesta aqui`}
              type="text"
              value={temp}
              onChange={(e) => {
                setAnswerNextId(question.choices![0].next);
                setTemp(e.target.value);
                {
                  questions &&
                    setQuestions((questions) => {
                      questions![id].answer = e.target.value;
                      return questions;
                    });
                }
              }}
              className="rounded-md w-full bg-transparent border-2 border-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-blue-500 focus:outline-none"
            />
          )}
        </>
      </div>
    );
  });

  const viewportQuestion = OnboardingQuestions[id]

  return (
    <Div100vh className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 flex items-center justify-center">
      <span className=" whitespace-nowrap text-blue-600 absolute top-2 left-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 418 42"
          className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
          preserveAspectRatio="none"
        >
          <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
        </svg>
        <span className="font-geomanist relative text-lg text-white">
          Firmala
        </span>
      </span>
      <Card
        className={`p-5`}
        style={{
          boxShadow: "0 0 100px 0 rgba(0,0,0,0.5)",
        }}
      >
        <button
          disabled={loading}
          onClick={() => {
            if (questions){
              if (!questions[id].answer && questions[id].widget_type === "text" && answerNextId !== null) {
                setAnswerNextId(questions[id].choices![0].next);
                setTemp("");
                setId(
                  questions?.findIndex(
                    (question) => question.id === answerNextId
                  ) || 0
                );
              }
              else if (answerNextId === null) {
                setLoading(true);
                pushData();
              } else {
                setId(
                  questions?.findIndex(
                    (question) => question.id === answerNextId
                  ) || 0
                );
                setTemp("");
              }
            }
          }}
          className={`w-full group`}
        >
          <div
            className={`group-hover:text-gray-500 flex items-center space-x-1 justify-end w-full transition-all duration-200`}
          >
            {answerNextId === null ? <h1>Terminar</h1> : <h1>Siguiente</h1>}
            <ArrowCircleRightOutlined />
          </div>
        </button>
        <div className={`overflow-y-auto overflow-x-hidden `}>
          {viewportQuestion}
        </div>
      </Card>
    </Div100vh>
  );
};

export default Onboarding;

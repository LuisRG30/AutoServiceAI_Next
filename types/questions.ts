import { OnboardingResponseType } from "./response";

export type OnboardingQuestionType = {
  prompt: string;
  id: number;
  choices: OnboardingResponseType[];
  answer?: string;
  widget_type: "text" | "dropdown" | "choice";
};

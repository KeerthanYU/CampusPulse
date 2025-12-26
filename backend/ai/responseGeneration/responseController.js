import { responses } from "./responseTemplates.js";
import { getLLMResponse } from "./llmService.js";

export async function generateResponse(intent, message, user) {
  if (responses[intent]) {
    return responses[intent];
  }

  // Dynamic data cases
  if (intent === "timetable") {
    return "Today's timetable is available in the Timetable section.";
  }

  if (intent === "grievance") {
    return "Please describe your grievance. I will help you file it.";
  }

  // Fallback to LLM
  return await getLLMResponse(message);
}

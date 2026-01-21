import type z from "zod";
import type { FinalResponse, PromptBodySchema } from "#schemas";

export type IncomingPrompt = z.infer<typeof PromptBodySchema>;

export type ErrorResponseDTO = {
  succes: false;
  error: string;
};

export type FinalResponseDTO =
  | z.infer<typeof FinalResponse>
  | { completion: string }
  | ErrorResponseDTO;

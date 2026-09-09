import {DaneoAxios} from "@/api/DaneoAxios.ts";
import type {TranslationRequest} from "@/types/translation/TranslationRequest.ts";
import type {TranslationResponse} from "@/types/translation/TranslationResponse.ts";

/**
 * Translate french to korean
 * @param data
 */
export const translate = async (data: TranslationRequest): Promise<TranslationResponse> => {
  const response = await DaneoAxios.post("/translate", data);
  return response.data;
}

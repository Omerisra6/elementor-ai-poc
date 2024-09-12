import {instructions} from "./assets/instructions/instructions-layout-focused.mjs";
import {atomicSchema} from "./assets/schemas/atomic-schema-09-12.mjs";

export const generateAtomicSchema = async ( { userMessage, openai } ) => {
	return await openai.beta.chat.completions.parse({
		model: "gpt-4o-mini",
		messages: [
			{role: "system", content: instructions},
			{role: "user", content: userMessage},
		],
		response_format: {
			type: "json_schema",
			json_schema: atomicSchema,
		}
	});
}

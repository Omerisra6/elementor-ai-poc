import OpenAI from "openai";
import fs from "fs/promises";
import {
	addSiteContext,
	createElementorPost,
	createResult,
	formatTestPrompts,
	getContainer,
	getHTMLWidget, spinner,
} from "./utils.mjs";
import {generatePureHTML} from "./html-assistant.mjs";
import {generateAtomicSchema} from "./atomic-schema-assistant.mjs";

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

const records = await fs.readFile("./assets/prompts.tsv", "utf8");

const prompts = formatTestPrompts( records );

const createPostsForPrompts = async ( prompts ) => {
	let HTMLDurationSum = 0;
	let atomicDurationSum = 0;
	let count = 0;
	for (const {title, url, prompt, elements} of prompts) {
		const userMessage = addSiteContext( prompt );
		try {
			const { container: HTMLContainer, duration: HTMLDuration } = await spinner( `Generating HTML for ${title}`, async () => {
				const HTMLStartTime = new Date().getTime();
				const htmlResponse = await generatePureHTML( { userMessage, openai } );
				const HTMLEndTime = new Date().getTime();
				const HTMLWidget = getHTMLWidget( htmlResponse.choices[0].message.content.replace(/(\r\n|\n|\r)/gm, "") );

				return { container: getContainer( [ HTMLWidget ] ), duration: HTMLEndTime - HTMLStartTime };
			} );

			const { container: atomicContainer, duration: atomicDuration } = await spinner( `Generating Atomic for ${title}`, async () => {
				const atomicStartTime = new Date().getTime();
				const atomicResponse = await generateAtomicSchema( { userMessage, openai } );
				const atomicEndTime = new Date().getTime();
				const atomicWidgets = JSON.parse( atomicResponse.choices[0].message.content );

				return { container: getContainer( [ atomicWidgets ] ), duration: atomicEndTime - atomicStartTime };
			});

			await spinner( `Creating results for ${title}`, async () => {
				await createResult( { content: { container: atomicContainer, duration: atomicDuration }, suffix: 'atomic' } );
				await createResult( { content: { container: HTMLContainer, duration: HTMLDuration }, suffix: 'html' } );
			} );

			HTMLDurationSum += HTMLDuration;
			atomicDurationSum += atomicDuration;
			count++;

			const atomicPostID = await spinner( `Creating Atomic Post for ${title}`, async () => {
				return await createElementorPost( { title: title + ' atomic', content: atomicContainer  } );
			} );

			const htmlPostID = await spinner( `Creating HTML Post for ${title}`, async () => {
				return await createElementorPost( { title: title + ' html', content: HTMLContainer  } );
			});

			console.log( `HTML Post ID: ${htmlPostID} Atomic Post ID: ${atomicPostID}` );
		}catch (error) {
			console.error( 'error in:' + title );
			console.error( error );
		}
	}

	const avgHTMLDurationInSec = HTMLDurationSum / count / 1000;
	const avgAtomicDurationInSec = atomicDurationSum / count / 1000;
	console.log( `Average HTML Generation Time: ${avgHTMLDurationInSec} seconds` );
	console.log( `Average Atomic Generation Time: ${avgAtomicDurationInSec} seconds` );
};

createPostsForPrompts( prompts );

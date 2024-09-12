import OpenAI from "openai";
import fs from "fs/promises";
import {createElementorPost, createResult, formatTestPrompts, getContainer, getHTMLWidget} from "./utils.mjs";
import {generatePureHTML} from "./html-assistant.mjs";
import {generateAtomicSchema} from "./atomic-schema-assistant.mjs";


const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

const records = await fs.readFile("./assets/prompts.tsv", "utf8");

const prompts = formatTestPrompts( records );

prompts.forEach( async ( { title, url, prompt, elements } ) => {
	const htmlResponse = await generatePureHTML( { userMessage: prompt, openai } );
	const HTMLWidget = getHTMLWidget( htmlResponse.choices[0].message.content.replace(/(\r\n|\n|\r)/gm, "") );

	const HTMLContainer = getContainer( [ HTMLWidget ] );

	const atomicResponse = await generateAtomicSchema( { userMessage: prompt, openai } );
	const atomicWidgets = JSON.parse( atomicResponse.choices[0].message.content );
	const atomicContainer = getContainer( [ atomicWidgets ] );

	await createResult( { content: atomicContainer, suffix: 'atomic' } );
	await createResult( { content: HTMLContainer, suffix: 'html' } );

	try {

		const atomicPostID = await createElementorPost( { title: title + ' atomic', content: atomicContainer  } );
		const htmlPostID = await createElementorPost( { title: title + ' html', content: HTMLContainer  } );
		console.log( `HTML Post ID: ${htmlPostID} Atomic Post ID: ${atomicPostID}` );
	}catch (error) {
		console.error( 'error in:' + title );
		console.error( error );
	}

});


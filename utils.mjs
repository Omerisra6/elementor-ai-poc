import url from "node:url";
import path from "node:path";
import fs from "fs/promises";
import { exec } from "child_process";
import {promisify} from "util";

const execPromise = promisify(exec);

export const getHTMLWidget = ( content ) => {
	return {
		"id": "17899e0",
		"elType": "widget",
		"settings": {
			"content_width": "full",
			"html": `${content}`,
			"widgetType": "html"
		},
		"elements": [],
		"widgetType": "html"
	}
}

export const getContainer = ( elements ) => {
	return [
		{
			"id": "82bf773",
			"elType": "container",
			"settings": [],
			elements,
			"isInner": false
		}
	];
}

export const formatTestPrompts = ( testPrompts ) => {
	let prompts = testPrompts.split("\n");

	prompts.shift();

	return prompts.map(row => {
		const [title, url, prompt, elements] = row.split("\t");

		return {
			title,
			url,
			prompt,
			elements
		};
	});
}

export const createElementorPost = async ( { title, content } ) => {
	const { stdout: HTMLPostResponse } = await execPromise(`wp-env run cli wp post create --post_title="${title}"`)
	const match = HTMLPostResponse.match(/\d+/);
	const postID = parseInt(match[0], 10);

	await execPromise(`wp-env run cli wp post meta add ${postID} _elementor_data '${JSON.stringify(content)}'` )
	await execPromise(`wp-env run cli wp post meta add ${postID} _elementor_edit_mode 'builder'`)

	return postID;
};

export const createResult = async ( { content, suffix } ) => {
	const __filename = url.fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const resultsFileName = `/results/${Date.now()}-${suffix}.json`;

	const resultPath = path.join(__dirname, resultsFileName);

	await fs.writeFile( resultPath,  JSON.stringify( content ) );
}


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

export const addSiteContext = ( userMessage )  => {
	const businesses = [
		{
			name: "Sunshine Blooms",
			description: "A flower shop specializing in seasonal arrangements.",
			colorPlate: {
				background: "#FFF4E3", // Soft Light Peach
				text: "#2C3E50",       // Deep Navy
				accent: "#FF6F61",     // Coral Red (flower vibe)
				textAccent: "#FFA500"  // Orange (sunshine feel)
			}
		},
		{
			name: "Brew Haven",
			description: "A cozy café offering artisan coffee and tea.",
			colorPlate: {
				background: "#3B2F2F", // Dark Coffee Brown
				text: "#FFFFFF",       // White
				accent: "#D4A373",     // Latte Beige
				textAccent: "#F4E3C2"  // Warm Cream
			}
		},
		{
			name: "Urban Threads",
			description: "A boutique selling trendy, eco-friendly clothing.",
			colorPlate: {
				background: "#F5F5F5", // Soft Light Gray
				text: "#2C3E50",       // Deep Navy
				accent: "#16A085",     // Teal (eco-friendly)
				textAccent: "#FF4757"  // Trendy Red
			}
		},
		{
			name: "TechFix Solutions",
			description: "A repair service for electronics and gadgets.",
			colorPlate: {
				background: "#1F1F1F", // Dark Gray
				text: "#FFFFFF",       // White
				accent: "#3498DB",     // Tech Blue
				textAccent: "#F1C40F"  // Bright Yellow
			}
		},
		{
			name: "GreenLeaf Landscaping",
			description: "A landscaping company focused on sustainable gardening.",
			colorPlate: {
				background: "#E9F5E1", // Light Green
				text: "#2F4F4F",       // Dark Forest Green
				accent: "#27AE60",     // Fresh Green
				textAccent: "#FFCC00"  // Earthy Yellow
			}
		},
		{
			name: "The Book Nook",
			description: "An independent bookstore with a curated selection of novels.",
			colorPlate: {
				background: "#F8F4EF", // Light Ivory
				text: "#2C3E50",       // Deep Navy
				accent: "#D35400",     // Burnt Orange
				textAccent: "#8E44AD"  // Literary Purple
			}
		},
		{
			name: "FitFuel Kitchen",
			description: "A meal prep service offering healthy, balanced meals.",
			colorPlate: {
				background: "#FFFFFF", // Clean White
				text: "#333333",       // Dark Gray
				accent: "#2ECC71",     // Fresh Green (healthy)
				textAccent: "#F39C12"  // Bright Orange (energizing)
			}
		},
		{
			name: "Pet Pals Grooming",
			description: "A pet grooming service for dogs and cats.",
			colorPlate: {
				background: "#F7E7E3", // Soft Pastel Pink
				text: "#2C3E50",       // Deep Navy
				accent: "#F39C12",     // Playful Orange
				textAccent: "#E74C3C"  // Red (for energy and fun)
			}
		},
		{
			name: "The Rustic Fork",
			description: "A farm-to-table restaurant emphasizing local ingredients.",
			colorPlate: {
				background: "#F4F1EB", // Light Beige
				text: "#2C3E50",       // Deep Navy
				accent: "#A0522D",     // Earthy Brown
				textAccent: "#8E44AD"  // Rich Purple (for a touch of sophistication)
			}
		},
		{
			name: "Crafty Creations",
			description: "A shop selling handmade crafts and DIY kits.",
			colorPlate: {
				background: "#F0E5D8", // Light Craft Paper Beige
				text: "#333333",       // Dark Gray
				accent: "#E67E22",     // Vibrant Orange (creativity)
				textAccent: "#9B59B6"  // Purple (artsy touch)
			}
		}
	];

	const business = businesses[Math.floor(Math.random() * businesses.length)];

	return 'Create a ' + userMessage + ' for my' + business.name + ' business. ' + business.description + ' Use the following color plate:\n' +
		'Background: ' + business.colorPlate.background + '\n' +
		'Text: ' + business.colorPlate.text + '\n' +
		'Accent: ' + business.colorPlate.accent + '\n' +
		'Text Accent: ' + business.colorPlate.textAccent;
}

export async function spinner (
	title,
	callback
){
	let i = 0;

	const id = setInterval(() => {
		process.stderr.write(` ${'⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'[i++ % 10]} ${title}\r`);
	}, 100);

	let result;

	try {
		result = await callback();
	} finally {
		clearInterval(id);

		process.stderr.write(' '.repeat(process.stdout.columns - 1) + '\r');
	}

	return result;
}

import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
import { readFile } from "node:fs/promises";

const fileName = "quotes.json";

export async function getQuotes() {
	try {
		const data = await readFile(fileName, "utf8");

		const jsonData = await JSON.parse(data);
		console.log(jsonData);
		return jsonData;
	} catch (error) {
		console.error("Error reading file:", error);
	}
}

export async function addQuote(quoteText) {
	// create quote object
	const quote = {};
	// assign an ID
	quote.id = uuidv4();
	// read the quotes from the quotes.json
	try {
		const data = await readFile(fileName, "utf8");
		const jsonData = await JSON.parse(data);
		// assign to object
		quote.quoteText = quoteText;
		console.log(quote);
		// TODO
		// write to file
		// return created obj
	} catch (error) {
		console.error("Error reading file:", error);
	}
}

addQuote("smello world");

export async function getRandomQuote() {}

export async function editQuote(id, quoteText) {}

export async function deleteQuote(id) {}

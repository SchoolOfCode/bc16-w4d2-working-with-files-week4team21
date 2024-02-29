import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "quotes.json";

export async function getQuotes() {
	try {
		const data = await fs.readFile(fileName, "utf8");

		const jsonData = await JSON.parse(data);
		console.log(jsonData);
		return jsonData;
	} catch (error) {
		console.error("Error reading file:", error);
	}
}

export async function addQuote(quoteText) {
	const data = await fs.readFile(fileName, "utf8");
	const jsonData = await JSON.parse(data);

	const newQuote = {
		id: uuidv4(),
		quoteText: quoteText,
	};
	jsonData.push(newQuote);
	console.log(jsonData);
	await fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), "utf-8");

	return newQuote;
}

export async function getRandomQuote() {}

export async function editQuote(id, quoteText) {}

export async function deleteQuote(id) {}

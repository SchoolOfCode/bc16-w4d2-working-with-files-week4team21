import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "quotes.json";

export async function getQuotes() {
	try {
		const data = await fs.readFile(fileName, "utf8");

		const jsonData = JSON.parse(data);
		console.log(jsonData);
		return jsonData;
	} catch (error) {
		console.error("Error reading file:", error);
	}
}

export async function addQuote(quoteText) {
	const jsonData = await fs.readFile(fileName, "utf8");
	const jsArray = JSON.parse(jsonData);
	const id = uuidv4();
	const quoteObject = {
		id,
		quoteText
	};
	jsArray.push(quoteObject);
	const newJsonData = JSON.stringify(jsArray);
	await fs.writeFile(fileName, newJsonData, "utf8");
	return quoteObject;
}

export async function getRandomQuote() {}

export async function editQuote(id, quoteText) {}

export async function deleteQuote(id) {}

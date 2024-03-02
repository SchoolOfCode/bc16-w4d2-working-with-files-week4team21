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

export async function getRandomQuote() {
	const jsonData = await fs.readFile(fileName, "utf8");
	const jsArray = JSON.parse(jsonData);
	const arrayIndex = Math.floor(Math.random()*jsArray.length);
	return jsArray[arrayIndex];
}

export async function editQuote(id, quoteText) {
	const jsonData = await fs.readFile(fileName, "utf8");
	const jsArray = JSON.parse(jsonData);
	let found = false;
	for (let i=0; i<jsArray.length; i++){
		if (jsArray[i]["id"]===id){
			jsArray[i]["quoteText"]=quoteText;
			found=true;
			const newJsonData = JSON.stringify(jsArray);
			await fs.writeFile(fileName, newJsonData, "utf8");
			return jsArray[i];
		}
	}
	if (!found) {
		return null;
	}
}

export async function deleteQuote(id) {
	const jsonData = await fs.readFile(fileName, "utf8");
	const jsArray = JSON.parse(jsonData);
	let found = false;
	for (let i=0; i<jsArray.length; i++){
		if(jsArray[i]["id"]===id){
			const deletedQuote = jsArray.splice(i, 1);
			const newJsonData = JSON.stringify(jsArray);found = true;
			await fs.writeFile(fileName, newJsonData, "utf8");
			return deletedQuote[0];
		}
	}
	if (!found){
		return null;
	}
}

function toggleStyle() {
	let page = document.body;

	preText.style.display = "none";
	if (priceToday > priceYesterday) {
		page.classList.toggle("green-mode");
		answerText.innerHTML =
			"Bitcoin <span class='answerHighlight'>is up</span> today! Kick back & relax, we're going to the moon! 🚀";
	} else {
		page.classList.toggle("red-mode");
		answerText.innerHTML =
			"Bitcoin <span class='answerHighlight'>is not up</span> today. You should buy the dip! 💰";
	}
	dateText.textContent = `Today's date is: ${now2}`;
	priceText.textContent = `Yesterdays price was $${price1}`;
}

let now2 = new Date();
now2 = now2.toLocaleDateString();

let preText = document.querySelector(".preText");
let dateText = document.querySelector("#dateText");
let priceText = document.querySelector("#priceText");
let answerText = document.querySelector("#answerText");

let todayTS = getTodayTimestamp();
let yesterdayTS = getPastTimestamp(1);
let yesterday2TS = getPastTimestamp(2);
let yesterday3TS = getPastTimestamp(3);
let yesterday4TS = getPastTimestamp(4);
let yesterday5TS = getPastTimestamp(5);
let yesterday6TS = getPastTimestamp(6);

function getPastTimestamp(daysBack) {
	// Get the current date
	const now = new Date();

	// Set the time to the desired day back at noon
	const pastDate = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() - daysBack,
		12,
		0,
		0,
	);

	// Convert the date to a UNIX timestamp (in seconds)
	const timestamp = Math.floor(pastDate.getTime() / 1000);

	return timestamp;
}

function getTodayTimestamp() {
	// Get the current date and time
	const now = new Date();

	// Convert the date to a UNIX timestamp (in seconds)
	const timestamp = Math.floor(now.getTime() / 1000);

	return timestamp;
}

//  console.log(yesterdayTS);  check yesterdays timestamp in unix

//  Fetch last weeks prices

let fetchToday = `/.netlify/functions/getPrice?timestamp=${todayTS}`;
let fetchYesterday = `/.netlify/functions/getPrice?timestamp=${yesterdayTS}`;
let fetchYesterday2 = `/.netlify/functions/getPrice?timestamp=${yesterday2TS}`;
let fetchYesterday3 = `/.netlify/functions/getPrice?timestamp=${yesterday3TS}`;
let fetchYesterday4 = `/.netlify/functions/getPrice?timestamp=${yesterday4TS}`;
let fetchYesterday5 = `/.netlify/functions/getPrice?timestamp=${yesterday5TS}`;
let fetchYesterday6 = `/.netlify/functions/getPrice?timestamp=${yesterday6TS}`;

const options = {
	method: "GET",
};

let priceData = [];
let priceToday = 0;
let priceYesterday = 0;
let priceYesterday2 = 0;
let priceYesterday3 = 0;
let priceYesterday4 = 0;
let priceYesterday5 = 0;
let priceYesterday6 = 0;

// --- now
await fetch(fetchToday, options)
	.then((response) => response.json())
	.then((result) => (priceToday = result.USD))
	.catch((err) => console.error(err));

//formats price number
priceToday = parseInt(priceToday);
let priceNow = priceToday.toLocaleString();
priceData.push(priceToday);

// --- 1

await fetch(fetchYesterday, options)
	.then((response) => response.json())
	.then((result) => (priceYesterday = result.USD))
	.catch((err) => console.error(err));

priceYesterday = parseInt(priceYesterday);
let price1 = priceYesterday.toLocaleString();
priceData.unshift(priceYesterday);

// --- 2

await fetch(fetchYesterday2, options)
	.then((response) => response.json())
	.then((result) => (priceYesterday2 = result.USD))
	.catch((err) => console.error(err));

priceYesterday2 = parseInt(priceYesterday2);
let price2 = priceYesterday2.toLocaleString();
priceData.unshift(priceYesterday2);
console.log(price2);

// --- 3

await fetch(fetchYesterday3, options)
	.then((response) => response.json())
	.then((result) => (priceYesterday3 = result.USD))
	.catch((err) => console.error(err));

//formats price number
priceYesterday3 = parseInt(priceYesterday3);
let price3 = priceYesterday3.toLocaleString();
priceData.unshift(priceYesterday3);
console.log(price3);

// --- 4

await fetch(fetchYesterday4, options)
	.then((response) => response.json())
	.then((result) => (priceYesterday4 = result.USD))
	.catch((err) => console.error(err));

priceYesterday4 = parseInt(priceYesterday4);
let price4 = priceYesterday4.toLocaleString();
priceData.unshift(priceYesterday4);
console.log(price4);

// --- 5

await fetch(fetchYesterday5, options)
	.then((response) => response.json())
	.then((result) => (priceYesterday5 = result.USD))
	.catch((err) => console.error(err));

priceYesterday5 = parseInt(priceYesterday5);
let price5 = priceYesterday5.toLocaleString();
priceData.unshift(priceYesterday5);
console.log(price5);

// --- 6

await fetch(fetchYesterday6, options)
	.then((response) => response.json())
	.then((result) => (priceYesterday6 = result.USD))
	.catch((err) => console.error(err));

priceYesterday6 = parseInt(priceYesterday6);
let price6 = priceYesterday6.toLocaleString();
priceData.unshift(priceYesterday6);
console.log(price6);

// switch the css to match current price
toggleStyle();

// animate the price

function animateValue(obj, start, end, duration) {
	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		let priceCalc = Math.floor(progress * (end - start) + start);
		obj.innerHTML = "$" + priceCalc.toLocaleString();

		if (progress < 1) {
			window.requestAnimationFrame(step);
		}
	};
	window.requestAnimationFrame(step);
}

// post the value
const obj = document.querySelector(".num");
animateValue(obj, priceYesterday, priceToday, 1800);

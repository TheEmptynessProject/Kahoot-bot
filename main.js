const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({
	sigint: true
});

const quizid = prompt("Enter quizID: ");
const pin = prompt("Enter pin: ");
const user = prompt("Username: ");

var interr = [];
var excla = [];

(async () => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	await page.goto('https://quizit.online/services/kahoot');

	await page.type('input.input-md', quizid);

	page.click('button.btn-lg');
	page.waitForNavigation();


	const quest = 'h5.mb-2';
	await page.waitForSelector(quest);

	const ans = 'p.font-medium.text-gray-500';
	await page.waitForSelector(ans);

	const questions = await page.evaluate(quest => {
		return [...document.querySelectorAll(quest)].map(anchor => {
			const title = anchor.textContent.split('|')[0].trim();
			return `${title} - ${anchor.href}`;
		});
	}, quest);

	const answers = await page.evaluate(ans => {
		return [...document.querySelectorAll(ans)].map(anchor => {
			const title = anchor.textContent.split('|')[0].trim();
			return `${title} - ${anchor.href}`;
		});
	}, ans);

	for (var i = 0; i < questions.length; i++) {
		interr[i] = questions[i].replace(' - undefined', '');
		excla[i] = answers[i].replace(' - undefined', '');
	}
	console.log(interr);
	console.log(excla);

          if(interr.length==excla.length){
                    console.log("Good")
          } else {
                    await browser.close();
          }

	const kah = await browser.newPage();

	await kah.goto('https://kahoot.it');

	await kah.type('input.sc-jHVexB', pin);

	kah.click('button.sc-gWHgXt');
	await kah.waitForNavigation();

	await kah.type('input.sc-jHVexB', user);

	kah.click('button.sc-gWHgXt');
	kah.waitForNavigation();
})();
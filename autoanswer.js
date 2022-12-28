const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({
	sigint: true
});

const quizid = prompt("Enter quizID: ");
const pin = prompt("Enter pin: ");
const user = prompt("Username: ");
const ms = prompt("Miliseconds to wait: ");

var correct = 0;

function wait(aguagugau) {
  return new Promise(xing => {
    setTimeout(xing, aguagugau);
  });
}

(async () => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	await page.goto('https://play.kahoot.it/rest/kahoots/' + quizid);

          await page.content(); 

    const innerText = await page.evaluate(() =>  {
        return JSON.parse(document.querySelector("body").innerText); 
    }); 
    if ('error' in innerText){
          await browser.close();
    }
    const quests = (innerText.questions)

    const kah = await browser.newPage();

    await kah.goto('https://kahoot.it');

    await kah.type('input.sc-jHVexB', pin);

    kah.click('button.sc-gWHgXt');
    await kah.waitForNavigation();

    await kah.type('input.sc-jHVexB', user);

    kah.click('button.sc-gWHgXt');
    kah.waitForNavigation();

    const red = 'button.fFONXg'
    const blue = 'button.hZGSQg'
    const yellow = 'button.cckBYR'
    const green = 'button.epOaBR'
    
    for(var i = 0; i < quests.length; i++){
          console.log(quests[i].question)
          for(var a = 0; a < 4; a++){
                    if (quests[i].choices[a].correct == true){
                              console.log(quests[i].choices[a].answer)
                              correct = a+1;
                              switch(correct){
                                        case 1: //red
                                        console.log('red')
                                        await kah.waitForSelector(red)
                                        wait(ms)
                                        await kah.click(red);
                                        break
                                        case 2://blue
                                        console.log('blue')
                                        await kah.waitForSelector(blue)
                                        wait(ms)
                                        await kah.click(blue);
                                        break
                                        case 3://yellow
                                        console.log('yellow')
                                        await kah.waitForSelector(yellow)
                                        wait(ms)
                                        await kah.click(yellow);
                                        break
                                        case 4://green
                                        console.log('green')
                                        await kah.waitForSelector(green)
                                        wait(ms)
                                        await kah.click(green);
                                        break
                               }
                    }
          }
    }
})();
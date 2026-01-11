import sleep from '../sleep/index.js';

async function logAfter(content, duration) {
    await sleep(duration);
    console.log(content)
}

export default logAfter;



console.log("Starting Log")
logAfter("Hi Dipu", 4000);
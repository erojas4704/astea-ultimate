require("dotenv").config();
const fakeDelayInSeconds = process.env.FAKE_DELAY_SECONDS;

const forFakeDelay = async (timer = 1) => {
    return new Promise((resolve) => {
        if (process.env.USE_FAKE_DELAY !== "true") return resolve();
        setTimeout(() => {
            resolve();
        }, timer * 1000);
    });
}

module.exports = forFakeDelay;
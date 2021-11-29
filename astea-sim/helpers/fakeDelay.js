require("dotenv").config();
const fakeDelayInSeconds = process.env.FAKE_DELAY_SECONDS;

const forFakeDelay = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, fakeDelayInSeconds * 1000);
    });
}

module.exports = forFakeDelay;
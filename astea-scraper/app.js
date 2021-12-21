const axios = require('axios');
const prompt = require('prompt');
require('dotenv').config();

prompt.start();
const backend = axios.create({
    proxy: {
        host: 'localhost',
        port: process.env.SERVER_PORT
    }
})


async function login(username, password) {
    try {
        const resp = await backend.post("/auth/login", { username, password, forceKick: true });
        return { data: resp.data, token: resp.headers['set-cookie'] };
    } catch (err) {
        console.log("Login failed.");
        console.log(err);
        process.exit(1);
    }
}

const delay = async (seconds = 1) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

(async () => {
    const { username, password } = await prompt.get([
        { name: 'username', default: process.env.DEFAULT_USER },
        { name: 'password', default: "Erin9714!", hidden: true }
    ]);

    console.info("Logging in as %s...", username);
    const { data: loginResult, token } = await login(username, password);
    console.log(loginResult, token);
    console.info("Logged in successfully!");
    console.log("Searching for orders...");
    backend.defaults.headers = { cookie: token };
    const { data } = await backend.get('/ServiceOrder/search', {
        params: {
            actionGroup: "QNTech",
            includeHistory: false
        }
    });
    console.log(`Found ${data.length} orders. Caching...`);
    for (let i = 0; i < data.length; i++) {
        const order = data[i];
        backend.get(`/ServiceOrder/${order.id}`);
        await delay(process.env.DELAY);
        console.log(`Cached ${i + 1}/${data.length}`);
    };
    console.log("Done!");
})();
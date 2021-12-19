const app = require("../app");
const express = require("express");
const supertest = require("supertest");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
let jwt = "";

beforeEach(async () => {
    const res = await supertest(app).post(
        "/auth/login",
        { username: "bert", password: "bert" }
    );

    jwt = res.headers["set-cookie"][0];
});

describe("Pulling orders", () => {
    test("Get order from history. GET /ServiceOrder/:id", async () => {
        const { body: order } = await supertest(app)
            .get("/ServiceOrder/SV0000000000@@0")
            .set("Cookie", [jwt])
            .expect(200);

        //TODO this only works in the home environment with a fake database
        expect(order.id).toBe("SV0000000000@@0");
        expect(order.customer.name).toMatch(/Testo Magnifico/i);
        expect(order.status).toBe("Invoiced");
    });

    test("Get order. GET /ServiceOrder/:id", async () => {
        const { body: order } = await supertest(app)
            .get("/ServiceOrder/SV0000000001@@0")
            .set("Cookie", [jwt])
            .expect(200);

        //TODO this only works in the home environment with a fake database
        expect(order.id).toBe("SV0000000001@@0");
        expect(order.customer.name).toMatch(/Testo Magnifico/i);
        expect(order.status).toBe("Resolved");
    });

    test("Make sure order has complete fields", async () => {
        const { body: order } = await supertest(app)
            .get("/ServiceOrder/SV0000000001@@0")
            .set("Cookie", [jwt])
            .expect(200);

        expect(order.requestId).toBe("SV0000000001");
        expect(order).toHaveProperty("openDate");
        expect(order).toHaveProperty("customer.name");
        expect(order).toHaveProperty("customer.id");
        expect(order).toHaveProperty("technician.name");
        expect(order).toHaveProperty("technician.id");
        expect(order).toHaveProperty("statusId");
        expect(order).toHaveProperty("serialNumber");
        expect(order).toHaveProperty("tag");
        expect(order).toHaveProperty("problem");
        expect(order).toHaveProperty("metadata.hostName");
        expect(order).toHaveProperty("metadata.stateId");
    })
});

describe("Searching orders", () => {
    test("Search for many. GET /ServiceOrder/search", async () => {
        const { body: orders } = await supertest(app)
            .get("/ServiceOrder/search")
            .query({ id: "SV211" })
            .set("Cookie", [jwt])
            .expect(200);

        expect(orders.length).toBeGreaterThan(5);
    });

    test("Single Search. GET /ServiceOrder/search", async () => {
        const { body: orders } = await supertest(app)
            .get("/ServiceOrder/search")
            .query({ id: "SV0000000000" })
            .set("Cookie", [jwt])
            .expect(200);

        expect(orders.length).toBe(1);
    });

});
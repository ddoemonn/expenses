import { Hono } from "hono";
import { z } from "zod";

interface Expense {
    amount: number;
    id: number;
    title: string;
}

const expenses: Expense[] = [
    {amount: 23, id: 1, title: "Groceries"},
    {amount: 101, id: 2, title: "Rent"},
    {amount: 16, id: 3, title: "Dinner at Joe's"},
    {amount: 200, id: 4, title: "Car payment"},
    {amount: 10, id: 5, title: "Coffee shop habit"},
    {amount: 500, id: 6, title: "Vacation to Hawaii"},
    {amount: 9, id: 7, title: "Book purchase"},
    {amount: 350, id: 8, title: "Phone bill"},
    {amount: 25, id: 9, title: "Donation to charity"},
    {amount: 120, id: 10, title: "Gym membership"},
    {amount: 75, id: 11, title: "Electric bill"},
];

const createPostSchema = z.object({
    amount: z.number().int().positive(),
    title: z.string().min(3).max(100),
});

export  const expensesRoute = new Hono()
    .get("/", (c) => {
        return c.json({expenses: []});
    })
    .post("/", async (c) => {
        const data = await c.req.json();
        const expense = createPostSchema.parse(data);
        console.log(expense);
        return c.json(expense);
    });
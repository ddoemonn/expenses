import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator";
import { z } from "zod";



const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    amount: z.number().int().positive(),
    title: z.string().min(3).max(100),
})

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({id: true});

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



export  const expensesRoute = new Hono()
    .get("/", (c) => {
        return c.json({expenses});
    })
    .post("/", zValidator("json", createPostSchema),async (c) => {
        const expense =  c.req.valid("json");
        expenses.push({...expense, id: expenses.length + 1})
        c.status(201);
        return c.json(expense);
    })
    .get("/:id{[0-9]+}", (c) => {
        const id = Number.parseInt(c.req.param("id"));
        const expense = expenses.find((e) => e.id === id);
        if(!expense) {
            return c.notFound()
        }
        return c.json({expense});

    })
    .delete("/:id{[0-9]+}", (c) => {
        const id = Number.parseInt(c.req.param("id"));
        const index = expenses.findIndex((e) => e.id === id);
        if(index === -1) {
            return c.notFound()
        }

        const deletedExpense = expenses.splice(index, 1)[0];
        return c.json({deletedExpense});
    })
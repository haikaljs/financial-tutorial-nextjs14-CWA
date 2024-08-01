
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get("/hello/:test",
    zValidator("param", z.object({
      test: z.string()
    })),
    
    (c) => {
    const {test} = c.req.valid("param");

    return c.json({
      message: "Hello test hono",
      test: test,
    })
 
  })
  .post("/creat/postId",
    zValidator("json", z.object({
      name: z.string(),
      userId: z.number()
    })),
    zValidator("param", z.object({
      postId: z.string(),
     
    })),
     (c) => {
      const {name, userId} = c.req.valid("json")
      const {postId} = c.req.valid("param")
    return c.json({
      message: "Just a test zod with hono.js",
      name,
      postId

    })
  })

export const GET = handle(app);
export const POST = handle(app);

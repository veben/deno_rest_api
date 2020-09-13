import { Application } from "https://deno.land/x/abc@v1.1.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { createDinosaur, getAllDinosaurs } from "./controllers/dinosaurs.ts";
import { ErrorMiddleware, LogMiddleware } from "./utils/middlewares.ts";

const app = new Application();
app.use(LogMiddleware)
   .use(ErrorMiddleware);
app.get("/api/dinosaur", getAllDinosaurs)
   .post("/api/dinosaur", createDinosaur)
   .start({port: 5000});
console.log(`server listening on http://localhost:5000`);

import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use("/api", routes);

app.get("/", (request, response) => {
	response.cookie("hello", "world", { maxAge: 30000, signed: true });
	response.send({ msg: "Hello world" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});

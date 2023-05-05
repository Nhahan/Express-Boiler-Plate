import express, {ErrorRequestHandler} from "express";
import createHttpError from "http-errors";

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "ok",
    });
});

app.use(() => {
    throw createHttpError(404, "Route not found");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.statusCode || 500).json({message: err.message || "Unknown Error"})
}
app.use(errorHandler);
app.listen(8080, () => console.log("Server started on port 8080"));
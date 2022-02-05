import express from "express";
const router = express.Router();

router.get("/", async function (req, res, next) {
    res.status(200).send(`ODOS Retrieval API - Healthy - ${new Date().toLocaleString()}`);
  });

export default router;
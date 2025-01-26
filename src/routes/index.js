import express from "express";
import v1Routes from "./v1/index.js";
import healthCheckRoute from "./healthy.js";

const router = express.Router();

router.use('/v1', v1Routes);
router.use('/healthy', healthCheckRoute);

export default router;
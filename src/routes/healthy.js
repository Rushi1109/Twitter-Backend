import express from "express";

const healthy = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Twitter_dev service is running',
        data: {},
        err: {}
    });
}

const router = express.Router();

router.route('/').get(healthy);

export default router;
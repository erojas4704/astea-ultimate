const Astea = require('../services/AsteaService');

const router = require('express').Router();
const { hasAsteaCredentials } = require('../middleware/asteaAuthentication');
router.use(hasAsteaCredentials); //Make sure we have a valid token

router.get("/search", async (req, res, next) => {
    const criteria = req.query;
    try {
        const results = await Astea.materialSearch(criteria, req.session);
        return res.json(results);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
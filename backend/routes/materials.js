const Astea = require('../services/AsteaService');

const router = require('express').Router();
const { hasAsteaCredentials } = require('../middleware/asteaAuthentication');
const MaterialService = require('../services/MaterialService');
router.use(hasAsteaCredentials); //Make sure we have a valid token

router.get("/search", async (req, res, next) => {
    const limit = req.query.limit;
    const cache = req.query.cache === "y";
    delete req.query.limit;
    delete req.query.cache;//TODO workaround to clear these from the query string.

    const criteria = req.query;

    try {
        const results = cache ?
        await MaterialService.search(criteria, limit)
        : await Astea.materialSearch(criteria, req.session);
        return res.json(results);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
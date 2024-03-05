const { Listing } = require('../db/models')

const listingAuth = async (req, res, next) => {
    const listing = await Listing.findByPk(req.params.listingId)
    req.listing = listing

    if (!listing) {
        const err = new Error(`Listing not found.`)
        err.title = 'Listing 404';
        err.errors = { message: "Listing not found." }
        err.status = 404;
        return next(err)
    }

    return next();
}

module.exports = { listingAuth };

module.exports = {
    setLimit: (req, res, next) => {
        if ("limit" in req.query) {
            req.limit = req.query.limit;
        }
        next();
    },
    setOrderBy: (req, res, next) => {
        if ("orderby" in req.query || "orderBy" in req.query) {
            req.orderBy = req.query.orderBy;
        }
        next();
    }
}

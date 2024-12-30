function jsonToLower(obj) {
    const json = JSON.stringify(obj);
    const newJson = json.replace(/"(\w+)":/g, function ($0, $1) {
        return ('"' + $1.toLowerCase() + '":');
    });
    return JSON.parse(newJson);
}

module.exports = {
    setLimit: (req, res, next) => {

        const queryParams = jsonToLower(req.query);

        if ("limit" in queryParams) {
            req.limit = ' limit ' + queryParams.limit;
        } else {
            req.limit = '';
        }
        next();
    },
    setOrderBy: (req, res, next) => {

        const queryParams = jsonToLower(req.query);

        if ("orderby" in queryParams) {
            req.orderBy = ' order by ' + queryParams.orderby + ' ASC ';
        } else {
            req.orderBy = '';
        }
        next();
    }
}

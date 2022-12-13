//Pagination Middleware
function paginatedResults(model) {
    //which return request and response
    return async (req, res, next) => {
        //set page and limit for url
        //req.query.page & limit act as string so we use parseInt
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        //for starting page, page is 1 so 1-1=0 and limit is multiply to it make it 0(for first)
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        //create object to put extra response on result
        const results = {};

        if (endIndex < await model.countDocuments().exec()) {
            //next page and limit
            results.next = {
                //page will be 2(after 1) but limit remains same(5)
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            //previous page and limit
            results.previous = {
                //page will be 1(after 2) but limit remains same(5)
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();

        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

module.exports = { paginatedResults }
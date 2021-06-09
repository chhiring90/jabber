class APIFeatures {

    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    // filter(){
    //     const queryObj = {...this.queryString};
    //     const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //     excludedFields.forEach(el => delete queryObj[el]);

    //     let queryStr = JSON.stringify(queryObj);
    //     queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, match => `$${match}`);

    //     this.query = this.query.find(JSON.parse(queryStr));
    //     return this;
    // }


    filter(){
        const queryObj = {...this.queryString};
        const excludedFileds = ['sort', 'limit', 'fields', 'page'];
        excludedFileds.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, match => `$${match}`);

        this.query = this.query.filter(JSON.parse(queryStr));
        return this;

    }

    sort(){
        if(this.query.sort){
            const sortBy = this.queryString.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        if(this.query.fields){
            const sortBy = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(sortBy);
        }else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

}

module.exports = APIFeatures;
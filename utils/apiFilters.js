class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    // if keyword is there in the query then search in the name of the keyword
    const keyword = this.queryStr.keyword
      ? {
          name: {
            // regex -> helps us to search in the name of the product and not exactly match the product name with the keyword
            $regex: this.queryStr.keyword,
            $options: "i", // -> this means that the search is case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };

    // Removing keyword field as it is taken care by above search function
    const fieldsToRemove = ["keyword", "page"];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, rating etc.
    let queryStr = JSON.stringify(queryCopy);
    // to insert dollar before gte
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // JSON.parse() -> converts string to javascript objects
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    // limit() -> will limit the results per page
    // skip() -> will skip the products accordingly
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;

/**
 * @author Pavneet Singh
 */

export default (limit, page, order, headers) => fetch(`https://api.thecatapi.com/v1/images/search?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}`);
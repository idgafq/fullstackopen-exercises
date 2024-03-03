const _ = require('lodash')

const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((accu, blog) => {
		return accu + blog.likes
	}, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((result, blog) => (result && result.likes > blog.likes) ? result : blog, undefined)
}

const mostBlogs = (blogs) => {
	const authors = _.map(blogs, 'author')
	const authorsBlogsCounts = _.countBy(authors)
	return _.reduce(authorsBlogsCounts, (result, value, key) => (result && result.blogs > value) ? result : { author: key, blogs: value }, undefined)
}

const mostLikes = (blogs) => {
	const grouped = _.groupBy(blogs, 'author')
	const authorsLikesSummed = _.map(grouped, (value, key) => ({ author: key, likes: _.sumBy(value, 'likes') }))
	return _.maxBy(authorsLikesSummed, 'likes')
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
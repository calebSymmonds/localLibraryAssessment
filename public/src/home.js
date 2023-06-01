function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => (book.borrows[0].returned ? count : count + 1), 0);
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((acc, book) => {
    const { genre } = book;
    if (acc[genre]) {
      acc[genre].count += 1;
    } else {
      acc[genre] = { name: genre, count: 1 };
    }
    return acc;
  }, {});
  const sortedGenres = Object.values(genreCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  return sortedGenres;
}

function getMostPopularBooks(books) {
  const popularBooks = books.map(book => {
    return {
      name: book.title,
      count: book.borrows.length
    };
  });
  popularBooks.sort((a, b) => b.count - a.count);
  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorCount = {};
  books.forEach(book => {
    const { authorId, borrows } = book;
    if (authorCount[authorId]) {
      authorCount[authorId] += borrows.length;
    } else {
      authorCount[authorId] = borrows.length;
    }
  });
  const popularAuthors = [];
  for (const authorId in authorCount) {
    const author = authors.find(author => author.id === Number(authorId));
    if (author) {
      popularAuthors.push({
        name: `${author.name.first} ${author.name.last}`,
        count: authorCount[authorId]
      });
    }
  }
  popularAuthors.sort((a, b) => b.count - a.count);
  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

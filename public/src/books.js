function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];
  const returned = [];
  
  books.reduce((acc, book) => {
    if (book.borrows[0].returned) {
      returned.push(book);
    } else {
      borrowed.push(book);
    }
  }, []);

  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  let bookArray = [];
  return book.borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    const borrower = { ...borrow, ...account };
    if (bookArray.length < 10) {
      bookArray.push(borrower);
    }
    return borrower;
  }).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

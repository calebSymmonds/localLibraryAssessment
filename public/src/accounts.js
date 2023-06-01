function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.localeCompare(b.name.last));
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((total, book) => {
    const borrowCount = book.borrows.reduce(
      (count, borrow) => count + (borrow.id === accountId),
      0
    );
    return total + borrowCount;
  }, 0);
}

/*Helper Function*/
function findAuthorById(authors, authorId) {
  return authors.find(author => author.id === authorId);
}


function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  return books.filter(book =>
    book.borrows.some(
      borrow => borrow.id === accountId && !borrow.returned
    )
  ).map(book => {
    const author = findAuthorById(authors, book.authorId);
    return { ...book, author };
  });
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

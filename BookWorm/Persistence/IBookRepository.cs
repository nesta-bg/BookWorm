using BookWorm.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllBooks();

        Task<Book> GetBookById(int id);

        Task<List<Book>> GetBooksByCategory(string category);

        void AddBook(Book book);

        void RemoveBook(Book book);
    }
}

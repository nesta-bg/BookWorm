using BookWorm.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public class BookRepository : IBookRepository
    {
        private readonly BookWormDbContext context;

        public BookRepository(BookWormDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Book>> GetAllBooks()
        {
            return await context.Books
                .ToListAsync();
        }

        public async Task<Book> GetBookById(int id)
        {
            return await context.Books
                .SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Book>> GetBooksByCategory(string category)
        {
            return await context.Books
                .Where(b => b.Category.ValueName == category)
                .ToListAsync();
        }

        public void AddBook(Book book)
        {
            context.Books
                .Add(book);
        }

        public void RemoveBook(Book book)
        {
            context.Books
                .Remove(book);
        }
    }
}

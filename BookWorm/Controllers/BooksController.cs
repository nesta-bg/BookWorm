using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{

    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;

        public BooksController(BookWormDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<BookResource>> GetBooks()
        {
            var books = await context.Books.ToListAsync();

            return mapper.Map<List<Book>, List<BookResource>>(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await context.Books.SingleAsync(b => b.Id == id);

            if (book == null)
                return NotFound();

            var bookResource = mapper.Map<Book, BookResource>(book);

            return Ok(bookResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] BookResource bookResource)
        {
            var book = mapper.Map<BookResource, Book>(bookResource);

            context.Books.Add(book);
            await context.SaveChangesAsync();

            book = await context.Books.SingleOrDefaultAsync(b => b.Id == book.Id);

            var result = mapper.Map<Book, BookResource>(book);

            return Ok(result);
        }
    }
}


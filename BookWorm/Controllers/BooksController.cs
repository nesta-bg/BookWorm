using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;
using BookWorm.Persistence;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookWorm.Controllers
{

    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly BookWormDbContext context;
        private readonly IMapper mapper;
        private readonly IBookRepository repository;

        public BooksController(BookWormDbContext context, IMapper mapper, IBookRepository repository)
        {
            this.context = context;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<BookResource>> GetBooks()
        {
            var books = await repository.GetAllBooks();

            return mapper.Map<List<Book>, List<BookResource>>(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await repository.GetBookById(id);

            if (book == null)
                return NotFound();

            var bookResource = mapper.Map<Book, BookResource>(book);

            return Ok(bookResource);
        }

        [HttpGet("category/{category}")]
        public async Task<IEnumerable<BookResource>> GetBooksByCategory(string category)
        {
            var books = await repository.GetBooksByCategory(category);

            return mapper.Map<List<Book>, List<BookResource>>(books);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] BookResource bookResource)
        {
            var book = mapper.Map<BookResource, Book>(bookResource);

            repository.AddBook(book);
            await context.SaveChangesAsync();

            book = await repository.GetBookById(book.Id);

            var result = mapper.Map<Book, BookResource>(book);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookResource bookResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var book = await repository.GetBookById(id);

            if (book == null)
                return NotFound();

            mapper.Map(bookResource, book);
            context.SaveChanges();

            return Ok(mapper.Map<Book, BookResource>(book));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await repository.GetBookById(id);

            if (book == null)
                return NotFound();

            repository.RemoveBook(book);
            context.SaveChanges();

            return Ok();
        }
    }
}


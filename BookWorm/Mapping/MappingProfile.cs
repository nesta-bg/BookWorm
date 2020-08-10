using AutoMapper;
using BookWorm.Controllers.Resources;
using BookWorm.Models;

namespace BookWorm.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUserResource, AppUser>();
            CreateMap<BookResource, Book>();

            CreateMap<Category, CategoryResource>();
            CreateMap<Book, BookResource>();
        }
    }
}

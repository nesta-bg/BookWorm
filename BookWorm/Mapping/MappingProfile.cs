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
            CreateMap<BookResource, Book>()
                .ForMember(b => b.Id, opt => opt.Ignore());
            CreateMap<ShoppingCartItemResource, ShoppingCartItem>();
            CreateMap<ShippingResource, Shipping>();

            CreateMap<Category, CategoryResource>();
            CreateMap<Book, BookResource>();
            CreateMap<ShoppingCart, ShoppingCartResource>();

            // if corresponding property in source object does not have the same name - ShoppingCartItems, it won't work automatically.
            //CreateMap<ShoppingCart, ShoppingCartResource>()
            //    .ForMember(
            //        dst => dst.ShoppingCartItemResources,
            //        opts => opts.MapFrom(src => src.ShoppingCartItems));
            CreateMap<ShoppingCartItem, ShoppingCartItemResource>();
            CreateMap<Shipping, ShippingResource>();
            CreateMap<AppUser, AppUserResource>();
        }
    }
}
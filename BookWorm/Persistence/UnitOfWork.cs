using BookWorm.Core;
using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BookWormDbContext context;

        public UnitOfWork(BookWormDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}

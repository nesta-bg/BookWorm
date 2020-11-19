using System.Threading.Tasks;

namespace BookWorm.Persistence
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}

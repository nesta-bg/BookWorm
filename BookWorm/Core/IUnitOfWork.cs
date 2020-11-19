using System.Threading.Tasks;

namespace BookWorm.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}

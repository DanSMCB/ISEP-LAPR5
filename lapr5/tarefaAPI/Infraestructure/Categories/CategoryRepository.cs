using tarefaAPI.Domain.Categories;
using tarefaAPI.Infrastructure.Shared;

namespace tarefaAPI.Infrastructure.Categories
{
    public class CategoryRepository : BaseRepository<Category, CategoryId>, ICategoryRepository
    {
    
        public CategoryRepository(MySQLContext context):base(context.Categories)
        {
           
        }


    }
}
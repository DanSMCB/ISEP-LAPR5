using tarefaAPI.Domain.Families;
using tarefaAPI.Infrastructure.Shared;

namespace tarefaAPI.Infrastructure.Families
{
    public class FamilyRepository : BaseRepository<Family, FamilyId>, IFamilyRepository
    {
      
        public FamilyRepository(MySQLContext context):base(context.Families)
        {
            
        }

    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tarefaAPI.Domain.Tarefas;

namespace tarefaAPI.Infrastructure.Tarefas
{
    public class TarefaEntityTypeConfiguration : IEntityTypeConfiguration<Tarefa>
    {
        public void Configure(EntityTypeBuilder<Tarefa> builder)
        {
            builder.HasKey(b => b.Codigo);
        }
    }
}

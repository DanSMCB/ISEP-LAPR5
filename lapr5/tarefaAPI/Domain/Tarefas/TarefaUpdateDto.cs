
namespace tarefaAPI.Domain.Tarefas
{
    public class TarefaUpdateDto
    {
        public string Codigo { get; set; }
        public string Estado { get; set; }

        public TarefaUpdateDto(string codigo, string estado)
        {
            this.Codigo = codigo;
            this.Estado = estado;
        }
    }
}

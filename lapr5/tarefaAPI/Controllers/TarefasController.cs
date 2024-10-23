using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using tarefaAPI.Domain.Tarefas;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace tarefaAPI.Controllers
{
    [Route("api/tarefa")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private readonly TarefaService _service;
        private readonly ILogger<TarefasController> _logger;

        public TarefasController(TarefaService service, ILogger<TarefasController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // GET: api/tarefa/listall
        [HttpGet("listall")]
        public async Task<ActionResult<IEnumerable<TarefaDto>>> GetAll()
        {
            var tarefas = await _service.GetTarefasAsync();
            _logger.LogInformation($"Número de tarefas recuperadas: {tarefas.Count}");
            return tarefas;
        }


        // GET: api/tarefa/listallNaoAprovada
        [HttpGet("listallNaoAprovada")]
        public async Task<ActionResult<IEnumerable<TarefaDto>>> GetNaoAprovadas()
        {
            var tarefas = await _service.GetTarefasNaoAprovadasAsync();
            _logger.LogInformation($"Número de tarefas recuperadas: {tarefas.Count}");
            return tarefas;
        }

        // POST: api/tarefa/create
        [HttpPost("create")]
        public async Task<ActionResult<TarefaDto>> Create([FromBody] TarefaDto tarefaDto)
        {
            if (tarefaDto == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"TarefaDto: {JsonConvert.SerializeObject(tarefaDto)}");

            var novaTarefa = await _service.CreateTarefaAsync(tarefaDto);

            Console.WriteLine($"Nova Tarefa: {JsonConvert.SerializeObject(novaTarefa)}");

            return novaTarefa;
        }

        [HttpPatch("updateEstadoDaTarefa")]
        public async Task<ActionResult<TarefaDto>> UpdateEstadoDaTarefa([FromBody] TarefaUpdateDto tarefaUpdateDto)
        {
            if (tarefaUpdateDto == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"TarefaUpdateDto: {JsonConvert.SerializeObject(tarefaUpdateDto)}");

            var tarefaAtualizada = await _service.UpdateEstadoDaTarefaAsync(tarefaUpdateDto.Codigo, tarefaUpdateDto.Estado);
            if (tarefaAtualizada == null)
            {
                return NotFound();
            }

            Console.WriteLine($"tarefaAtualizada: {JsonConvert.SerializeObject(tarefaAtualizada)}");

            return tarefaAtualizada;
        }
    }
}

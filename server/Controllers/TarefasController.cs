using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class TarefasController : ApiController
    {
        // GET: api/tarefas/
        [HttpGet]
        [Route("api/tarefas")]
        public IEnumerable<Lib_Primavera.Model.Tarefa> Get()
        {
            return Lib_Primavera.PriIntegrationTarefa.ListaTarefas();
        }

        // GET: api/tarefas/rangeTarefas/{dataInicio}/{dataFim}
        [Route("api/tarefas/rangeTarefas/{dataInicio}/{dataFim}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.Tarefa> GetRangeTarefas(string d1, string d2)    //yyyy-mm-dd hh:mm:ss.fff
        {
            return Lib_Primavera.PriIntegrationTarefa.GetRangeTarefas(d1, d2);
        }

        // GET api/tarefas/id    
        [HttpGet]
        [Route("api/tarefas/{id}")]
        public Lib_Primavera.Model.Tarefa Get(string id)
        {
            Lib_Primavera.Model.Tarefa tarefa = Lib_Primavera.PriIntegrationTarefa.GetTarefa(id);
            if (tarefa == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return tarefa;
            }
        }
    }
}

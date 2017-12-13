using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class TipoTarefaController : ApiController
    {
        // GET: api/tipo_tarefa
        [HttpGet]
        [Route("api/tipo_tarefa")]
        public IEnumerable<Lib_Primavera.Model.TipoTarefa> Get()
        {
            return Lib_Primavera.PriIntegrationTipoTarefa.ListaTipoTarefa();
        }

        // GET api/tarefas/tipo_tarefa
        [HttpGet]
        [Route("api/tipo_tarefa/{id}")]
        public Lib_Primavera.Model.TipoTarefa Get(string id)
        {
            Lib_Primavera.Model.TipoTarefa tarefa = Lib_Primavera.PriIntegrationTipoTarefa.GetTipoTarefa(id);

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

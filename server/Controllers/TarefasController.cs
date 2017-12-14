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
        // GET: api/tarefas
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

        // GET: api/tarefas/oportunidade/{id}
        [Route("api/tarefas/oportunidade/{id}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.Tarefa> GetRangeTarefas(string id)
        {
            return Lib_Primavera.PriIntegrationTarefa.GetTarefasOportunidade(id);
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


        [HttpPost]
        [Route("api/tarefas")]
        public HttpResponseMessage Post(Lib_Primavera.Model.Tarefa tarefa)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationTarefa.InsereTarefaObj(tarefa);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(
                   HttpStatusCode.Created, tarefa);
                string uri = Url.Link("DefaultApi", new { CodTarefa = tarefa.ID });
                // response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

        public HttpResponseMessage Delete(string id)
        {


            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();

            try
            {

                erro = Lib_Primavera.PriIntegrationTarefa.DelTarefa(id);

                if (erro.Erro == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, erro.Descricao);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, erro.Descricao);
                }

            }

            catch (Exception exc)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, erro.Descricao);

            }

        }


        public HttpResponseMessage Put(Lib_Primavera.Model.Tarefa tarefa)
        {

            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();

            try
            {
                erro = Lib_Primavera.PriIntegrationTarefa.UpdTarefa(tarefa);
                if (erro.Erro == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, erro.Descricao);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, erro.Descricao);
                }
            }

            catch (Exception exc)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, erro.Descricao);
            }
        }
   
    }
}

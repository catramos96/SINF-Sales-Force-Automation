using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class GruposController : ApiController
    {
        [HttpGet]
        [Route("api/grupos")]
        public IEnumerable<Lib_Primavera.Model.Grupo> Get()
        {
            return Lib_Primavera.PriIntegrationGrupo.ListaEquipas();
        }

        [HttpPost]
        [Route("api/grupos")]
        public HttpResponseMessage Post(Lib_Primavera.Model.Grupo grp)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationGrupo.InsereGrupoObj(grp);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(
                   HttpStatusCode.Created, grp);
                string uri = Url.Link("DefaultApi", new { Id = grp.Id });
                //response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}

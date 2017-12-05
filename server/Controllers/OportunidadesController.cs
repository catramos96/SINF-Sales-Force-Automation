using FirstREST.Lib_Primavera.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class OportunidadesController : ApiController
    {
        // GET: api/opportunities/
        [HttpGet]
        [Route("api/oportunidades")]
        public IEnumerable<Lib_Primavera.Model.Oportunidade> Get()
        {
            return Lib_Primavera.PriIntegrationOportunidade.ListaOpportunidades();
        }

        // GET api/opportunities/id    
        [HttpGet]
        [Route("api/oportunidades/{id}")]
        public Oportunidade Get(string id)
        {
            Lib_Primavera.Model.Oportunidade opportunity = Lib_Primavera.PriIntegrationOportunidade.GetOportunidade(id);
            if (opportunity == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return opportunity;
            }
        }

        //POST api/oportunidades
        [HttpPost]
        [Route("api/oportunidades")]
        public HttpResponseMessage Post(Lib_Primavera.Model.Oportunidade oportunidade)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationOportunidade.CreateOportunidade(oportunidade);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, oportunidade);
                string uri = Url.Link("DefaultApi", new { Id = oportunidade.ID });
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

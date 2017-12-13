using FirstREST.Lib_Primavera.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class OpportunitiesController : ApiController
    {
        // GET: api/opportunities/
        [HttpGet]
        [Route("api/opportunities")]
        public IEnumerable<Lib_Primavera.Model.Oportunidade> Get()
        {
            return Lib_Primavera.PriIntegrationOportunidade.ListaOpportunidades();
        }
        /*
        // GET api/opportunities/vendedor/id    
        [HttpGet]
        [Route("api/opportunities/vendedor/{id}")]
        public IEnumerable<Lib_Primavera.Model.Oportunidade> GetVendedor(string id)
        {
            return Lib_Primavera.PriIntegrationOportunidade.ListaOportunidadesVendedor(id);
        }
        */
        // GET api/opportunities/id    
        [HttpGet]
        [Route("api/opportunities/{id}")]
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
    }
}

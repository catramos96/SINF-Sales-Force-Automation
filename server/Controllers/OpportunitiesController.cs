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
        public IEnumerable<Lib_Primavera.Model.Opportunity> Get()
        {
            return Lib_Primavera.PriIntegrationOpportunity.ListaOpportunidades();
        }

        // GET api/opportunities/id    
        [HttpGet]
        [Route("api/opportunities/{id}")]
        public Opportunity Get(string id)
        {
            Lib_Primavera.Model.Opportunity opportunity = Lib_Primavera.PriIntegrationOpportunity.GetOportunidade(id);
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

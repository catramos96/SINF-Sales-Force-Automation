using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FirstREST.Lib_Primavera.Model;

namespace FirstREST.Controllers
{
    public class RotasController : ApiController
    {
        // GET: api/rotas/
        [HttpGet]
        [Route("api/rotas")]
        public IEnumerable<Lib_Primavera.Model.Rota> Get()
        {
            return Lib_Primavera.PriIntegrationRota.ListaRotas();
        }

        // GET: api/rotas/
        [HttpGet]
        [Route("api/rotas/{id}")]
        public Lib_Primavera.Model.Rota Get(string id)
        {
            return Lib_Primavera.PriIntegrationRota.GetRota(id);
        }
    }
}

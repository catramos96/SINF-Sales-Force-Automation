using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FirstREST.Lib_Primavera.Model;

namespace FirstREST.Controllers
{
    public class SubFamiliasController : ApiController
    {
        // GET api/subfamilia/nomeFamilia  
        [Route("api/subfamilia/{id}")]
        public IEnumerable<Lib_Primavera.Model.SubFamilia> Get(string id)
         {
             return Lib_Primavera.PriIntegration.ListaSubCategoriasPorCategoria(id);
         }
    }
}

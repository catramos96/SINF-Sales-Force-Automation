using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FirstREST.Lib_Primavera.Model;

namespace FirstREST.Controllers
{
    public class ArtigosController : ApiController
    {
        //
        // GET: /Artigos/
        //[Route("api/artigos")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.Artigo> Get()
        {
            return Lib_Primavera.PriIntegration.ListaArtigos();
        }

        /**
         * NAO ESTA A FUNCIONAR MUITO BEM
         *
        // GET: /Artigos/SubFamilia
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.Artigo> Get(string id)
        {
            return Lib_Primavera.PriIntegration.ListaArtigosFamiliaSubFamilia(id);
        }
         */ 

        // GET api/artigo/5    
        public Artigo Get(string id)
        {
            Lib_Primavera.Model.Artigo artigo = Lib_Primavera.PriIntegration.GetArtigo(id);
            if (artigo == null)
            {
                throw new HttpResponseException(
                  Request.CreateResponse(HttpStatusCode.NotFound));
            }
            else
            {
                return artigo;
            }
        }

    }
}


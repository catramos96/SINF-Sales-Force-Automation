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
        // GET: api/artigos/
        [HttpGet]
        [Route("api/artigos")]
        public IEnumerable<Lib_Primavera.Model.Artigo> Get()
        {
            return Lib_Primavera.PriIntegrationArtigo.ListaArtigos();
        }

        // GET: api/artigos/subfamilia/{categoria}/{subcategoria}
        [Route("api/artigos/subfamilias/{categoria}/{subcategoria}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.Artigo> GetSubFamilias(string categoria, string subcategoria)
        {
            return Lib_Primavera.PriIntegrationArtigo.ListaArtigosFamiliaSubFamilia(categoria, subcategoria);
        }

        // GET: api/artigos/search/{search}
        [Route("api/artigos/search/{search}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.Artigo> SearchArtigo(string search)
        {
            return Lib_Primavera.PriIntegrationArtigo.SearchArtigo(search);
        }

        // GET api/artigos/id    
        [HttpGet]
        [Route("api/artigos/{id}")]
        public Artigo Get(string id)
        {
            Lib_Primavera.Model.Artigo artigo = Lib_Primavera.PriIntegrationArtigo.GetArtigo(id);
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


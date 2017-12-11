using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class VendedoresController : ApiController
    {

        // GET: /Vendedores/
        [HttpGet]
        [Route("api/vendedores")]
        public IEnumerable<Lib_Primavera.Model.Vendedor> Get()
        {
            return Lib_Primavera.PriIntegrationVendedor.ListaVendedores();
        }

        // POST: /Vendedores/
        [HttpPost]
        [Route("api/vendedores")]
        public HttpResponseMessage Post(Lib_Primavera.Model.Vendedor vendedor)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationVendedor.InsereVendedorObj(vendedor);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(
                   HttpStatusCode.Created, vendedor);
                string uri = Url.Link("DefaultApi", new { Id = vendedor.Id });
                //response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

        // POST: /Vendedores/login
        [HttpPost]
        [Route("api/vendedores/login")]
        public HttpResponseMessage Login(Lib_Primavera.Model.Vendedor vendedor)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationVendedor.CheckLoginDetails(vendedor);

            if (erro.Erro >= 0)
            {
                Lib_Primavera.Model.Vendedor myVendedor = Lib_Primavera.PriIntegrationVendedor.GetVendedor(erro.Erro);
                var response = Request.CreateResponse(
                   HttpStatusCode.Accepted, myVendedor);
                string uri = Url.Link("DefaultApi", new { Id = vendedor.Id });
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
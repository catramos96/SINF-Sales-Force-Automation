using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class ContactosController : ApiController
    {
        
        // GET: /Contactos/
        [HttpGet]
        [Route("api/contactos")]
        public IEnumerable<Lib_Primavera.Model.Contacto> Get()
        {
            return Lib_Primavera.PriIntegrationContacto.ListaContactos();
        }

        // POST: /Contactos/
        [HttpPost]
        [Route("api/contactos")]
        public HttpResponseMessage Post(Lib_Primavera.Model.Contacto contacto)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationContacto.InsereContactoObj(contacto);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(
                   HttpStatusCode.Created, contacto);
                string uri = Url.Link("DefaultApi", new { Id = contacto.Id });
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

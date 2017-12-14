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

        // GET api/contactos/5
        [HttpGet]
        [Route("api/contactos/{id}")]
        public IEnumerable<Lib_Primavera.Model.Contacto> GetContacto(string id)
        {
            return Lib_Primavera.PriIntegrationContacto.GetContactoById(id);
        }

        // GET api/contactos/5
        [HttpGet]
        [Route("api/contactos/vendor/{id}")]
        public IEnumerable<Lib_Primavera.Model.Contacto> GetContactoByVendorId(string id)
        {
            return Lib_Primavera.PriIntegrationContacto.GetContactoByVendorId(id);
        }

        // GET api/contactos/5
        [HttpPost]
        [Route("api/contactos/search")]
        public IEnumerable<Lib_Primavera.Model.Contacto> Search(Lib_Primavera.Model.SearchAndVendorDTO search)
        {
            return Lib_Primavera.PriIntegrationContacto.SearchContacto(search);
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
                //string uri = Url.Link("DefaultApi", new { Id = contacto.Id });
                //response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }


        [HttpPost]
        [Route("api/contactos/{id}")]
        public HttpResponseMessage Put(string id, Lib_Primavera.Model.Contacto contacto)
        {

            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();

            try
            {
                erro = Lib_Primavera.PriIntegrationContacto.UpdContacto(contacto);
                if (erro.Erro == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, erro.Descricao);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, erro.Descricao);
                }
            }

            catch (Exception exc)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, erro.Descricao);
            }
        }

    }
}

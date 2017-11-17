using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FirstREST.Lib_Primavera.Model;

namespace FirstREST.Controllers
{
    public class ClientesController : ApiController
    {
        // GET: /Clientes/
        [HttpGet]
        [Route("api/clientes")]
        public IEnumerable<Lib_Primavera.Model.Cliente> Get()
        {
                return Lib_Primavera.PriIntegrationCliente.ListaClientes();
        }


        // GET api/cliente/5
        [HttpGet]
        [Route("api/clientes/{id}")]
        public IEnumerable<Lib_Primavera.Model.Cliente> GetCliente(string id)
        {
           return Lib_Primavera.PriIntegrationCliente.GetCliente(id);
        }

        // GET api/cliente/5
        [HttpGet]
        [Route("api/clientes/search/{search}")]
        public IEnumerable<Lib_Primavera.Model.Cliente> Search(string search)
        {
            return Lib_Primavera.PriIntegrationCliente.SearchCliente(search);
        }

        [HttpPost]
        [Route("api/clientes")]
        public HttpResponseMessage Post(Lib_Primavera.Model.Cliente cliente)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationCliente.InsereClienteObj(cliente);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(
                   HttpStatusCode.Created, cliente);
                string uri = Url.Link("DefaultApi", new { CodCliente = cliente.CodCliente });
               // response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

        [HttpPost]
        [Route("api/clientes/{id}")]
        public HttpResponseMessage Put(string id, Lib_Primavera.Model.Cliente cliente)
        {

            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();

            try
            {
                erro = Lib_Primavera.PriIntegrationCliente.UpdCliente(cliente);
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



        public HttpResponseMessage Delete(string id)
        {


            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();

            try
            {

                erro = Lib_Primavera.PriIntegrationCliente.DelCliente(id);

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

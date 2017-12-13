using FirstREST.Lib_Primavera.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstREST.Controllers
{
    public class OportunidadesController : ApiController
    {
        // GET: api/opportunities/
        [HttpGet]
        [Route("api/oportunidades")]
        public IEnumerable<Lib_Primavera.Model.Oportunidade> Get()
        {
            return Lib_Primavera.PriIntegrationOportunidade.ListaOpportunidades();
        }

        // GET: api/opportunities/vendedor/1
        [HttpGet]
        [Route("api/oportunidades/vendedor/{id}")]
        public IEnumerable<Lib_Primavera.Model.Oportunidade> GetVendedor(string id)
        {
            return Lib_Primavera.PriIntegrationOportunidade.ListaOportunidadesVendedor(id);
        }

        // GET api/opportunities/id    
        [HttpGet]
        [Route("api/oportunidades/{id}")]
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

        //POST api/oportunidades
        [HttpPost]
        [Route("api/oportunidades")]
        public HttpResponseMessage Post(Lib_Primavera.Model.Oportunidade oportunidade)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationOportunidade.CreateOportunidade(oportunidade);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, oportunidade);
                string uri = Url.Link("DefaultApi", new { Id = oportunidade.ID });
                //response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

        //POST api/oportunidades
        [HttpPost]
        [Route("api/oportunidades/perder")]
        public HttpResponseMessage PostCancelar(Lib_Primavera.Model.Oportunidade oportunidade)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationOportunidade.PerderOportunidade(oportunidade);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, oportunidade);
                string uri = Url.Link("DefaultApi", new { Id = oportunidade.ID });
                //response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

        //POST api/oportunidades/proposta
        [HttpPost]
        [Route("api/oportunidades/proposta")]
        public HttpResponseMessage PostProposal(Lib_Primavera.Model.Oportunidade oportunidade)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationOportunidade.CreateProposta(oportunidade);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, oportunidade);
                string uri = Url.Link("DefaultApi", new { Id = oportunidade.ID });
                //response.Headers.Location = new Uri(uri);
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        //PUT api/oportunidades/
        [HttpPost]
        [Route("api/oportunidades/{id}")]
        public HttpResponseMessage Put(string id, [FromBody] Lib_Primavera.Model.Proposta proposta)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            try
            {
                erro = Lib_Primavera.PriIntegrationOportunidade.UpdOportunidade(id,proposta);
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

        //POST api/oportunidades/adicionaproduto
        [HttpPost]
        [Route("api/oportunidades/adicionaproduto")]
        public HttpResponseMessage PostAdiciona(Lib_Primavera.Model.OportunidadeDTO dto)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationOportunidade.AdicionaProduto(dto);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, dto);
                string uri = Url.Link("DefaultApi", new { Id = dto.IdOportunidade });
                //response.Headers.Location = new Uri(uri);
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/oportunidades/removeproduto   
        [HttpPost]
        [Route("api/oportunidades/removeproduto/")]
        public HttpResponseMessage PostRemove(Lib_Primavera.Model.OportunidadeDTO dto)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationOportunidade.RemoveProduto(dto);

            if (erro.Erro == 0)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, dto);
                string uri = Url.Link("DefaultApi", new { Id = dto.IdOportunidade });
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace FirstREST.Controllers
{
    public class DocVendaController : ApiController
    {
        //
        // GET: /Clientes/
        [Route("api/docvendas")]
        public IEnumerable<Lib_Primavera.Model.DocVenda> Get()
        {
            return Lib_Primavera.PriIntegrationDocVenda.Encomendas_List();
        }

        //
        // GET: /docvendas/pordata
        [Route("api/docvendas/pordata")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.VendasDTO> GetPorData()
        {
            return Lib_Primavera.PriIntegrationDocVenda.EncomendasPorData();
        }

        // GET: api/docvendas/top5produtos/
        [Route("api/docvendas/top5produtos/")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.LinhaDocVenda> GetTop5Produtos()
        {
            return Lib_Primavera.PriIntegrationDocVenda.Top5ProdutosMaisVendidos();
        }

        // GET: api/docvendas/top5produtos/vendedor/
        [Route("api/docvendas/top5produtos/{vendedor}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.LinhaDocVenda> GetTop5Produtos(int vendedor)
        {
            return Lib_Primavera.PriIntegrationDocVenda.Top5ProdutosMaisVendidosPorVendedor(vendedor);
        }

        // GET: api/docvendas/produtoscategoria/
        [Route("api/docvendas/produtoscategoria/")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.LinhaDocVenda> GetQuantidadeProdutosPorCategoria()
        {
            return Lib_Primavera.PriIntegrationDocVenda.QuantidadeProdutosVendidosPorCategoria();
        }

        // GET: api/docvendas/produtoscategoria/{vendedor}
        [Route("api/docvendas/produtoscategoria/{vendedor}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.LinhaDocVenda> GetQuantidadeProdutosPorCategoria(int vendedor)
        {
            return Lib_Primavera.PriIntegrationDocVenda.QuantidadeProdutosVendidosPorCategoria_Vendedor(vendedor);
        }

        // GET: api/docvendas/produtosvendidos_ano/
        [Route("api/docvendas/produtosvendidos_ano/")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.VendaAno> GetNumeroProdutosVendidos_CadaAno()
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_ProdutosVendidos_CadaAno();
        }

        // GET: api/docvendas/produtosvendidos_ano/vendedor
        [Route("api/docvendas/produtosvendidos_ano/{vendedor}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.VendaAno> GetNumeroProdutosVendidosPorVendedor_CadaAno(int vendedor)
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_ProdutosVendidosPorVendedor_CadaAno(vendedor);
        }

        // GET: api/docvendas/produtosvendidos/ano/
        [Route("api/docvendas/produtosvendidos/{ano}/")]
        [HttpGet]
        public double GetNumeroProdutosVendidosPorAno(int ano)
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_ProdutosVendidosPorAno(ano);
        }

        // GET: api/docvendas/produtosvendidos/ano/vendedor
        [Route("api/docvendas/produtosvendidos/{ano}/{vendedor}")]
        [HttpGet]
        public double GetNumeroProdutosVendidosPorVendedor_Ano(int ano, int vendedor)
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_ProdutosVendidosPorVendedor_Ano(ano, vendedor);
        }

        // GET: api/docvendas/dinheirofaturado_ano/
        [Route("api/docvendas/dinheirofaturado_ano/")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.VendaAno> GetNumeroDinheiroFaturoEmProdutos_CadaAno()
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_DinheiroFaturadoEmProdutos_CadaAno();
        }

        // GET: api/docvendas/dinheirofaturado_ano/vendedor
        [Route("api/docvendas/dinheirofaturado_ano/{vendedor}")]
        [HttpGet]
        public IEnumerable<Lib_Primavera.Model.VendaAno> GetNumeroDinheiroFaturoEmProdutosPorVendedor_CadaAno(int vendedor)
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_DinheiroFaturadoEmProdutosPorVendedor_CadaAno(vendedor);
        }

        // GET: api/docvendas/dinheirofaturado/ano/
        [Route("api/docvendas/dinheirofaturado/{ano}/")]
        [HttpGet]
        public double GetNumeroDinheiroFaturoEmProdutosPorAno(int ano)
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_DinheiroFaturadoEmProdutosPorAno(ano);
        }

        // GET: api/docvendas/dinheirofaturado/ano/vendedor
        [Route("api/docvendas/dinheirofaturado/{ano}/{vendedor}")]
        [HttpGet]
        public double GetNumeroDinheiroFaturoEmProdutosPorVendedor_Ano(int ano, int vendedor)
        {
            return Lib_Primavera.PriIntegrationDocVenda.Numero_DinheiroFaturadoEmProdutosPorVendedor_Ano(ano, vendedor);
        }


        // GET api/cliente/5    
        public Lib_Primavera.Model.DocVenda Get(string id)
        {
            Lib_Primavera.Model.DocVenda docvenda = Lib_Primavera.PriIntegrationDocVenda.Encomenda_Get(id);
            if (docvenda == null)
            {
                throw new HttpResponseException(
                        Request.CreateResponse(HttpStatusCode.NotFound));

            }
            else
            {
                return docvenda;
            }
        }

        // POST api/docvenda/ 
        [Route("api/docvendas")]
        //[HttpPost]
        public HttpResponseMessage Post(Lib_Primavera.Model.DocVenda dv)
        {
            Lib_Primavera.Model.RespostaErro erro = new Lib_Primavera.Model.RespostaErro();
            erro = Lib_Primavera.PriIntegrationDocVenda.Encomendas_New(dv);

            if (erro.Erro == 0)
            {
                var id = Guid.NewGuid().ToString();
                var response = Request.CreateResponse(HttpStatusCode.Created, id);
                string uri = Url.Link("DefaultApi", new {DocId = id });
                //response.Headers.Location = new Uri(uri);
                return response;
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }


        public HttpResponseMessage Put(int id, Lib_Primavera.Model.Cliente cliente)
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

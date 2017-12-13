using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Data;

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


        // GET: /Vendedores/team/chefe/1
        [HttpGet]
        [Route("api/vendedores/team/chefe/{id}")]
        public IEnumerable<Lib_Primavera.Model.Vendedor> GetTeamByChiefId(string id)
        {
            return Lib_Primavera.PriIntegrationVendedor.ListaEquipaDeChefe(id);
        }

        // GET: /Vendedores/team/vendedor/vendedores/1
        [HttpGet]
        [Route("api/vendedores/team/vendedor/vendedores/{id}")]
        public IEnumerable<Lib_Primavera.Model.Vendedor> GetTeamByVendorId(string id)
        {
            return Lib_Primavera.PriIntegrationVendedor.ListaEquipaDeVendedor(id);
        }

        // GET: /Vendedores/team/vendedor/chefe/1
        [HttpGet]
        [Route("api/vendedores/team/vendedor/chefe/{id}")]
        public IEnumerable<Lib_Primavera.Model.Vendedor> GetChiefByVendorId(string id)
        {
            return Lib_Primavera.PriIntegrationVendedor.ListaChefeDeVendedor(id);
        }


        // GET: /authentication/
        [HttpGet]
        [Route("api/authentication")]
        public IEnumerable<Lib_Primavera.Model.Vendedor> GetTemp()
        {
            SqlConnection conn = new SqlConnection();
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            conn.ConnectionString = "Data Source=User-PC\\PRIMAVERA;" +
                "Initial Catalog=PrimaveraExtension;" +
                "User id=sa;" +
                "Password=Feup2014;";
            cmd.CommandText = "Select * from Authentication";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conn;
            try
            {
                conn.Open();
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    var username = reader.GetValue(0);
                }
                conn.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return Lib_Primavera.PriIntegrationVendedor.ListaVendedores();
        }

    }
}
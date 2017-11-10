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
        //
        // GET: /Artigos/

        public IEnumerable<Lib_Primavera.Model.Contacto> Get()
        {
            return Lib_Primavera.PriIntegrationContacto.ListaContactos();
        }
    }
}

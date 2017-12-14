using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Vendedor
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Morada { get; set; }
        public string Localidade { get; set; }
        public string CodPostal { get; set; }
        public string Telefone { get; set; }
        public string Telemovel { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Chefe { get; set; }
    }
}
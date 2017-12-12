using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Contacto
    {
        public string Entidade { get; set; }
        public string Nome { get; set; }
        public string Vendedor { get; set; }       //FK Vendedor
        public string Morada { get; set; }
        public string CodPostal { get; set; }
        public string Localidade {get; set;}
        public string Pais { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Telemovel { get; set; }
        public string Telefone { get; set; }
                 
    }   
}       
        
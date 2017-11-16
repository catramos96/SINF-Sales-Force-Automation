using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    //CabecOportunidadesVenda
    public class Lead
    {
        public string ID { get; set; }
        public string Oportunidade { get; set; }    //Descritivo - LEAD

        public string Descricao { get; set; }       //titulo
        public string Resumo { get; set; }
        public System.DateTime DataCriacao { get; set; }

        //id do cliente = Entidade
        public string IdCliente { get; set; }
        public string NomeCliente { get; set; }
        public string ContactoCliente { get; set; }
        public string Vendedor { get; set; }           //id do vendedor
    }
}
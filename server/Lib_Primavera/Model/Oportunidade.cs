using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Oportunidade
    {
        /*
         * Estado: 0 - Aberta, 1 - Ganha, 2 - Perdida
         */

        //CabecOportunidadesVenda
        public string ID { get; set; }
        public string NomeOport { get; set; }

        public string Descricao { get; set; }
        public string Resumo { get; set; }
        public DateTime DataCriacao { get; set; }

        public string CodCliente { get; set; }  //entidade
        public string NomeCliente { get; set; }
        public string ContactoCliente { get; set; }
        public double DescontoCliente { get; set; }

        public string Vendedor { get; set; }

        public short EstadoVenda { get; set; }

        public List<Proposta> propostas;
    }
}
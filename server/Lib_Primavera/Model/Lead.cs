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
        public string Descricao { get; set; }
        public string Entidade { get; set; }    //id do cliente
        public string Vendedor { get; set; }    //id do vendedor
        public string DataCriacao { get; set; }
        public double ValorTotalOV { get; set; }    //inicialmente 0 -> atualiza com os produtos adicionados
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class VendasDTO
    {
        public DateTime Data { get; set; }
        public List<DocVenda> Vendas { get; set; }
    }
}
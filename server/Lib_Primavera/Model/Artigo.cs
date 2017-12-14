using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Artigo
    {
        public string ID { get; set; }
        public string Nome { get; set; }        //descricao
        public string Marca { get; set; }
        public string Observacoes { get; set; }

        public string FamiliaNome { get; set; }
        public string SubFamiliaNome { get; set; }

        public short PrazoEntrega { get; set; }

        public string UnidadeVenda { get; set; }
        public double StockAtual { get; set; }
        public double QuantidadeReservada { get; set; }

        public double IVA { get; set; }
        public double PVP1 { get; set; }
        public double Desconto { get; set; }
        public double PrecoFinal { get; set; }

    }

    
}
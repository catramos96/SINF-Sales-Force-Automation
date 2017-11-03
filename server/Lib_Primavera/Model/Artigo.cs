using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Artigo
    {
        public string ID { get; set; }
        public string Descricao { get; set; }
        public string UnidadeVenda { get; set; }
        public string IVA { get; set; }
        public double StockAtual { get; set; }
        public double PrecoMedio { get; set; }
        public string FamiliaNome { get; set; }
        public string SubFamiliaNome { get; set; }
        public short PrazoEntrega { get; set; }
        public double Peso { get; set; }
        public string Marca { get; set; }
        public string Observacoes { get; set; }
        public float QuantidadeReservada { get; set; }
    }

    
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    //LinhasPropostasOPV
    public class OpportunityLine
    {
        //public string ID { get; set; }              //idOportunidade = Lead.ID
        //public int NumProposta { get; set; }        //proposta       
        public int Linha { get; set; }              //numero do artigo na lista

        public string IdArtigo { get; set; }        //Artigo
        public string NomeArtigo { get; set; }      //Descricao
        public double Quantidade { get; set; }
        public string Unidade { get; set; }
        public double PrecoVenda { get; set; }

        //TODO adicionar PrecoCusto ?
    }
}
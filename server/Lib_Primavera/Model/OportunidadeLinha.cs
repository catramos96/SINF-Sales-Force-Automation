using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    //LinhasPropostasOPV
    public class OportunidadeLinha
    {
        //public string ID { get; set; }              //idOportunidade = Lead.ID
        //public int NumProposta { get; set; }        //proposta       
        public short Linha { get; set; }              //numero do artigo na lista

        public string IdArtigo { get; set; }        //Artigo
        public string NomeArtigo { get; set; }      //Descricao
        public double Quantidade { get; set; }
        public string Unidade { get; set; }
        public double PrecoVenda { get; set; }
        public double Custo { get; set; }
        public double Desconto { get; set; }
        public double PrecoFinal { get; set; }
        public double Rentabilidade { get; set; }
        public double Margem { get; set; }
    }
}
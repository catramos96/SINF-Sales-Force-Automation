using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    //LinhasPropostasOPV
    public class OpportunityLine
    {
        public string IdOportunidade { get; set; }
        public string IdArtigo { get; set; }        //Artigo
        public string NomeArtigo { get; set; }      //Descricao
        public int Quantidade { get; set; }
        public int PrecoVenda { get; set; }
        public int NumProposta { get; set; }        //1 - default
    }
}
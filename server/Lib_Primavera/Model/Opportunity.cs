using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    //PropostasOPV
    public class Opportunity
    {
        public string IdOportunidade { get; set; }
        public string IdCabecOrigem { get; set; }   //id da lead associada
        public int NumProposta { get; set; }    //o cliente pode recusar a primeira e ter que fazer uma nova proposta (inicialmente vamos ignorar isto)
        public List<OpportunityLine> Artigos { get; set; }
    }
}
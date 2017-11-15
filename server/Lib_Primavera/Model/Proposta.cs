using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    //PropostasOPV
    public class Proposta
    {
        //public string ID { get; set; }   //idOportunidade = Lead.ID
        public int NumProposta { get; set; }    //o cliente pode recusar a primeira e ter que fazer uma nova proposta (inicialmente vamos ignorar isto)
        //TODO adicionar Custo , Valor, Valor de Desconto, Rentabilidade, Margem
        public List<OpportunityLine> Artigos { get; set; }
    }
}
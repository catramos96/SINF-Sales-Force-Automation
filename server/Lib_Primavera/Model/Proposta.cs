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
        public double Valor { get; set; }       //soma dos precos da proposta
        //TODO adicionar Custo , Valor de Desconto, Rentabilidade, Margem
        public List<OportunidadeLinha> Artigos { get; set; }
    }
}
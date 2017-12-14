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
        public short NumProposta { get; set; }    //o cliente pode recusar a primeira e ter que fazer uma nova proposta (inicialmente vamos ignorar isto)
        public double Valor { get; set; }       //soma dos precos da proposta
        public double Rentabilidade { get; set; }
        public double Margem { get; set; }
        public double Desconto { get; set; }

        public List<OportunidadeLinha> Artigos { get; set; }
    }
}
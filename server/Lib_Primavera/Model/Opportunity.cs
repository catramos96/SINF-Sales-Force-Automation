using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Opportunity
    {
        /*
         * Estado: 0 - Aberta, 1 - Ganha, 2 - Perdida
         */

        //CabecOportunidadesVenda
        public Lead Lead { get; set; }      //lead cujo id = idOportunidade --> oportunidade = OPP
        public short EstadoVenda { get; set; }
        public double ValorTotalOV { get; set; }    //inicialmente 0 -> atualiza com os produtos adicionados
        //TODO adicionar Rentabilidade ( MargemOV ) e Margem ( MargemPecOV )

        public List<Proposta> propostas;
    }
}
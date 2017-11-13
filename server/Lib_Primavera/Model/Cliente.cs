using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Cliente
    {
        public string CodCliente { get; set; }          // PK
        public string Vendedor { get; set; }            // FK
        public string Grupo { get; set; }              // FK para GruposEmpresas
        public string GrupoDesc { get; set; }
        public string Nome { get; set; }
        public string Morada { get; set; }
        public string Localidade { get; set; }
        public string CodPostal { get; set; }
        public string Pais { get; set; }
        public string Email { get; set; }
        public string Telemovel { get; set; }
        public string Telefone { get; set; }
        public string Fax { get; set; }
        public double TotalDeb { get; set; }
        public string NumContribuinte { get; set; }
        public string EnderecoWeb { get; set; }
        public DateTime DataCriacao { get; set; }
        public double EncomendasPendentes { get; set; }
        public string Notas { get; set; }
        public string Situacao { get; set; }            //Activo/Inactivo
        public bool Inactivo { get; set; }
        public string Moeda { get; set; }
    }
}
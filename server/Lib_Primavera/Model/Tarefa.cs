using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Tarefa
    {
        public string ID { get; set; }
        public string TipoDeTarefa { get; set; }
        public string Prioridade { get; set; }
        //public int Estado {get;set;}
        public string Resumo { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public string Localizacao { get; set; }
        public string IDUtilizador { get; set; }
        public int Duracao { get; set; }
        public string IDTarefaOrigem { get; set; }
        public string IDContacto { get; set; }
    }
}
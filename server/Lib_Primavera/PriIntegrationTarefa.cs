using Interop.CrmBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationTarefa
    {

        public static Lib_Primavera.Model.Tarefa GetTarefa(string codTarefa)
        {
            StdBELista objList = new StdBELista();
            Model.Tarefa act = new Model.Tarefa();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(
                    "SELECT Tarefas.Id AS ID, TiposTarefa.Descricao AS Tipo, Prioridade, Resumo, Tarefas.Descricao,IdContactoPrincipal, DataInicio, Duracao,DataFim, LocalRealizacao, Utilizador,IDActividadeOrigem FROM Tarefas JOIN TiposTarefa ON Tarefas.IdTipoActividade = TiposTarefa.Id WHERE Tarefas.Id = '" + codTarefa + "'");


                if (PriEngine.Engine.CRM.Actividades.Existe(codTarefa) == false)
                {
                    return null;
                }
                else
                {
                    act = new Model.Tarefa();
                    act.ID = objList.Valor("ID");
                    act.DataInicio = objList.Valor("DataInicio");
                    act.DataFim = objList.Valor("DataFim");
                    act.Resumo = objList.Valor("Resumo");
                    act.Descrição = objList.Valor("Descricao");
                    act.TipoDeTarefa = objList.Valor("Tipo");
                    act.Prioridade = objList.Valor("Prioridade").ToString();
                    act.IDUtilizador = objList.Valor("Utilizador");
                    act.IDTarefaOrigem = objList.Valor("IDActividadeOrigem");
                    act.Localização = objList.Valor("LocalRealizacao");
                    act.Duracao = objList.Valor("Duracao");
                    act.IDContacto = objList.Valor("IdContactoPrincipal");

                    return act;
                }
            }
            else
            {
                return null;
            }
        }

        public static List<Model.Tarefa> ListaTarefas()
        {
            StdBELista objList;

            Model.Tarefa act = new Model.Tarefa();
            List<Model.Tarefa> listActs = new List<Model.Tarefa>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(
                    "SELECT Tarefas.Id AS ID, TiposTarefa.Descricao AS Tipo, Prioridade, Resumo, Tarefas.Descricao,IdContactoPrincipal, DataInicio, Duracao,DataFim, LocalRealizacao, Utilizador,IDActividadeOrigem FROM Tarefas JOIN TiposTarefa ON Tarefas.IdTipoActividade = TiposTarefa.Id");

                while (!objList.NoFim())
                {
                    act = new Model.Tarefa();
                    act.ID = objList.Valor("ID");
                    act.DataInicio = objList.Valor("DataInicio");
                    act.DataFim = objList.Valor("DataFim");
                    act.Resumo = objList.Valor("Resumo");
                    act.Descrição = objList.Valor("Descricao");
                    act.TipoDeTarefa = objList.Valor("Tipo");
                    act.Prioridade = objList.Valor("Prioridade").ToString();
                    act.IDUtilizador = objList.Valor("Utilizador");
                    act.IDTarefaOrigem = objList.Valor("IDActividadeOrigem");
                    act.Localização = objList.Valor("LocalRealizacao");
                    act.Duracao = objList.Valor("Duracao");
                    act.IDContacto = objList.Valor("IdContactoPrincipal");

                    listActs.Add(act);
                    objList.Seguinte();
                }

                return listActs;

            }
            else
            {
                return null;
            }
        }

        public static List<Model.Tarefa> GetRangeTarefas(string dataInicio,string dataFim)
        {
            StdBELista objList;

            Model.Tarefa act = new Model.Tarefa();
            List<Model.Tarefa> listActs = new List<Model.Tarefa>();


            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(
                    "SELECT Tarefas.Id AS ID, TiposTarefa.Descricao AS Tipo, Prioridade, Resumo, Tarefas.Descricao,IdContactoPrincipal, DataInicio, Duracao,DataFim, LocalRealizacao, Utilizador,IDActividadeOrigem FROM Tarefas JOIN TiposTarefa ON Tarefas.IdTipoActividade = TiposTarefa.Id WHERE DataInicio >= CAST('" + dataInicio + "' AS datetime) AND DataFim <= CAST('" + dataFim + "' AS datetime);");

                while (!objList.NoFim())
                {
                    act = new Model.Tarefa();
                    act.ID = objList.Valor("ID");
                    act.DataInicio = objList.Valor("DataInicio");
                    act.DataFim = objList.Valor("DataFim");
                    act.Resumo = objList.Valor("Resumo");
                    act.Descrição = objList.Valor("Descricao");
                    act.TipoDeTarefa = objList.Valor("Tipo");
                    act.Prioridade = objList.Valor("Prioridade").ToString();
                    act.IDUtilizador = objList.Valor("Utilizador");
                    act.IDTarefaOrigem = objList.Valor("IDActividadeOrigem");
                    act.Localização = objList.Valor("LocalRealizacao");
                    act.Duracao = objList.Valor("Duracao");
                    act.IDContacto = objList.Valor("IdContactoPrincipal");

                    listActs.Add(act);
                    objList.Seguinte();
                }

                return listActs;

            }
            else
            {
                return null;
            }
        }
   
    }
}
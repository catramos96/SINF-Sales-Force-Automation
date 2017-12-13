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
                    "SELECT Tarefas.Id AS ID, TiposTarefa.Id AS idTipo, TiposTarefa.Descricao As Tipo, Prioridade, Resumo, Tarefas.Descricao,IdContactoPrincipal, DataInicio, Duracao,DataFim, LocalRealizacao, Utilizador,IDActividadeOrigem FROM Tarefas JOIN TiposTarefa ON Tarefas.IdTipoActividade = TiposTarefa.Id WHERE Tarefas.Id = '" + codTarefa + "'");


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
                    act.Descricao = objList.Valor("Descricao");
                    act.IdTipo = objList.Valor("idTipo");
                    act.TipoDeTarefa = objList.Valor("Tipo");
                    act.Prioridade = objList.Valor("Prioridade").ToString();
                    act.IDUtilizador = objList.Valor("Utilizador");
                    act.IDTarefaOrigem = objList.Valor("IDActividadeOrigem");
                    act.Localizacao = objList.Valor("LocalRealizacao");
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
                    "SELECT Tarefas.Id AS ID, IdTipoActividade, Prioridade, Resumo, Tarefas.Descricao,IdContactoPrincipal, DataInicio, Duracao,DataFim, LocalRealizacao, Utilizador,IDActividadeOrigem FROM Tarefas");

                while (!objList.NoFim())
                {
                    act = new Model.Tarefa();
                    act.ID = objList.Valor("ID");
                    act.DataInicio = objList.Valor("DataInicio");
                    act.DataFim = objList.Valor("DataFim");
                    act.Resumo = objList.Valor("Resumo");
                    act.Descricao = objList.Valor("Descricao");
                    act.TipoDeTarefa = objList.Valor("idTipoActividade");
                    act.Prioridade = objList.Valor("Prioridade").ToString();
                    act.IDUtilizador = objList.Valor("Utilizador");
                    act.IDTarefaOrigem = objList.Valor("IDActividadeOrigem");
                    act.Localizacao = objList.Valor("LocalRealizacao");
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
                    "SELECT Tarefas.Id AS ID, IDTiposTarefa, Prioridade, Resumo, Tarefas.Descricao,IdContactoPrincipal, DataInicio, Duracao,DataFim, LocalRealizacao, Utilizador,IDActividadeOrigem FROM Tarefas WHERE DataInicio >= CAST('" + dataInicio + "' AS datetime) AND DataFim <= CAST('" + dataFim + "' AS datetime);");

                while (!objList.NoFim())
                {
                    act = new Model.Tarefa();
                    act.ID = objList.Valor("ID");
                    act.DataInicio = objList.Valor("DataInicio");
                    act.DataFim = objList.Valor("DataFim");
                    act.Resumo = objList.Valor("Resumo");
                    act.Descricao = objList.Valor("Descricao");
                    act.TipoDeTarefa = objList.Valor("IDTiposTarefa");
                    act.Prioridade = objList.Valor("Prioridade").ToString();
                    act.IDUtilizador = objList.Valor("Utilizador");
                    act.IDTarefaOrigem = objList.Valor("IDActividadeOrigem");
                    act.Localizacao = objList.Valor("LocalRealizacao");
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

        public static Lib_Primavera.Model.RespostaErro DelTarefa(string codTarefa)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEActividade act = new CrmBEActividade();


            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    if (PriEngine.Engine.CRM.Actividades.Existe(codTarefa) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "A actividade não existe";
                        return erro;
                    }
                    else
                    {

                        PriEngine.Engine.CRM.Actividades.Remove(codTarefa);
                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }

                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }

        public static Lib_Primavera.Model.RespostaErro InsereTarefaObj(Model.Tarefa tarefa)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            CrmBEActividade myT = new CrmBEActividade();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    myT.set_DataInicio(tarefa.DataInicio);
                    myT.set_DataFim(tarefa.DataFim);
                    myT.set_Resumo(tarefa.Resumo);
                    myT.set_Descricao(tarefa.Descricao);
                    myT.set_IDTipoActividade(tarefa.IdTipo);
                    myT.set_Prioridade(tarefa.Prioridade);
                    myT.set_Utilizador(tarefa.IDUtilizador);
                    myT.set_IDActividadeOrigem(tarefa.IDTarefaOrigem);
                    myT.set_LocalRealizacao(tarefa.Localizacao);
                    myT.set_Duracao(tarefa.Duracao);
                    myT.set_IDContactoPrincipal(tarefa.IDContacto);
                    myT.set_TipoEntidadePrincipal(null);

                    PriEngine.Engine.CRM.Actividades.Actualiza(myT);

                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }


        }

        public static Lib_Primavera.Model.RespostaErro UpdTarefa(Lib_Primavera.Model.Tarefa tarefa)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            CrmBEActividade myT = new CrmBEActividade();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.CRM.Actividades.Existe(tarefa.ID) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "A tarefa não existe";
                        return erro;
                    }
                    else
                    {

                        myT = PriEngine.Engine.CRM.Actividades.Edita(tarefa.ID);
                        myT.set_EmModoEdicao(true);

                        myT.set_DataInicio(tarefa.DataInicio);
                        myT.set_DataFim(tarefa.DataFim);
                        myT.set_Resumo(tarefa.Resumo);
                        myT.set_Descricao(tarefa.Descricao);
                        myT.set_IDTipoActividade(tarefa.IdTipo);
                        myT.set_Prioridade(tarefa.Prioridade);
                        myT.set_Utilizador(tarefa.IDUtilizador);
                        myT.set_IDActividadeOrigem(tarefa.IDTarefaOrigem);
                        myT.set_LocalRealizacao(tarefa.Localizacao);
                        myT.set_Duracao(tarefa.Duracao);
                        myT.set_IDContactoPrincipal(tarefa.IDContacto);
                        myT.set_TipoEntidadePrincipal(null);

                        PriEngine.Engine.CRM.Actividades.Actualiza(myT);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;

                }

            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }

       
    }
}
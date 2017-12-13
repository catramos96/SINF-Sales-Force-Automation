using Interop.CrmBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationTipoTarefa
    {

        public static Lib_Primavera.Model.TipoTarefa GetTipoTarefa(string cod)
        {
            StdBELista objList = new StdBELista();
            Model.TipoTarefa act = new Model.TipoTarefa();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(
                    "SELECT TiposTarefa.ID AS ID, TiposTarefa.Descricao AS Descricao FROM TiposTarefa WHERE ID ='" + cod + "'");


                if (objList.NumLinhas().Equals(0))
                {
                    return null;
                }
                else
                {
                    act = new Model.TipoTarefa();
                    act.ID = objList.Valor("ID");
                    act.Descricao = objList.Valor("Descricao");

                    return act;
                }
            }
            else
            {
                return null;
            }
        }

        public static List<Model.TipoTarefa> ListaTipoTarefa()
        {
            StdBELista objList;

            Model.TipoTarefa act = new Model.TipoTarefa();
            List<Model.TipoTarefa> listActs = new List<Model.TipoTarefa>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(
                    "SELECT * FROM TiposTarefa");

                while (!objList.NoFim())
                {
                    act = new Model.TipoTarefa();
                    act.ID = objList.Valor("ID");
                    act.Descricao = objList.Valor("Descricao");

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
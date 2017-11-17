using System;
using Interop.StdBE900;
using System.Web;
using System.Collections.Generic;
using System.Linq;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationRota
    {
        public static Lib_Primavera.Model.Rota GetRota(string codrota)
        {
            StdBELista objList = new StdBELista();
            Model.Rota rota = new Model.Rota();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(
                    "SELECT * FROM STP_Rotas STP_Rotas.id = '" + codrota + "'");


                if (PriEngine.Engine.CRM.Actividades.Existe(codrota) == false)
                {
                    return null;
                }
                else
                {
                    rota = new Model.Rota();
                    rota.ID = objList.Valor("ID");
                    rota.Rot = objList.Valor("Rota");
                    rota.Descricao = objList.Valor("Descricao");
                    rota.ZonaID = objList.Valor("Zona");


                    return rota;
                }
            }
            else
            {
                return null;
            }
        }

        public static List<Model.Rota> ListaRotas()
        {
            StdBELista objList;

            Model.Rota rota = new Model.Rota();
            List<Model.Rota> listRotas = new List<Model.Rota>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(
                    "SELECT * FROM STP_Rotas");

                while (!objList.NoFim())
                {
                    rota = new Model.Rota();
                    rota.ID = objList.Valor("ID");
                    rota.Rot = objList.Valor("Rota");
                    rota.Descricao = objList.Valor("Descricao");
                    rota.ZonaID = objList.Valor("Zona");



                    listRotas.Add(rota);
                    objList.Seguinte();
                }

                return listRotas;

            }
            else
            {
                return null;
            }
        }
    }
}

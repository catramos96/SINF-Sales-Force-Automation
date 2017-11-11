using Interop.GcpBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationSubfamilia
    {
        public static List<Model.SubFamilia> ListaSubCategoriasPorCategoria(string categoria)
        {
            StdBELista objList;

            Model.SubFamilia art = new Model.SubFamilia();
            List<Model.SubFamilia> listArts = new List<Model.SubFamilia>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta(
                    "select Familia, SubFamilia, Descricao " +
                    "from SubFamilias " +
                    "where Familia = '" + categoria + "';");

                while (!objList.NoFim())
                {
                    art = new Model.SubFamilia();
                    art.ID = objList.Valor("SubFamilia");
                    art.IDFamilia = objList.Valor("Familia");
                    art.Nome = objList.Valor("Descricao");

                    listArts.Add(art);
                    objList.Seguinte();
                }

                return listArts;
            }
            else
            {
                return null;
            }
        }

    }
}
using System;
using Interop.GcpBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationFamilia
    {
        public static List<Model.Familia> ListaCategorias()
        {
            StdBELista objList;

            Model.Familia art = new Model.Familia();
            List<Model.Familia> listArts = new List<Model.Familia>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta("select Familia, Descricao from Familias");

                while (!objList.NoFim())
                {
                    art = new Model.Familia();
                    art.ID = objList.Valor("Familia");
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

        public static List<Model.Familia> SearchFamilia(string categoria)
        {
            StdBELista objList;

            Model.Familia art = new Model.Familia();
            List<Model.Familia> listArts = new List<Model.Familia>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta(
                    "select Familia, Descricao " +
                    "from Familias " +
                    "where lower(Familia) LIKE lower('%" + categoria + "%') OR lower(Descricao) LIKE lower('%" + categoria + "%');");

                while (!objList.NoFim())
                {
                    art = new Model.Familia();
                    art.ID = objList.Valor("Familia");
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
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationGrupo
    {
        public static IEnumerable<Model.Grupo> ListaEquipas()
        {
            StdBELista objList;

            List<Model.Grupo> listEquipas = new List<Model.Grupo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("select Grupo, Descricao from GruposEmpresas;");


                while (!objList.NoFim())
                {
                    listEquipas.Add(new Model.Grupo
                    {
                        Id = objList.Valor("Grupo"),
                        Descricao = objList.Valor("Descricao"),
                    });
                    objList.Seguinte();

                }
                return listEquipas;
            }
            else
                return null;
        }

         public static Lib_Primavera.Model.RespostaErro InsereGrupoObj(Model.Grupo grp)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            Interop.CblBE900.CblBEGrupoEmpresa myGrupo = new Interop.CblBE900.CblBEGrupoEmpresa();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    myGrupo.set_Grupo(grp.Id);
                    myGrupo.set_Descricao(grp.Descricao);

                    PriEngine.Engine.Contabilidade.GruposEmpresas.Actualiza(myGrupo);

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

    
    }
}
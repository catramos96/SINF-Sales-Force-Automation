using Interop.GcpBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationArtigo
    {

        public static Lib_Primavera.Model.Artigo GetArtigo(string codArtigo)
        {

            GcpBEArtigo objArtigo = new GcpBEArtigo();
            Model.Artigo myArt = new Model.Artigo();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                if (PriEngine.Engine.Comercial.Artigos.Existe(codArtigo) == false)
                {
                    return null;
                }
                else
                {
                    objArtigo = PriEngine.Engine.Comercial.Artigos.Edita(codArtigo);
                    //myArt.CodArtigo = objArtigo.get_Artigo();


                    return myArt;
                }

            }
            else
            {
                return null;
            }

        }

        public static List<Model.Artigo> ListaArtigos()
        {

            StdBELista objList;

            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("select Artigo.Artigo, Artigo.Descricao, UnidadeVenda, Iva, STKActual, PCMedio, Familias.Descricao , SubFamilias.Descricao AS DescricaoSubFamilia, PrazoEntrega, Peso, Marca, Observacoes, QtReservadaGPR  from Artigo Join Familias ON Familias.Familia = Artigo.Familia Join SubFamilias ON SubFamilias.SubFamilia = Artigo.SubFamilia;");

                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.ID = objList.Valor("Artigo");
                    art.Descricao = objList.Valor("Descricao");
                    art.UnidadeVenda = objList.Valor("UnidadeVenda");
                    art.IVA = objList.Valor("Iva");
                    art.StockAtual = objList.Valor("STKActual");
                    art.PrecoMedio = objList.Valor("PCMedio");
                    art.FamiliaNome = objList.Valor("Descricao");
                    art.SubFamiliaNome = objList.Valor("DescricaoSubFamilia");
                    art.PrazoEntrega = objList.Valor("PrazoEntrega");
                    art.Peso = objList.Valor("Peso");
                    art.Marca = objList.Valor("Marca");
                    art.Observacoes = objList.Valor("Observacoes");
                    art.QuantidadeReservada = objList.Valor("QtReservadaGPR");

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
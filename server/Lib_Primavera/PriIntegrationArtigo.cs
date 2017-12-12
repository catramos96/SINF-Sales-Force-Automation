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

                    myArt.ID = objArtigo.get_Artigo();
                    myArt.Nome = objArtigo.get_Descricao();
                    myArt.Marca = objArtigo.get_Marca();
                    myArt.Observacoes = objArtigo.get_Observacoes();

                    myArt.FamiliaNome = objArtigo.get_Familia();
                    myArt.SubFamiliaNome = objArtigo.get_SubFamilia();

                    myArt.PrazoEntrega = objArtigo.get_PrazoEntrega();

                    myArt.UnidadeVenda = objArtigo.get_UnidadeVenda();
                    myArt.StockAtual = objArtigo.get_StkActual();
                    myArt.QuantidadeReservada = objArtigo.get_QtReservada();

                    myArt.IVA = PriEngine.Engine.Comercial.Iva.Edita(objArtigo.get_IVA()).get_Taxa();
                    myArt.Desconto = objArtigo.get_Desconto();

                    var objArtigoPreco = PriEngine.Engine.Comercial.ArtigosPrecos.Edita(myArt.ID, "EUR", myArt.UnidadeVenda);
                    myArt.PVP1 = objArtigoPreco.get_PVP1();

                    myArt.PrecoFinal = myArt.PVP1 * (1 - myArt.Desconto/100);
                    if (!objArtigoPreco.get_PVP1IvaIncluido())
                        myArt.PrecoFinal *= (1 + myArt.IVA/100);

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

                objList = PriEngine.Engine.Consulta(
                    "select Artigo.Artigo, Artigo.Descricao, UnidadeVenda, Iva, Desconto, STKActual, Marca, Familias.Descricao AS DescricaoFamilia, SubFamilias.Descricao AS DescricaoSubFamilia, PrazoEntrega, Peso, Marca, Observacoes, QtReservadaGPR  " +
                    "from Artigo Join Familias ON Familias.Familia = Artigo.Familia Join SubFamilias ON SubFamilias.SubFamilia = Artigo.SubFamilia;");

                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.ID = objList.Valor("Artigo");
                    art.Nome = objList.Valor("Descricao");
                    art.Marca = objList.Valor("Marca");
                    art.Observacoes = objList.Valor("Observacoes");

                    art.FamiliaNome = objList.Valor("Descricao");
                    art.SubFamiliaNome = objList.Valor("DescricaoSubFamilia");

                    art.PrazoEntrega = objList.Valor("PrazoEntrega");

                    art.UnidadeVenda = objList.Valor("UnidadeVenda");
                    art.StockAtual = objList.Valor("STKActual");
                    art.QuantidadeReservada = objList.Valor("QtReservadaGPR");

                    art.Desconto = objList.Valor("Desconto");
                    art.IVA = PriEngine.Engine.Comercial.Iva.Edita(objList.Valor("Iva")).get_Taxa();

                    var objArtigoPreco = PriEngine.Engine.Comercial.ArtigosPrecos.Edita(art.ID, "EUR", art.UnidadeVenda);
                    art.PVP1 = objArtigoPreco.get_PVP1();

                    art.PrecoFinal = art.PVP1 * (1 - art.Desconto/100);
                    if (!objArtigoPreco.get_PVP1IvaIncluido())
                        art.PrecoFinal *= (1 + art.IVA/100);
                    
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

        public static List<Model.Artigo> SearchArtigo(string search)
        {
            StdBELista objList;
            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta(
                    "select Artigo.Artigo, Artigo.Descricao, Artigo.Familia, Familias.Descricao AS DescricaoFamilia, Artigo.SubFamilia, SubFamilias.Descricao AS DescricaoSubFamilia, STKActual, PCMedio " +
                    "from Artigo Join Familias ON Familias.Familia = Artigo.Familia Join SubFamilias ON SubFamilias.SubFamilia = Artigo.SubFamilia " +
                    "where lower(Artigo.Artigo) LIKE lower('%" + search + "%') OR lower(Artigo.Descricao) LIKE lower('%" + search + "%')");

                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.ID = objList.Valor("Artigo");
                    art.Nome = objList.Valor("Descricao");
                    art.StockAtual = objList.Valor("STKActual");
                    art.PVP1 = objList.Valor("PCMedio");
                    art.FamiliaNome = objList.Valor("DescricaoFamilia");
                    art.SubFamiliaNome = objList.Valor("DescricaoSubFamilia");

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

        public static List<Model.Artigo> ListaArtigosFamiliaSubFamilia(string familia, string subfamilia)
        {
            StdBELista objList;
            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta(
                    "select Artigo.Artigo, Artigo.Descricao, Artigo.Familia, Familias.Descricao AS DescricaoFamilia, Artigo.SubFamilia, SubFamilias.Descricao AS DescricaoSubFamilia, STKActual, PCMedio " +
                    "from Artigo Join Familias ON Familias.Familia = Artigo.Familia Join SubFamilias ON SubFamilias.SubFamilia = Artigo.SubFamilia " +
                    "where Artigo.Familia = '" + familia + "' AND Artigo.SubFamilia = '" + subfamilia + "';");

                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.ID = objList.Valor("Artigo");
                    art.Nome = objList.Valor("Descricao");
                    art.StockAtual = objList.Valor("STKActual");
                    art.PVP1 = objList.Valor("PCMedio");
                    art.FamiliaNome = objList.Valor("DescricaoFamilia");
                    art.SubFamiliaNome = objList.Valor("DescricaoSubFamilia");

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
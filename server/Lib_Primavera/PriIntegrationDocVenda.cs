using Interop.GcpBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationDocVenda
    {

        public static Model.RespostaErro Encomendas_New(Model.DocVenda dv)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            GcpBEDocumentoVenda myEnc = new GcpBEDocumentoVenda();

            GcpBELinhaDocumentoVenda myLin = new GcpBELinhaDocumentoVenda();

            GcpBELinhasDocumentoVenda myLinhas = new GcpBELinhasDocumentoVenda();

            PreencheRelacaoVendas rl = new PreencheRelacaoVendas();
            List<Model.LinhaDocVenda> lstlindv = new List<Model.LinhaDocVenda>();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    //A designação fiscal não se encontra atribuída
                    // Atribui valores ao cabecalho do doc
                    //myEnc.set_DataDoc(dv.Data);
                    myEnc.set_Entidade(dv.Entidade);
                    myEnc.set_Serie("A");
                    myEnc.set_Tipodoc("ECL");
                    myEnc.set_TipoEntidade("C");
                    // Linhas do documento para a lista de linhas
                    lstlindv = dv.LinhasDoc;
                    //PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc, rl);
                    PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc);
                    foreach (Model.LinhaDocVenda lin in lstlindv)
                    {
                        PriEngine.Engine.Comercial.Vendas.AdicionaLinha(myEnc, lin.CodArtigo, lin.Quantidade, "", "", lin.PrecoUnitario, lin.Desconto);
                    }


                    // PriEngine.Engine.Comercial.Compras.TransformaDocumento(

                    PriEngine.Engine.IniciaTransaccao();
                    //PriEngine.Engine.Comercial.Vendas.Edita Actualiza(myEnc, "Teste");
                    PriEngine.Engine.Comercial.Vendas.Actualiza(myEnc);
                    PriEngine.Engine.TerminaTransaccao();
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
                PriEngine.Engine.DesfazTransaccao();
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }
        }

        public static double Numero_ProdutosVendidosPorAno(int ano)
        {
            StdBELista objListLin;

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListLin = PriEngine.Engine.Consulta("SELECT sum(LinhasDoc.Quantidade) AS numeroProdutosVendidos FROM CabecDoc INNER JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc where CabecDoc.TipoDoc='ECL' AND YEAR(LinhasDoc.Data) =" + ano);

                while (!objListLin.NoFim())
                {
                    return objListLin.Valor("numeroProdutosVendidos");
                }
            }
            return -1;
        }

        public static double Numero_ProdutosVendidosPorVendedor_Ano(int ano, int vendedor)
        {
            StdBELista objListLin;

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListLin = PriEngine.Engine.Consulta("SELECT sum(LinhasDoc.Quantidade) AS numeroProdutosVendidos FROM CabecDoc INNER JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc where CabecDoc.TipoDoc='ECL' AND YEAR(LinhasDoc.Data) =" + ano + " AND LinhasDoc.Vendedor = "+vendedor);

                while (!objListLin.NoFim())
                {
                    return objListLin.Valor("numeroProdutosVendidos");
                }
            }
            return -1;
        }

        public static double Numero_DinheiroFaturadoEmProdutosPorAno(int ano)
        {
            StdBELista objListLin;

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListLin = PriEngine.Engine.Consulta("SELECT sum(LinhasDoc.TotalIliquido) AS dinheiroFaturadoEmProdutos FROM CabecDoc INNER JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc where CabecDoc.TipoDoc='ECL' AND YEAR(LinhasDoc.Data) =" + ano);

                while (!objListLin.NoFim())
                {
                    return objListLin.Valor("dinheiroFaturadoEmProdutos");
                }
            }
            return -1;
        }

        public static double Numero_DinheiroFaturadoEmProdutosPorVendedor_Ano(int ano, int vendedor)
        {
            StdBELista objListLin;

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListLin = PriEngine.Engine.Consulta("SELECT sum(LinhasDoc.TotalIliquido) AS dinheiroFaturadoEmProdutos FROM CabecDoc INNER JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc where CabecDoc.TipoDoc='ECL' AND YEAR(LinhasDoc.Data) =" + ano + " AND LinhasDoc.Vendedor = " + vendedor);

                while (!objListLin.NoFim())
                {
                    return objListLin.Valor("dinheiroFaturadoEmProdutos");
                }
            }
            return -1;
        }

        public static List<Model.LinhaDocVenda> Top5ProdutosMaisVendidos()
        {

            StdBELista objList;

            List<Model.LinhaDocVenda> listaProdutos = new List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta("SELECT TOP 5 LinhasDoc.Artigo AS Artigo, LinhasDoc.Descricao AS Descricao, sum(LinhasDoc.Quantidade) AS Quantidade FROM CabecDoc INNER JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc where CabecDoc.TipoDoc='ECL'group by LinhasDoc.Artigo, LinhasDoc.Descricao order by Quantidade DESC;");
                while (!objList.NoFim())
                {
                    Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
                    lindv.CodArtigo = objList.Valor("Artigo");
                    lindv.DescArtigo = objList.Valor("Descricao");
                    lindv.Quantidade = objList.Valor("Quantidade");

                    listaProdutos.Add(lindv);
                    objList.Seguinte();
                }
            }
            return listaProdutos;
        }

        public static List<Model.LinhaDocVenda> QuantidadeProdutosVendidosPorCategoria()
        {

            StdBELista objList;

            List<Model.LinhaDocVenda> lista = new List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta("SELECT Familias.Descricao AS Categoria, sum(LinhasDoc.Quantidade) AS Quantidade FROM CabecDoc JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc JOIN Artigo ON LinhasDoc.Artigo = Artigo.Artigo Join Familias ON Familias.Familia = Artigo.Familia where CabecDoc.TipoDoc='ECL' group by Familias.Descricao order by Familias.Descricao");
                while (!objList.NoFim())
                {
                    Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
                    lindv.FamiliaNome = objList.Valor("Categoria");
                    lindv.Quantidade = objList.Valor("Quantidade");

                    lista.Add(lindv);
                    objList.Seguinte();
                }
            }
            return lista;
        }

        public static List<Model.LinhaDocVenda> QuantidadeProdutosVendidosPorCategoria_Vendedor(int vendedor)
        {

            StdBELista objList;

            List<Model.LinhaDocVenda> lista = new List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta("SELECT Familias.Descricao AS Categoria, sum(LinhasDoc.Quantidade) AS Quantidade FROM CabecDoc JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc JOIN Artigo ON LinhasDoc.Artigo = Artigo.Artigo Join Familias ON Familias.Familia = Artigo.Familia where CabecDoc.TipoDoc='ECL' AND Vendedor = "+vendedor+"group by Familias.Descricao order by Familias.Descricao");
                while (!objList.NoFim())
                {
                    Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
                    lindv.FamiliaNome = objList.Valor("Categoria");
                    lindv.Quantidade = objList.Valor("Quantidade");

                    lista.Add(lindv);
                    objList.Seguinte();
                }
            }
            return lista;
        }

        public static List<Model.LinhaDocVenda> Top5ProdutosMaisVendidosPorVendedor(int vendedor)
        {

            StdBELista objList;

            List<Model.LinhaDocVenda> listaProdutos = new List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objList = PriEngine.Engine.Consulta("SELECT TOP 5 LinhasDoc.Artigo AS Artigo, LinhasDoc.Descricao AS Descricao, sum(LinhasDoc.Quantidade) AS Quantidade FROM CabecDoc INNER JOIN LinhasDoc ON CabecDoc.Id = LinhasDoc.IdCabecDoc where LinhasDoc.Vendedor = "+vendedor+ "AND CabecDoc.TipoDoc='ECL'group by LinhasDoc.Artigo, LinhasDoc.Descricao order by Quantidade DESC;");
                while (!objList.NoFim())
                {
                    Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
                    lindv.CodArtigo = objList.Valor("Artigo");
                    lindv.DescArtigo = objList.Valor("Descricao");
                    lindv.Quantidade = objList.Valor("Quantidade");

                    listaProdutos.Add(lindv);
                    objList.Seguinte();
                }
            }
            return listaProdutos;
        }

        public static List<Model.DocVenda> Encomendas_List()
        {

            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            List<Model.DocVenda> listdv = new List<Model.DocVenda>();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new
            List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListCab = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL'");
                while (!objListCab.NoFim())
                {
                    dv = new Model.DocVenda();
                    dv.id = objListCab.Valor("id");
                    dv.Entidade = objListCab.Valor("Entidade");
                    dv.NumDoc = objListCab.Valor("NumDoc");
                    dv.Data = objListCab.Valor("Data");
                    dv.TotalMerc = objListCab.Valor("TotalMerc");
                    dv.Serie = objListCab.Valor("Serie");
                    objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                    listlindv = new List<Model.LinhaDocVenda>();

                    while (!objListLin.NoFim())
                    {
                        lindv = new Model.LinhaDocVenda();
                        lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                        lindv.CodArtigo = objListLin.Valor("Artigo");
                        lindv.DescArtigo = objListLin.Valor("Descricao");
                        lindv.Quantidade = objListLin.Valor("Quantidade");
                        lindv.Unidade = objListLin.Valor("Unidade");
                        lindv.Desconto = objListLin.Valor("Desconto1");
                        lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                        lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                        lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");

                        listlindv.Add(lindv);
                        objListLin.Seguinte();
                    }

                    dv.LinhasDoc = listlindv;
                    listdv.Add(dv);
                    objListCab.Seguinte();
                }
            }
            return listdv;
        }




        public static Model.DocVenda Encomenda_Get(string numdoc)
        {


            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {


                string st = "SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL' and NumDoc='" + numdoc + "'";
                objListCab = PriEngine.Engine.Consulta(st);
                dv = new Model.DocVenda();
                dv.id = objListCab.Valor("id");
                dv.Entidade = objListCab.Valor("Entidade");
                dv.NumDoc = objListCab.Valor("NumDoc");
                dv.Data = objListCab.Valor("Data");
                dv.TotalMerc = objListCab.Valor("TotalMerc");
                dv.Serie = objListCab.Valor("Serie");
                objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                listlindv = new List<Model.LinhaDocVenda>();

                while (!objListLin.NoFim())
                {
                    lindv = new Model.LinhaDocVenda();
                    lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                    lindv.CodArtigo = objListLin.Valor("Artigo");
                    lindv.DescArtigo = objListLin.Valor("Descricao");
                    lindv.Quantidade = objListLin.Valor("Quantidade");
                    lindv.Unidade = objListLin.Valor("Unidade");
                    lindv.Desconto = objListLin.Valor("Desconto1");
                    lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                    lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                    lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");
                    listlindv.Add(lindv);
                    objListLin.Seguinte();
                }

                dv.LinhasDoc = listlindv;
                return dv;
            }
            return null;
        }

    }
}
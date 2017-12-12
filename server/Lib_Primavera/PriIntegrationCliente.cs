using Interop.GcpBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationCliente
    {

        public static List<Model.Cliente> ListaClientes()
        {

            StdBELista objList;

            List<Model.Cliente> listClientes = new List<Model.Cliente>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                //objList = PriEngine.Engine.Comercial.Clientes.LstClientes();

                objList = PriEngine.Engine.Consulta("SELECT Cliente, Nome,Moeda, Fac_Mor, Fac_Local, Fac_Cp, Fac_Tel, Fac_Fax, TotalDeb, NumContrib, Pais,EnderecoWeb, DataCriacao, EncomendasPendentes, Notas, Situacao, Vendedor, CDU_Email, Clientes.Descricao AS clidesc, GruposEmpresas.Descricao AS grpdesc from Clientes LEFT JOIN GruposEmpresas ON Clientes.Descricao = GruposEmpresas.Grupo;");


                while (!objList.NoFim())
                {
                    listClientes.Add(new Model.Cliente
                    {
                        CodCliente = objList.Valor("Cliente"),
                        Nome = objList.Valor("Nome"),
                        Moeda = objList.Valor("Moeda"),
                        Morada = objList.Valor("Fac_Mor"),
                        Localidade = objList.Valor("Fac_Local"),
                        CodPostal = objList.Valor("Fac_Cp"),
                        Fax = objList.Valor("Fac_Fax"),
                        TotalDeb = objList.Valor("TotalDeb"),
                        NumContribuinte = objList.Valor("NumContrib"),
                        Pais = objList.Valor("Pais"),
                        EnderecoWeb = objList.Valor("EnderecoWeb"),
                        DataCriacao = objList.Valor("DataCriacao"),
                        EncomendasPendentes = objList.Valor("EncomendasPendentes"),
                        Notas = objList.Valor("Notas"),
                        Situacao = objList.Valor("Situacao"),
                        Vendedor = objList.Valor("Vendedor"),
                        Email = objList.Valor("CDU_Email"),
                        Grupo = objList.Valor("clidesc"),
                        GrupoDesc = objList.Valor("grpdesc"),
                        Telemovel = objList.Valor("Fac_Tel")
                    });
                    objList.Seguinte();

                }

                return listClientes;
            }
            else
                return null;
        }

        public static List<Model.Cliente> GetCliente(string codCliente)
        {

            StdBELista objList;

            List<Model.Cliente> listClientes = new List<Model.Cliente>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Cliente, Nome,Moeda, Fac_Mor, Fac_Local, Fac_Cp, Fac_Tel, Fac_Fax," +
                "TotalDeb, NumContrib, Pais,EnderecoWeb, DataCriacao, EncomendasPendentes, Notas, Situacao, Vendedor, CDU_Email, Clientes.Descricao AS clidesc, " +
                "GruposEmpresas.Descricao AS grpdesc from Clientes LEFT JOIN GruposEmpresas ON Clientes.Descricao = GruposEmpresas.Grupo " +
                "where Cliente='" + codCliente +"' ;");


                while (!objList.NoFim())
                {
                    listClientes.Add(new Model.Cliente
                    {
                        CodCliente = objList.Valor("Cliente"),
                        Nome = objList.Valor("Nome"),
                        Moeda = objList.Valor("Moeda"),
                        Morada = objList.Valor("Fac_Mor"),
                        Localidade = objList.Valor("Fac_Local"),
                        CodPostal = objList.Valor("Fac_Cp"),
                        Fax = objList.Valor("Fac_Fax"),
                        TotalDeb = objList.Valor("TotalDeb"),
                        NumContribuinte = objList.Valor("NumContrib"),
                        Pais = objList.Valor("Pais"),
                        EnderecoWeb = objList.Valor("EnderecoWeb"),
                        DataCriacao = objList.Valor("DataCriacao"),
                        EncomendasPendentes = objList.Valor("EncomendasPendentes"),
                        Notas = objList.Valor("Notas"),
                        Situacao = objList.Valor("Situacao"),
                        Vendedor = objList.Valor("Vendedor"),
                        Email = objList.Valor("CDU_Email"),
                        Grupo = objList.Valor("clidesc"),
                        GrupoDesc = objList.Valor("grpdesc"),
                        Telemovel = objList.Valor("Fac_Tel")
                    });
                    objList.Seguinte();

                }

                return listClientes;
            }
            else
                return null;
        }


        public static List<Model.Cliente> GetClienteByVendorId(string id)
        {

            StdBELista objList;

            List<Model.Cliente> listClientes = new List<Model.Cliente>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Cliente, Nome,Moeda, Fac_Mor, Fac_Local, Fac_Cp, Fac_Tel, Fac_Fax," +
                "TotalDeb, NumContrib, Pais,EnderecoWeb, DataCriacao, EncomendasPendentes, Notas, Situacao, Vendedor, CDU_Email, Clientes.Descricao AS clidesc, " +
                "GruposEmpresas.Descricao AS grpdesc from Clientes LEFT JOIN GruposEmpresas ON Clientes.Descricao = GruposEmpresas.Grupo " +
                "where Vendedor = " + id + " ;");


                while (!objList.NoFim())
                {
                    listClientes.Add(new Model.Cliente
                    {
                        CodCliente = objList.Valor("Cliente"),
                        Nome = objList.Valor("Nome"),
                        Moeda = objList.Valor("Moeda"),
                        Morada = objList.Valor("Fac_Mor"),
                        Localidade = objList.Valor("Fac_Local"),
                        CodPostal = objList.Valor("Fac_Cp"),
                        Fax = objList.Valor("Fac_Fax"),
                        TotalDeb = objList.Valor("TotalDeb"),
                        NumContribuinte = objList.Valor("NumContrib"),
                        Pais = objList.Valor("Pais"),
                        EnderecoWeb = objList.Valor("EnderecoWeb"),
                        DataCriacao = objList.Valor("DataCriacao"),
                        EncomendasPendentes = objList.Valor("EncomendasPendentes"),
                        Notas = objList.Valor("Notas"),
                        Situacao = objList.Valor("Situacao"),
                        Vendedor = objList.Valor("Vendedor"),
                        Email = objList.Valor("CDU_Email"),
                        Grupo = objList.Valor("clidesc"),
                        GrupoDesc = objList.Valor("grpdesc"),
                        Telemovel = objList.Valor("Fac_Tel")
                    });
                    objList.Seguinte();

                }

                return listClientes;
            }
            else
                return null;
        }


        public static List<Model.Cliente> SearchCliente(Lib_Primavera.Model.SearchAndVendorDTO Search)
        {
            string search = Search.search;
            string id = Search.id;

            StdBELista objList;

            List<Model.Cliente> listClientes = new List<Model.Cliente>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Cliente, Nome,Moeda, Fac_Mor, Fac_Local, Fac_Cp, Fac_Tel, Fac_Fax,"+
                "TotalDeb, NumContrib, Pais,EnderecoWeb, DataCriacao, EncomendasPendentes, Notas, Situacao, Vendedor, CDU_Email, Clientes.Descricao AS clidesc, "+
                "GruposEmpresas.Descricao AS grpdesc from Clientes LEFT JOIN GruposEmpresas ON Clientes.Descricao = GruposEmpresas.Grupo "+
                "where Vendedor = "+ id +" AND (lower(Cliente) LIKE lower('%" + search + "%') OR lower(Nome) LIKE lower('%" + search + "%'));");


                while (!objList.NoFim())
                {
                    listClientes.Add(new Model.Cliente
                    {
                        CodCliente = objList.Valor("Cliente"),
                        Nome = objList.Valor("Nome"),
                        Moeda = objList.Valor("Moeda"),
                        Morada = objList.Valor("Fac_Mor"),
                        Localidade = objList.Valor("Fac_Local"),
                        CodPostal = objList.Valor("Fac_Cp"),
                        Fax = objList.Valor("Fac_Fax"),
                        TotalDeb = objList.Valor("TotalDeb"),
                        NumContribuinte = objList.Valor("NumContrib"),
                        Pais = objList.Valor("Pais"),
                        EnderecoWeb = objList.Valor("EnderecoWeb"),
                        DataCriacao = objList.Valor("DataCriacao"),
                        EncomendasPendentes = objList.Valor("EncomendasPendentes"),
                        Notas = objList.Valor("Notas"),
                        Situacao = objList.Valor("Situacao"),
                        Vendedor = objList.Valor("Vendedor"),
                        Email = objList.Valor("CDU_Email"),
                        Grupo = objList.Valor("clidesc"),
                        GrupoDesc = objList.Valor("grpdesc"),
                        Telemovel = objList.Valor("Fac_Tel")
                    });
                    objList.Seguinte();

                }

                return listClientes;
            }
            else
                return null;
        }


        public static Lib_Primavera.Model.RespostaErro UpdCliente(Lib_Primavera.Model.Cliente cliente)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            GcpBECliente objCli = new GcpBECliente();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.Comercial.Clientes.Existe(cliente.CodCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        objCli = PriEngine.Engine.Comercial.Clientes.Edita(cliente.CodCliente);
                        objCli.set_EmModoEdicao(true);

                        objCli.set_Cliente(cliente.CodCliente);
                        objCli.set_Nome(cliente.Nome);
                        objCli.set_Morada(cliente.Morada);
                        objCli.set_Localidade(cliente.Localidade);
                        objCli.set_CodigoPostal(cliente.CodPostal);
                        objCli.set_Fax(cliente.Fax);
                        objCli.set_DebitoContaCorrente(cliente.TotalDeb);
                        objCli.set_NumContribuinte(cliente.NumContribuinte);
                        objCli.set_Pais(cliente.Pais);
                        objCli.set_EnderecoWeb(cliente.EnderecoWeb);
                        objCli.set_DebitoEncomendasPendentes(cliente.EncomendasPendentes);
                        objCli.set_Descricao(cliente.Grupo);
                        objCli.set_Observacoes(cliente.Notas);
                        objCli.set_Inactivo(cliente.Inactivo);
                        objCli.set_Vendedor(cliente.Vendedor);
                        objCli.set_Moeda(cliente.Moeda);
                        objCli.set_Telefone(cliente.Telemovel);
                        objCli.set_Telefone2(cliente.Telefone);
                        objCli.set_DataUltimaActualizacao(DateTime.Now);

                        PriEngine.Engine.Comercial.Clientes.Actualiza(objCli);

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


        public static Lib_Primavera.Model.RespostaErro DelCliente(string codCliente)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            GcpBECliente objCli = new GcpBECliente();


            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    if (PriEngine.Engine.Comercial.Clientes.Existe(codCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        PriEngine.Engine.Comercial.Clientes.Remove(codCliente);
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



        public static Lib_Primavera.Model.RespostaErro InsereClienteObj(Model.Cliente cli)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            GcpBECliente myCli = new GcpBECliente();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    myCli.set_Cliente(cli.CodCliente);
                    myCli.set_Nome(cli.Nome);
                    myCli.set_Morada(cli.Morada);
                    myCli.set_Localidade(cli.Localidade);
                    myCli.set_CodigoPostal(cli.CodPostal);
                    myCli.set_Fax(cli.Fax);
                    myCli.set_DebitoContaCorrente(cli.TotalDeb);
                    myCli.set_NumContribuinte(cli.NumContribuinte);
                    myCli.set_Pais(cli.Pais);
                    myCli.set_EnderecoWeb(cli.EnderecoWeb);
                    myCli.set_DebitoEncomendasPendentes(cli.EncomendasPendentes);
                    myCli.set_Descricao(cli.Grupo);
                    myCli.set_Observacoes(cli.Notas);
                    myCli.set_Inactivo(cli.Inactivo);
                    myCli.set_Vendedor(cli.Vendedor);
                    myCli.set_Moeda(cli.Moeda);
                    myCli.set_DataCriacao(DateTime.Now);
                    myCli.set_DataUltimaActualizacao(DateTime.Now);

                    PriEngine.Engine.Comercial.Clientes.Actualiza(myCli);

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
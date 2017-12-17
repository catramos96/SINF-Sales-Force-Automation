using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FirstREST.Lib_Primavera.Model;
using Interop.StdBE900;
using Interop.GcpBE900;
using System.Data.SqlClient;
using System.Data;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationVendedor
    {

        public static IEnumerable<Vendedor> ListaVendedores()
        {
            StdBELista objList;
            List<Vendedor> listVendedores = new List<Vendedor>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Vendedor, Nome, Telefone, Telemovel, EMail, Notas, Morada, Localidade, CPostal, Fax FROM  Vendedores");


                while (!objList.NoFim())
                {
                    listVendedores.Add(new Vendedor
                    {
                        Id = objList.Valor("Vendedor"),
                        Nome = objList.Valor("Nome"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Email = objList.Valor("EMail"),
                        Morada = objList.Valor("Morada"),
                        Localidade = objList.Valor("Localidade"),
                        CodPostal = objList.Valor("CPostal"),
                        Fax = objList.Valor("Fax")
                    });
                    objList.Seguinte();

                }
                return listVendedores;
            }
            else
                return null;
        }

        public static RespostaErro InsereVendedorObj(Vendedor vendedor)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            GcpBEVendedor mySalesman = new GcpBEVendedor();
            StdBELista maxIdList = PriEngine.Engine.Consulta("SELECT Vendedores.Vendedor FROM  Vendedores group by Vendedores.Vendedor order by Vendedores.Vendedor + 0 desc ");
            string NewSalesmanID = "1";
            if (maxIdList.NumColunas() != 0)
            {
                NewSalesmanID = ((int)(Int32.Parse(maxIdList.Valor("Vendedor")) + 1)).ToString();
            }

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    // cria salesman
                    vendedor.Id = NewSalesmanID;
                    mySalesman.set_Vendedor(NewSalesmanID);
                    mySalesman.set_Nome(vendedor.Nome);
                    mySalesman.set_CodigoPostal(vendedor.CodPostal);
                    mySalesman.set_Morada(vendedor.Morada);
                    mySalesman.set_Localidade(vendedor.Localidade);
                    mySalesman.set_Telefone(vendedor.Telefone);
                    mySalesman.set_Telemovel(vendedor.Telemovel);
                    mySalesman.set_Email(vendedor.Email);
                    mySalesman.set_Fax(vendedor.Fax);
                    mySalesman.set_DataUltimaActualizacao(DateTime.Now);
                    if (vendedor.Chefe != null)
                    {
                        PriEngine.Engine.Comercial.Vendedores.Actualiza(mySalesman);
                    }
                    else
                    {
                        erro.Erro = 1;
                        erro.Descricao = "Erro vendedor nao tem chefe";
                        return erro;
                    }
                    

                    //cria relacao ChefeVendedor

                    GcpBEVendedorChefe ChefeVendedores = new GcpBEVendedorChefe();
                    
                    ChefeVendedores.set_Comissao(2);
                    ChefeVendedores.set_ChefeVendedor(vendedor.Chefe);
                    ChefeVendedores.set_Vendedor(vendedor.Id);
                    Interop.GcpBE900.GcpBEVendedorChefe ola = new GcpBEVendedorChefe();

                    SqlConnection conn = new SqlConnection();
                    SqlCommand cmd = new SqlCommand();
                    conn.ConnectionString = "Data Source=User-PC\\PRIMAVERA;" +
                        "Initial Catalog=PRIDEMOSINF;" +
                        "User id=sa;" +
                        "Password=Feup2014;";

                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.Text;
                    cmd.CommandText = "INSERT INTO ChefeVendedores (ChefeVendedores, Vendedor, Comissao) VALUES (@param1,@param2,@param3)";
                    cmd.Parameters.AddWithValue("@param1", vendedor.Chefe);
                    cmd.Parameters.AddWithValue("@param2", vendedor.Id);
                    cmd.Parameters.AddWithValue("@param3", 2);

                    try
                    {
                        conn.Open();
                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);

                    }



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


        public static RespostaErro CheckLoginDetails(Vendedor vendedor)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            if (vendedor == null || vendedor.Username == null || vendedor.Password == null)
            {
                erro.Erro = 1;
                erro.Descricao = "Informação de vendedor invalida";
                return erro;
            }
            else
            {

            }

            string username = vendedor.Username;
            string password = vendedor.Password;

            SqlConnection conn = new SqlConnection();
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            conn.ConnectionString = "Data Source=User-PC\\PRIMAVERA;" +
                "Initial Catalog=PrimaveraExtension;" +
                "User id=sa;" +
                "Password=Feup2014;";
            cmd.CommandText = "Select * from Authentication WHERE Username = '" + username + "' AND Password  = '" + password + "' ";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conn;
            try
            {
                conn.Open();
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    vendedor.Role = reader.GetValue(2).ToString();
                    vendedor.Id = reader.GetValue(3).ToString();
                }
                conn.Close();
                erro.Erro = 0;
                erro.Descricao = "Sucesso";
                return erro;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            erro.Erro = 2;
            erro.Descricao = "Erro inesperado!";
            return erro;
        }


        public static Lib_Primavera.Model.Vendedor GetVendedor(int id)
        {
            GcpBEVendedor objVendedor = new GcpBEVendedor();
            Model.Vendedor mySalesman = new Model.Vendedor();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                if (PriEngine.Engine.Comercial.Vendedores.Existe(id.ToString()) == false)
                {
                    return null;
                }
                else
                {
                    objVendedor = PriEngine.Engine.Comercial.Vendedores.Edita(id.ToString());

                    mySalesman.Id = objVendedor.get_Vendedor();
                    mySalesman.Nome = objVendedor.get_Nome();

                    mySalesman.CodPostal = objVendedor.get_CodigoPostal();
                    mySalesman.Morada = objVendedor.get_Morada();
                    mySalesman.Localidade = objVendedor.get_Localidade();
                    mySalesman.Telefone = objVendedor.get_Telefone();
                    mySalesman.Telemovel = objVendedor.get_Telemovel();
                    mySalesman.Email = objVendedor.get_Email();
                    mySalesman.Fax = objVendedor.get_Fax();


                    return mySalesman;
                }
            }
            else
            {
                return null;
            }
        }


        public static IEnumerable<Vendedor> ListaEquipaDeChefe(string id)
        {
            StdBELista objList;
            List<Vendedor> listVendedores = new List<Vendedor>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                string query = @"
SELECT Vendedores.Vendedor, Vendedores.Nome, Vendedores.Telefone, Vendedores.Telemovel, Vendedores.EMail, Vendedores.Morada, Vendedores.Localidade, Vendedores.CPostal, Vendedores.Fax
FROM  Vendedores JOIN ChefeVendedores ON Vendedores.Vendedor = ChefeVendedores.Vendedor  WHERE ChefeVendedores.ChefeVendedores= {0} GROUP BY 
Vendedores.Vendedor, Vendedores.Nome, Vendedores.Telefone, Vendedores.Telemovel, Vendedores.EMail, Vendedores.Morada, Vendedores.Localidade, Vendedores.CPostal, Vendedores.Fax
";

                query = string.Format(query, id);
                objList = PriEngine.Engine.Consulta(query);


                while (!objList.NoFim())
                {
                    listVendedores.Add(new Vendedor
                    {
                        Id = objList.Valor("Vendedor"),
                        Nome = objList.Valor("Nome"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Email = objList.Valor("EMail"),
                        Morada = objList.Valor("Morada"),
                        Localidade = objList.Valor("Localidade"),
                        CodPostal = objList.Valor("CPostal"),
                        Fax = objList.Valor("Fax")
                    });
                    objList.Seguinte();

                }
                return listVendedores;
            }
            else
                return null;
        }


        public static IEnumerable<Vendedor> ListaEquipaDeVendedor(string id)
        {
            StdBELista objList;
            List<Vendedor> listVendedores = new List<Vendedor>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                string query = @"
SELECT Vendedores.Vendedor, Vendedores.Nome, Vendedores.Telefone, Vendedores.Telemovel, Vendedores.EMail, Vendedores.Morada, Vendedores.Localidade, Vendedores.CPostal, Vendedores.Fax FROM (
SELECT ChefeVendedores.ChefeVendedores 
FROM  Vendedores JOIN ChefeVendedores ON Vendedores.Vendedor = ChefeVendedores.ChefeVendedores  WHERE ChefeVendedores.Vendedor = {0} ) 
AS T1
 JOIN ChefeVendedores AS T2 ON  T1.ChefeVendedores = T2.ChefeVendedores 
 JOIN Vendedores ON T2.Vendedor = Vendedores.Vendedor
WHERE Vendedores.Vendedor != {0}
";

                query = string.Format(query, id);
                objList = PriEngine.Engine.Consulta(query);


                while (!objList.NoFim())
                {
                    listVendedores.Add(new Vendedor
                    {
                        Id = objList.Valor("Vendedor"),
                        Nome = objList.Valor("Nome"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Email = objList.Valor("EMail"),
                        Morada = objList.Valor("Morada"),
                        Localidade = objList.Valor("Localidade"),
                        CodPostal = objList.Valor("CPostal"),
                        Fax = objList.Valor("Fax")
                    });
                    objList.Seguinte();

                }
                return listVendedores;
            }
            else
                return null;
        }


        public static IEnumerable<Vendedor> ListaChefeDeVendedor(string id)
        {
            StdBELista objList;
            List<Vendedor> listVendedores = new List<Vendedor>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                string query = @"
SELECT Vendedores.Vendedor, Vendedores.Nome, Vendedores.Telefone, Vendedores.Telemovel, Vendedores.EMail, Vendedores.Morada, Vendedores.Localidade, Vendedores.CPostal, Vendedores.Fax
FROM Vendedores JOIN ChefeVendedores ON Vendedores.Vendedor = ChefeVendedores.ChefeVendedores WHERE ChefeVendedores.Vendedor = {0} GROUP BY 
Vendedores.Vendedor, Vendedores.Nome, Vendedores.Telefone, Vendedores.Telemovel, Vendedores.EMail, Vendedores.Morada, Vendedores.Localidade, Vendedores.CPostal, Vendedores.Fax
";

                query = string.Format(query, id);
                objList = PriEngine.Engine.Consulta(query);


                while (!objList.NoFim())
                {
                    listVendedores.Add(new Vendedor
                    {
                        Id = objList.Valor("Vendedor"),
                        Nome = objList.Valor("Nome"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Email = objList.Valor("EMail"),
                        Morada = objList.Valor("Morada"),
                        Localidade = objList.Valor("Localidade"),
                        CodPostal = objList.Valor("CPostal"),
                        Fax = objList.Valor("Fax")
                    });
                    objList.Seguinte();

                }
                return listVendedores;
            }
            else
                return null;
        }

    }
}
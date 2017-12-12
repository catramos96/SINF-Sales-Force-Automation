using FirstREST.Lib_Primavera.Model;
using Interop.StdBE900;
using Interop.CrmBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationContacto
    {
        public static IEnumerable<Contacto> ListaContactos()
        {

            StdBELista objList;
            List<Contacto> listContactos = new List<Contacto>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Entidade, Nome, Morada, Localidade, CodPostal, Telefone, Telemovel, Fax, Email, EnderecoWeb, Vendedor, Pais FROM  EntidadesExternas;");


                    while (!objList.NoFim())
                    {
                        listContactos.Add(new Contacto
                        {
                            Entidade = objList.Valor("Entidade"),
                            Nome = objList.Valor("Nome"),
                            Vendedor = objList.Valor("Vendedor"),
                            Morada = objList.Valor("Morada"),
                            CodPostal = objList.Valor("CodPostal"),
                            Telefone = objList.Valor("Telefone"),
                            Telemovel = objList.Valor("Telemovel"),
                            Pais = objList.Valor("Pais"),
                            Fax = objList.Valor("Fax"),
                            Localidade = objList.Valor("Localidade"),
                            Email = objList.Valor("Email"),
                        });
                        objList.Seguinte();

                    }
                return listContactos;
            }
            else
                return null;
        }


        public static List<Model.Contacto> GetContactoById(string id)
        {
            StdBELista objList;

            List<Model.Contacto> listContactos = new List<Model.Contacto>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Entidade, Nome, Morada, Localidade, CodPostal, Telefone, Telemovel, Fax, Email, EnderecoWeb, Vendedor, Pais FROM  EntidadesExternas where Entidade ='"+id+"';");


                while (!objList.NoFim())
                {
                    listContactos.Add(new Contacto
                    {
                        Entidade = objList.Valor("Entidade"),
                        Nome = objList.Valor("Nome"),
                        Vendedor = objList.Valor("Vendedor"),
                        Morada = objList.Valor("Morada"),
                        CodPostal = objList.Valor("CodPostal"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Pais = objList.Valor("Pais"),
                        Fax = objList.Valor("Fax"),
                        Localidade = objList.Valor("Localidade"),
                        Email = objList.Valor("Email"),
                    });
                    objList.Seguinte();

                }

                return listContactos;
            }
            else
                return null;
        }


        public static List<Model.Contacto> GetContactoByVendorId(string id)
        {
            StdBELista objList;

            List<Model.Contacto> listContactos = new List<Model.Contacto>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Entidade, Nome, Morada, Localidade, CodPostal, Telefone, Telemovel, Fax, Email, EnderecoWeb, Vendedor, Pais FROM  EntidadesExternas where Vendedor ='" + id + "';");


                while (!objList.NoFim())
                {
                    listContactos.Add(new Contacto
                    {
                        Entidade = objList.Valor("Entidade"),
                        Nome = objList.Valor("Nome"),
                        Vendedor = objList.Valor("Vendedor"),
                        Morada = objList.Valor("Morada"),
                        CodPostal = objList.Valor("CodPostal"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Pais = objList.Valor("Pais"),
                        Fax = objList.Valor("Fax"),
                        Localidade = objList.Valor("Localidade"),
                        Email = objList.Valor("Email"),
                    });
                    objList.Seguinte();

                }

                return listContactos;
            }
            else
                return null;
        }

        public static List<Model.Contacto> SearchContacto(SearchAndVendorDTO Search)
        {
            string search = Search.search;
            string id = Search.id;

            StdBELista objList;

            List<Model.Contacto> listContactos = new List<Model.Contacto>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Entidade, Nome, Morada, Localidade, CodPostal, Telefone, Telemovel, Fax, Email, EnderecoWeb, Vendedor, Pais FROM  EntidadesExternas " +
                "where Vendedor = '" + id + "' AND (lower(PrimeiroNome) LIKE lower('%" + search + "%') OR lower(UltimoNome) LIKE lower('%" + search + "%') );");


                while (!objList.NoFim())
                {
                    listContactos.Add(new Contacto
                    {
                        Entidade = objList.Valor("Entidade"),
                        Nome = objList.Valor("Nome"),
                        Vendedor = objList.Valor("Vendedor"),
                        Morada = objList.Valor("Morada"),
                        CodPostal = objList.Valor("CodPostal"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Pais = objList.Valor("Pais"),
                        Fax = objList.Valor("Fax"),
                        Localidade = objList.Valor("Localidade"),
                        Email = objList.Valor("Email"),
                    });
                    objList.Seguinte();

                }

                return listContactos;
            }
            else
                return null;
        }



        public static RespostaErro InsereContactoObj(Contacto contacto)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEEntidadeExterna myContact = new CrmBEEntidadeExterna();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    myContact.set_Morada(contacto.Morada);
                    myContact.set_CodPostal(contacto.CodPostal);
                    myContact.set_Localidade(contacto.Localidade);
                    myContact.set_Pais(contacto.Pais);
                    myContact.set_Telefone(contacto.Telefone);
                    myContact.set_Telemovel(contacto.Telemovel);
                    myContact.set_Email(contacto.Email);
                    myContact.set_Entidade(contacto.Nome.ToUpper());
                    myContact.set_Nome(contacto.Nome);
                    myContact.set_Vendedor(contacto.Vendedor);
                    myContact.set_Fax(contacto.Fax);
                    myContact.set_DataCriacao(DateTime.Now);

                    PriEngine.Engine.CRM.EntidadesExternas.Actualiza(myContact);

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


        public static Lib_Primavera.Model.RespostaErro UpdContacto(Lib_Primavera.Model.Contacto contacto)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEEntidadeExterna myContact = new CrmBEEntidadeExterna();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.CRM.EntidadesExternas.Existe(contacto.Entidade) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O contacto não existe";
                        return erro;
                    }
                    else
                    {

                        myContact = PriEngine.Engine.CRM.EntidadesExternas.Edita(contacto.Entidade);
                        myContact.set_EmModoEdicao(true);

                        myContact.set_Morada(contacto.Morada);
                        myContact.set_CodPostal(contacto.CodPostal);
                        myContact.set_Localidade(contacto.Localidade);
                        myContact.set_Pais(contacto.Pais);
                        myContact.set_Telefone(contacto.Telefone);
                        myContact.set_Telemovel(contacto.Telemovel);
                        myContact.set_Email(contacto.Email);
                        myContact.set_Entidade(contacto.Nome.ToUpper());
                        myContact.set_Nome(contacto.Nome);
                        myContact.set_Fax(contacto.Fax);
                        
                        PriEngine.Engine.CRM.EntidadesExternas.Actualiza(myContact);

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


    }
}
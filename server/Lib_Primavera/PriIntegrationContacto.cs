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

                objList = PriEngine.Engine.Consulta("SELECT Id, Telefone, Telemovel, Email, Notas, Contacto, Titulo, Morada, Localidade, CodPostal, Pais, DataNascimento, SexoMasculino, NumContribuinte, PrimeiroNome, NomesIntermedios, UltimoNome, CriadoPor FROM  Contactos");


                    while (!objList.NoFim())
                    {
                        listContactos.Add(new Contacto
                        {
                            Id = objList.Valor("Id"),
                            Telefone = objList.Valor("Telefone"),
                            Telemovel = objList.Valor("Telemovel"),
                            Email = objList.Valor("Email"),
                            Notas = objList.Valor("Notas"),
                            ContactoDef = objList.Valor("Contacto"),
                            Titulo = objList.Valor("Titulo"),
                            Morada = objList.Valor("Morada"),
                            Localidade = objList.Valor("Localidade"),
                            CodPostal = objList.Valor("CodPostal"),
                            Pais = objList.Valor("Pais"),
                            NumContribuinte = objList.Valor("NumContribuinte"),
                            PrimeiroNome = objList.Valor("PrimeiroNome"),
                            NomesIntermedios = objList.Valor("NomesIntermedios"),
                            UltimoNome = objList.Valor("UltimoNome"),
                            CriadoPor = objList.Valor("CriadoPor")
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

                objList = PriEngine.Engine.Consulta("SELECT Id, Telefone, Telemovel, Email, Notas, Contacto, Titulo, Morada, Localidade, CodPostal, Pais, DataNascimento, SexoMasculino, NumContribuinte, PrimeiroNome, NomesIntermedios, UltimoNome, CriadoPor FROM  Contactos " +
                "where Id='"+id+"';");


                while (!objList.NoFim())
                {
                    listContactos.Add(new Contacto
                    {
                        Id = objList.Valor("Id"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Email = objList.Valor("Email"),
                        Notas = objList.Valor("Notas"),
                        ContactoDef = objList.Valor("Contacto"),
                        Titulo = objList.Valor("Titulo"),
                        Morada = objList.Valor("Morada"),
                        Localidade = objList.Valor("Localidade"),
                        CodPostal = objList.Valor("CodPostal"),
                        Pais = objList.Valor("Pais"),
                        NumContribuinte = objList.Valor("NumContribuinte"),
                        PrimeiroNome = objList.Valor("PrimeiroNome"),
                        NomesIntermedios = objList.Valor("NomesIntermedios"),
                        UltimoNome = objList.Valor("UltimoNome"),
                        CriadoPor = objList.Valor("CriadoPor")
                    });
                    objList.Seguinte();

                }

                return listContactos;
            }
            else
                return null;
        }

        public static List<Model.Contacto> SearchContacto(string search)
        {


            StdBELista objList;

            List<Model.Contacto> listContactos = new List<Model.Contacto>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta("SELECT Id, Telefone, Telemovel, Email, Notas, Contacto, Titulo, Morada, Localidade, CodPostal, Pais, DataNascimento, SexoMasculino, NumContribuinte, PrimeiroNome, NomesIntermedios, UltimoNome, CriadoPor FROM  Contactos "+
                "where lower(PrimeiroNome) LIKE lower('%" + search + "%') OR lower(UltimoNome) LIKE lower('%" + search + "%');");


                while (!objList.NoFim())
                {
                    listContactos.Add(new Contacto
                    {
                        Id = objList.Valor("Id"),
                        Telefone = objList.Valor("Telefone"),
                        Telemovel = objList.Valor("Telemovel"),
                        Email = objList.Valor("Email"),
                        Notas = objList.Valor("Notas"),
                        ContactoDef = objList.Valor("Contacto"),
                        Titulo = objList.Valor("Titulo"),
                        Morada = objList.Valor("Morada"),
                        Localidade = objList.Valor("Localidade"),
                        CodPostal = objList.Valor("CodPostal"),
                        Pais = objList.Valor("Pais"),
                        NumContribuinte = objList.Valor("NumContribuinte"),
                        PrimeiroNome = objList.Valor("PrimeiroNome"),
                        NomesIntermedios = objList.Valor("NomesIntermedios"),
                        UltimoNome = objList.Valor("UltimoNome"),
                        CriadoPor = objList.Valor("CriadoPor")
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


            CrmBEContacto myContact = new CrmBEContacto();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    myContact.set_PrimeiroNome(contacto.PrimeiroNome);
                    myContact.set_NomesIntermedios(contacto.NomesIntermedios);
                    myContact.set_UltimoNome(contacto.UltimoNome);
                    myContact.set_NumContribuinte(contacto.NumContribuinte);
                    myContact.set_Morada(contacto.Morada);
                    myContact.set_CodPostal(contacto.CodPostal);
                    myContact.set_Localidade(contacto.Localidade);
                    myContact.set_Pais(contacto.Pais);
                    myContact.set_Notas(contacto.Notas);
                    myContact.set_Titulo(contacto.Titulo);
                    myContact.set_Telefone(contacto.Telefone);
                    myContact.set_Telemovel(contacto.Telemovel);
                    myContact.set_Email(contacto.Email);
                    myContact.set_Contacto(contacto.PrimeiroNome.ToUpper()[0] + contacto.UltimoNome.ToUpper());
                    myContact.set_ID(Guid.NewGuid().ToString());

                    PriEngine.Engine.CRM.Contactos.Actualiza(myContact);

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


            CrmBEContacto myContact = new CrmBEContacto();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.CRM.Contactos.Existe(contacto.Id) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O contacto não existe";
                        return erro;
                    }
                    else
                    {

                        myContact = PriEngine.Engine.CRM.Contactos.Edita(contacto.Id);
                        myContact.set_EmModoEdicao(true);
                        myContact.set_PrimeiroNome(contacto.PrimeiroNome);
                        myContact.set_NomesIntermedios(contacto.NomesIntermedios);
                        myContact.set_UltimoNome(contacto.UltimoNome);
                        myContact.set_NumContribuinte(contacto.NumContribuinte);
                        myContact.set_Morada(contacto.Morada);
                        myContact.set_CodPostal(contacto.CodPostal);
                        myContact.set_Localidade(contacto.Localidade);
                        myContact.set_Pais(contacto.Pais);
                        myContact.set_Notas(contacto.Notas);
                        myContact.set_Titulo(contacto.Titulo);
                        myContact.set_Telefone(contacto.Telefone);
                        myContact.set_Telemovel(contacto.Telemovel);
                        myContact.set_Email(contacto.Email);
                        myContact.set_Contacto(contacto.PrimeiroNome.ToUpper()[0] + contacto.UltimoNome.ToUpper());

                        PriEngine.Engine.CRM.Contactos.Actualiza(myContact);

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
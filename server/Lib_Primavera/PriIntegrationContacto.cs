using FirstREST.Lib_Primavera.Model;
using Interop.StdBE900;
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
    }
}
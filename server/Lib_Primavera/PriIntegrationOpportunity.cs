using Interop.CrmBE900;
using Interop.GcpBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationOpportunity
    {
        public static Model.Opportunity GetOportunidade(string id)
        {
            CrmBEOportunidadeVenda objLead = new CrmBEOportunidadeVenda();
            CrmBEPropostasOPV objOpp = new CrmBEPropostasOPV();
            CrmBELinhasPropostaOPV objLinhas = new CrmBELinhasPropostaOPV();

            Model.Opportunity opportunity = new Model.Opportunity();
            Model.Lead lead = new Model.Lead();
            List<Model.Proposta> propostas = new List<Model.Proposta>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                if (PriEngine.Engine.CRM.PropostasOPV.Existe(id) == false)
                {
                    return null;
                }
                else
                {
                    //vai buscar a lead
                    objLead = PriEngine.Engine.CRM.OportunidadesVenda.EditaID(id);

                    //lead.ID = id;
                    lead.ID = id;
                    lead.Oportunidade = objLead.get_Oportunidade();
                    lead.Descricao = objLead.get_Descricao();
                    lead.Resumo = objLead.get_Resumo();
                    lead.DataCriacao = objLead.get_DataCriacao();
                    lead.Vendedor = objLead.get_Vendedor();

                    var idCliente = objLead.get_Entidade();
                    lead.IdCliente = idCliente;
                    lead.NomeCliente = PriEngine.Engine.Comercial.Clientes.DaValorAtributo(idCliente, "Nome");
                    lead.ContactoCliente = PriEngine.Engine.Comercial.Clientes.DaValorAtributo(idCliente, "Fac_Tel");

                    opportunity.Lead = lead;
                    opportunity.EstadoVenda = objLead.get_EstadoVenda();

                    //vai buscar as proposta correspondente
                    objOpp = PriEngine.Engine.CRM.OportunidadesVenda.EditaPropostasOPV(id);
                    for (short i = 1; i <= objOpp.NumItens; i++)
                    {
                        var objProposta = objOpp.get_Edita(i);
                        var proposta = new Model.Proposta();
                        var linhas = new List<Model.OpportunityLine>();

                        proposta.NumProposta = objProposta.get_NumProposta();
                        proposta.Valor = objProposta.get_Valor();

                        //vai buscar os artigos desta proposta
                        objLinhas = objProposta.get_Linhas();
                        for (short j = 1; j <= objLinhas.NumItens; j++)
                        {
                            var objLinha = objLinhas.get_Edita(j);
                            var numProposta = objLinha.get_NumProposta();
                            if (numProposta == proposta.NumProposta)
                            {
                                var linha = new Model.OpportunityLine();

                                linha.Linha = objLinha.get_Linha();
                                linha.IdArtigo = objLinha.get_Artigo();
                                linha.NomeArtigo = objLinha.get_Descricao();
                                linha.PrecoVenda = objLinha.get_PrecoVenda();
                                linha.Quantidade = objLinha.get_Quantidade();
                                linha.Unidade = objLinha.get_Unidade();

                                linhas.Add(linha);
                            }
                            
                        }
                        proposta.Artigos = linhas;

                        propostas.Add(proposta);
                    }

                    opportunity.propostas = propostas;

                    return opportunity;
                }
            }
            else
            {
                return null;
            }
        }

        public static IEnumerable<Model.Opportunity> ListaOpportunidades()
        {
            StdBELista oppList;
            Model.Opportunity opp;
            Model.Lead lead;
            List<Model.Opportunity> listOpps = new List<Model.Opportunity>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                oppList = PriEngine.Engine.Consulta(
                    @"select ID, CabecOportunidadesVenda.EstadoVenda AS EstadoVenda,
                      Clientes.Nome AS NomeCliente, Clientes.Fac_Tel AS ContactoCliente, 
                      CabecOportunidadesVenda.DataCriacao AS Data, CabecOportunidadesVenda.Descricao AS Descricao
                      from CabecOportunidadesVenda JOIN Clientes ON Clientes.Cliente = CabecOportunidadesVenda.Entidade
                      where EstadoVenda = 0"); //Oportunidades abertas

                while (!oppList.NoFim())
                {
                    opp = new Model.Opportunity();
                    lead = new Model.Lead();
                    lead.ID = oppList.Valor("ID");
                    lead.NomeCliente = oppList.Valor("NomeCliente");
                    lead.ContactoCliente = oppList.Valor("ContactoCliente");
                    lead.DataCriacao = oppList.Valor("Data");
                    lead.Descricao = oppList.Valor("Descricao");

                    opp.Lead = lead;
                    listOpps.Add(opp);
                    oppList.Seguinte();
                }
                return listOpps;
            }
            else
            {
                return null;
            }
        }
    }
}
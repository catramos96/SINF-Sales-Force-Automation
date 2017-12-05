using FirstREST.Lib_Primavera.Model;
using Interop.CrmBE900;
using Interop.GcpBE900;
using Interop.StdBE900;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegrationOportunidade
    {
        public static Model.Oportunidade GetOportunidade(string id)
        {
            CrmBEOportunidadeVenda objLead = new CrmBEOportunidadeVenda();
            CrmBEPropostasOPV objOpp = new CrmBEPropostasOPV();
            CrmBELinhasPropostaOPV objLinhas = new CrmBELinhasPropostaOPV();

            Model.Oportunidade opportunity = new Model.Oportunidade();
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

                    opportunity.ID = id;
                    opportunity.NomeOport = objLead.get_Oportunidade();
                    opportunity.Descricao = objLead.get_Descricao();
                    opportunity.Resumo = objLead.get_Resumo();
                    opportunity.DataCriacao = objLead.get_DataCriacao();
                    opportunity.Vendedor = objLead.get_Vendedor();

                    var idCliente = objLead.get_Entidade();
                    opportunity.CodCliente = idCliente;
                    opportunity.NomeCliente = PriEngine.Engine.Comercial.Clientes.DaValorAtributo(idCliente, "Nome");
                    opportunity.ContactoCliente = PriEngine.Engine.Comercial.Clientes.DaValorAtributo(idCliente, "Fac_Tel");
                    opportunity.EstadoVenda = objLead.get_EstadoVenda();

                    //vai buscar as proposta correspondente
                    objOpp = PriEngine.Engine.CRM.OportunidadesVenda.EditaPropostasOPV(id);
                    for (short i = 1; i <= objOpp.NumItens; i++)
                    {
                        var objProposta = objOpp.get_Edita(i);
                        var proposta = new Model.Proposta();
                        var linhas = new List<Model.OportunidadeLinha>();

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
                                var linha = new Model.OportunidadeLinha();

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

        public static IEnumerable<Model.Oportunidade> ListaOpportunidades()
        {
            StdBELista oppList;
            Model.Oportunidade opp;          
            List<Model.Oportunidade> listOpps = new List<Model.Oportunidade>();

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
                    opp = new Model.Oportunidade();

                    opp.ID = oppList.Valor("ID");
                    opp.NomeCliente = oppList.Valor("NomeCliente");
                    opp.ContactoCliente = oppList.Valor("ContactoCliente");
                    opp.DataCriacao = oppList.Valor("Data");
                    opp.Descricao = oppList.Valor("Descricao");

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

        public static RespostaErro CreateOportunidade(Model.Oportunidade oportunidade)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEOportunidadeVenda objOport = new CrmBEOportunidadeVenda();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    objOport.set_ID(Guid.NewGuid().ToString());
                    StdBELista opps = PriEngine.Engine.Consulta("SELECT COUNT(*) AS N FROM CabecOportunidadesVenda");
                    int next = opps.Valor("N") + 1;
                    objOport.set_Oportunidade("OPV" + next);
                    objOport.set_Descricao(oportunidade.Descricao);
                    objOport.set_Resumo(oportunidade.Resumo);
                    objOport.set_DataCriacao(DateTime.Now);
                    objOport.set_Entidade(oportunidade.CodCliente);
                    objOport.set_Vendedor("1");    //TODO temp
                    objOport.set_EstadoVenda(0);
                    objOport.set_TipoEntidade("C"); //obrigatorio
                    objOport.set_DataExpiracao(new DateTime(2020, 1, 1));   //obrigatorio
                    objOport.set_CicloVenda("CV_HW");   //obrigatorio
                    objOport.set_Moeda("EUR");
                    //quando cria ainda nao tem propostas

                    PriEngine.Engine.CRM.OportunidadesVenda.Actualiza(objOport);
                       
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

        public static RespostaErro CreateProposta(Oportunidade oportunidade)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            StdBELista props = PriEngine.Engine.Consulta(@"SELECT Count(*) AS N FROM PropostasOPV
                                                            WHERE IdOportunidade = '"+ oportunidade.ID +"' ;");
            int n = props.Valor("N");
            //maximo 4 propostas
            if (n >= 4)
            {
                erro.Erro = 1;
                erro.Descricao = "The maximum of proposals is four.";
                return erro;
            }

            CrmBEPropostaOPV prop = new CrmBEPropostaOPV();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    prop.set_IdOportunidade(oportunidade.ID);
                    prop.set_IdCabecOrigem(oportunidade.ID);
                    short x = (short)n;
                    x++;
                    prop.set_NumProposta(x);
                    prop.set_Valor(0);

                    //var opp = PriEngine.Engine.CRM.OportunidadesVenda.EditaID(oportunidade.ID);
                    PriEngine.Engine.CRM.PropostasOPV.Actualiza(prop);

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
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
                if (PriEngine.Engine.CRM.OportunidadesVenda.ExisteID(id) == false)
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
                    opportunity.DescontoCliente = PriEngine.Engine.Comercial.Clientes.DaValorAtributo(idCliente, "Desconto");
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
                        proposta.Desconto = objProposta.get_ValorDesconto();
                        proposta.Rentabilidade = objProposta.get_Rentabilidade();
                        proposta.Margem = objProposta.get_Margem()*100;

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
                                linha.Quantidade = objLinha.get_Quantidade();
                                linha.Unidade = objLinha.get_Unidade();
                                linha.Custo = objLinha.get_PrecoCusto() * linha.Quantidade;
                                linha.PrecoVenda = objLinha.get_PrecoVenda() * linha.Quantidade;
                                linha.Desconto = objLinha.get_ValorDesconto() * linha.Quantidade;
                                linha.PrecoFinal = linha.PrecoVenda - linha.Desconto * linha.Quantidade;
                                linha.Rentabilidade = objLinha.get_Rentabilidade() * linha.Quantidade;
                                linha.Margem = objLinha.get_Margem()*100;

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

        public static IEnumerable<Model.Oportunidade> ListaOportunidadesVendedor(string vendedor)
        {
            StdBELista oppList;
            Model.Oportunidade opp;          
            List<Model.Oportunidade> listOpps = new List<Model.Oportunidade>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                oppList = PriEngine.Engine.Consulta(
                    @"select ID, CabecOportunidadesVenda.Vendedor AS Vendedor, CabecOportunidadesVenda.EstadoVenda AS EstadoVenda,
                      Clientes.Nome AS NomeCliente, Clientes.Fac_Tel AS ContactoCliente, 
                      CabecOportunidadesVenda.DataCriacao AS Data, CabecOportunidadesVenda.Descricao AS Descricao
                      from CabecOportunidadesVenda JOIN Clientes ON Clientes.Cliente = CabecOportunidadesVenda.Entidade
                      where EstadoVenda = 0 AND CabecOportunidadesVenda.Vendedor = '" + vendedor + "';"); //Oportunidades abertas

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
                    objOport.set_Vendedor(oportunidade.Vendedor);  
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

        public static RespostaErro RemoveProduto(OportunidadeDTO dto)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEPropostaOPV objProp = new CrmBEPropostaOPV();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    //oportunidade
                    if (!PriEngine.Engine.CRM.OportunidadesVenda.ExisteID(dto.IdOportunidade))
                    {
                        erro.Erro = 1;
                        erro.Descricao = "Nao existe oportunidade";
                        return erro;
                    }
                    //proposta
                    objProp = PriEngine.Engine.CRM.PropostasOPV.Edita(dto.IdOportunidade, dto.NumProposta, true);
                    objProp.set_EmModoEdicao(true);

                    //vai buscar os artigos desta proposta
                    CrmBELinhasPropostaOPV objLinhas = objProp.get_Linhas();
                    for (short j = 1; j <= objLinhas.NumItens; j++)
                    {
                        var objLinha = objLinhas.get_Edita(j);
                        var artigo = objLinha.get_Artigo();
                        if (artigo == dto.IdArtigo)
                        {
                            //artigo a eliminar
                            objLinhas.Remove(objLinha.get_Linha());
                            break;
                        }
                    }
                    
                    //update proposta
                    objProp.set_Linhas(objLinhas);
                    PriEngine.Engine.CRM.PropostasOPV.Actualiza(objProp);

                    erro.Erro = 0;
                    erro.Descricao = "Success";
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

        public static RespostaErro AdicionaProduto(OportunidadeDTO dto)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEPropostaOPV objProp = new CrmBEPropostaOPV();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    //oportunidade
                    if (!PriEngine.Engine.CRM.OportunidadesVenda.ExisteID(dto.IdOportunidade))
                    {
                        erro.Erro = 1;
                        erro.Descricao = "Nao existe oportunidade";
                        return erro;
                    }
                    //proposta
                    objProp = PriEngine.Engine.CRM.PropostasOPV.Edita(dto.IdOportunidade, dto.NumProposta, true);
                    objProp.set_EmModoEdicao(true);

                    //vai buscar os artigos desta proposta
                    CrmBELinhasPropostaOPV objLinhas = objProp.get_Linhas();
                   
                    //nova linha a ser criada
                    CrmBELinhaPropostaOPV objLinha = new CrmBELinhaPropostaOPV();

                    //artigo que vamos adicionar
                    GcpBEArtigo objArtigo = PriEngine.Engine.Comercial.Artigos.Edita(dto.IdArtigo);

                    objLinha.set_IdOportunidade(dto.IdOportunidade);
                    objLinha.set_NumProposta(dto.NumProposta);
                    objLinha.set_Artigo(dto.IdArtigo);
                    short n = objLinhas.NumItens;
                    n++;
                    objLinha.set_Linha(n);
                    objLinha.set_Descricao(objArtigo.get_Descricao());
                    objLinha.set_Quantidade(1);
                    objLinha.set_Unidade(objArtigo.get_UnidadeVenda());
                    objLinha.set_PrecoCusto(objArtigo.get_PCMedio());
                    objLinha.set_Desconto(objArtigo.get_Desconto());
     
                    var objArtigoPreco = PriEngine.Engine.Comercial.ArtigosPrecos.Edita(dto.IdArtigo, "EUR", objArtigo.get_UnidadeVenda());
                    objLinha.set_PrecoVenda(objArtigoPreco.get_PVP1());
                   
                    //update proposta
                    objLinhas.Insere(objLinha);
                    objProp.set_Linhas(objLinhas);
                    PriEngine.Engine.CRM.PropostasOPV.Actualiza(objProp);

                    erro.Erro = 0;
                    erro.Descricao = "Success";
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

        //so faz update das quantidades
        public static RespostaErro UpdOportunidade(PropostaDTO proposta)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            CrmBEPropostaOPV objProp = new CrmBEPropostaOPV();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    //oportunidade
                    if (!PriEngine.Engine.CRM.OportunidadesVenda.ExisteID(proposta.IdOportunidade))
                    {
                        erro.Erro = 1;
                        erro.Descricao = "Nao existe oportunidade";
                        return erro;
                    }
                    //proposta
                    objProp = PriEngine.Engine.CRM.PropostasOPV.Edita(proposta.IdOportunidade, proposta.Proposta.NumProposta, true);
                    objProp.set_EmModoEdicao(true);

                    //vai buscar os artigos desta proposta
                    CrmBELinhasPropostaOPV objLinhas = objProp.get_Linhas();
                    List<OportunidadeLinha> artigos = proposta.Proposta.Artigos;
                    foreach (var art in artigos)
                    {
                        short n = art.Linha;
                        n--;
                        var objLinha = objLinhas.get_Edita(n);
                        objLinha.set_Quantidade(art.Quantidade);
                    }
                   
                    //update
                    objProp.set_Linhas(objLinhas);
                    PriEngine.Engine.CRM.PropostasOPV.Actualiza(objProp);

                    erro.Erro = 0;
                    erro.Descricao = "Success";
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

        public static RespostaErro PerderOportunidade(Oportunidade oportunidade)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            
            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    //oportunidade
                    if (!PriEngine.Engine.CRM.OportunidadesVenda.ExisteID(oportunidade.ID))
                    {
                        erro.Erro = 1;
                        erro.Descricao = "Nao existe oportunidade";
                        return erro;
                    }
                    CrmBEOportunidadeVenda objOport = PriEngine.Engine.CRM.OportunidadesVenda.EditaID(oportunidade.ID);
                    objOport.set_EstadoVenda(2);
                    PriEngine.Engine.CRM.OportunidadesVenda.Actualiza(objOport);

                    erro.Erro = 0;
                    erro.Descricao = "Success";
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
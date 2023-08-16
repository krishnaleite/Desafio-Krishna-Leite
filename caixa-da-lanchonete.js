class CaixaDaLanchonete {

  constructor() {
    this.cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (Extra para Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        chantilly: { descricao: 'Chantilly (Extra para Café)', valor: 1.50 },
        suco: { descricao: 'Suco', valor: 6.20 },
        combo01: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo02: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
      };
  
    this.metodoDePagamento = ['credito','dinheiro','debito'];
    }

  exibeCardapio() {
  console.log('Olá, seja bem-vindo a lanchonete da BD!')
      console.log(' *Cardápio* ');

        for (const pedido in this.cardapio) {   
          const item = this.cardapio[pedido];
          console.log(`${pedido}: ${item.descricao} - R$ ${item.valor.toFixed(2)}`);
        }
    }

recebePedido() {
  //para a entrada de respostas
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const itens = [];
  const self = this;


  function solicitaPedido() {
    self.exibeCardapio();
  //entrada de respostas
    rl.question('Insira o item que seja ou "fim" para finalizar o seu pedido): ', (pedido) => {
      if (pedido === 'fim') {
        rl.close();
        self.finalizaPedido(itens);
      }

      else if (self.cardapio[pedido]) {
        rl.question(`Quantidade de ${self.cardapio[pedido].descricao}: `, (quantidade) => {
          itens.push(`${pedido},${quantidade}`);
          solicitaPedido();
        });
      }
      
      else {
        //Caso a pessoa escreva errado
        console.log('O item solicitado é inválido. Por favor, tente novamente.');
        solicitaPedido();
      }
    })
  }
    }

  finalizaPedido(itens){
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
      });
      
    this.exibeCardapio();
    rl.question('Escolha sua forma de pagamento:(dinheiro, debito, credito)', (formaDePagamento) => {
      const valorTotal = this.calcularValorDaCompra(formaDePagamento, itens);
      console.log(`Valor total do seu pedido: : ${valorTotal}`);
      rl.close();
      });
    }

    // Validação do método de pagamento
calcularValorDaCompra(metodoDePagamento, itens){
  if (!this.metodoDePagamento.includes(metodoDePagamento)) {
    return 'A forma de pagamento escolhida é inválida.';
  }
    
  if (itens.length === 0) {
    return 'Não há pedidos no seu carrinho.';
  }
  

  // Validação dos principais e extras
  let combos = false; 
  let valorTotal = 0;
  let principais = false;

  for (const itStr of itens) {
    const [pedido, quantidade] = itStr.split(',');
    const item = this.cardapio[pedido];
    if (!item) {
      return 'Item inválido!';
    }

    //começa com combo
    if (pedido.startsWith('combo')) {
      combos = true; 
    }
    else {
      valorTotal += item.valor * quantidade;
    }
  
    //verifica se são pedidos principais
    if ( pedido !== 'queijo' && pedido !== 'chantilly'){
      principais = true;
      } 
    else if (!principais) {
      return 'Item extra não pode ser pedido sem o item principal';
    }
    if (!principais && !combos) {
      return 'Não há itens principais no carrinho de compra';
    }

     // Aplicação de desconto ou acréscimo
    if (metodoDePagamento === 'dinheiro') {
      valorTotal *= 0.95; 
    }
    else if (metodoDePagamento === 'credito') {
      valorTotal *= 1.03; 
    }
  }

  // Retorna o valor total
    return ` O valor total será de: R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }
  }

export { CaixaDaLanchonete };

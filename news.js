//importa o modulo file system do node.js para trabalhar com arquivos (seja qual for)
var fs = requir('fs');

//define a funçao construtora news, será usada para criar instancias do modelo
function news() {}

//define o metodo getlastnews dentro do prototipo de news que é a função vazia
//este metodo irá buscar as últimas noticias de um arquivo json
news.prototype.getlastnews = function(callback) {

    //usa o metodo readfile do modulo file system para ler o arquivo noticias.json
    //o arquivo esta localizado na pasta 'data' e o conteudo é lido com uma string (padrão UTF-8)
    fs.readfile( './data/noticiasd.json', 'utf8', function(err, result){
        var data = []; //inicializa um array vazio que armazená as noticias selecionadas

        //se não houver erro na leitura (readfile) do arquivo
        if(!err) {

            //converte o conteudo do arquivo json (string) em um objeto javascript
            var obj = JSON.parse(result);

            //determina quantas noticias serão selecionadas
            //se houver mais de 4 noticias, define 'i' como 4 (selecionar as ultimas 5 noticias)
            //caso contrario define 'i' como indice da ultima noticia disponivel
            if (obj.noticias.length >4) {
                var i = 4;
            } else{
                var i = (obj.noticias.legth - 1);
            }

            //itera sobre o array de noticias no objeto 'obj'
            obj.noticias.forEach(function(noticia) {
                //se 'i' for maior ou igual a o, armazena a noticia no array 'data'
                if (i >= 0) {
                    data[i] = noticia; //armazena a noticia no indice 'i'
                    i--; //decrementa 'i' para armazenar as noticias em ordem inversa
                }
            });
        }
        //executa o callback passado para getlastnews, passando os dados (ou erro) como parametro
        callback(err, data);
        });
};

//exporta o modelo 'news' como uma função
//quando invocado, retorna a função construtoranews do inicio do código, liderando a criação de novas instancias do modelo
module.exports = function(){
    return news;
}
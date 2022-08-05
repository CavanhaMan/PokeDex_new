const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


//fazendo acesso assincrono a API (usando await para aguardar a resposta)
const fetchPokemon = async (pokemon) => {
  //https://pokeapi.glitch.me/v1/pokemon/1
    const APIResponse = await fetch(`https://pokeapi.glitch.me/v1/pokemon/${pokemon}`);
  //const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  console.log("____APIResponse:___________________");
  console.log(APIResponse);

    //acessando os dados json da consulta API:
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    
    console.log("____DATA:__________________________");
    console.log(data);
    console.log("Número do pokemon: "+data['0']['number']);
    console.log("Nome do pokemon: "+data['0']['name']);
    console.log("Numero do pokemon: "+data['0']['number']);
    console.log("Tipo do pokemon: "+ data['0']['types']);
    console.log("Tipo do pokemon: "+ data['0']['species']);
    console.log("Habilidade normal: "+ data['0']['abilities']['normal']);
    console.log("Habilidade oculta: "+ data['0']['abilities']['hidden']);
    console.log("Gênero: "+ data['0']['gender']);
    console.log("Altura: "+ data['0']['height']);
    console.log("Peso: "+ data['0']['weight']);
    console.log("Evolução: "+ data['0']['family']['evolutionLine']);
    console.log("STARTER: "+ data['0']['starter']);

    return data;
  }
}

//fetchPokemon('25');

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Pesquisando...';
    pokemonNumber.innerHTML = '';
  
    const data = await fetchPokemon(pokemon);
  
    if (data) {
      pokemonImage.style.display = 'block';
      pokemonName.innerHTML = data['0']['name'];
      pokemonNumber.innerHTML = data['0']['number'];
      pokemonImage.src = "https://cdn.traction.one/pokedex/pokemon/"+ data['0']['number'] + ".png";

      input.value = '';
      searchPokemon = data['0']['number'];
     } else {
      //pokemonImage.style.display = 'none';
      pokemonImage.src = './img/erro.png';
      pokemonName.innerHTML = 'Não encontrado!';
      pokemonNumber.innerHTML = 'xxx';
    }
  }
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });
  
  buttonPrev.addEventListener('click', () => {
    searchPokemon -= 1;
    console.log(searchPokemon);
    if (searchPokemon < 1){
      searchPokemon = 898;
    }
    renderPokemon(searchPokemon);
  });
  
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    console.log(searchPokemon);
    if (searchPokemon > 898) {//acima de 898 não tem nada
      searchPokemon = 1; 
    }
    renderPokemon(searchPokemon);
  });

  renderPokemon('1'); //inicia o pokedex com o primeiro pokemon
  //renderPokemon('charizard');


/*
ACRESCENTANDO LEITURA DAS SETAS DO TECLADO:
seta da esquerda	37	ArrowLeft	ArrowLeft	
seta da direita	39	ArrowRight	ArrowRight  
*/
var btp = document.getElementById("btnprev");
var btn = document.getElementById("btnnext");

//AO PRESSIONAR A SETA, EFETUA O CLIQUE E MUDA APARENCIA
document.onkeydown = pressiona;
function pressiona(e) {
    e = e || window.event;
    if (e.keyCode == '37') {  // <--
      console.log("<-");
      document.getElementById("btnprev").click();
      btp.classList.toggle("clicado");
    }
    else if (e.keyCode == '39') {  //-->
      console.log("->");
      document.getElementById("btnnext").click();
      btn.classList.toggle("clicado");
    }
}
//AO SOLTAR A SETA, VOLTA A APARENCIA
document.onkeyup = solta;
function solta(e) {
  e = e || window.event;
  if (e.keyCode == '37') {  // <--
    console.log("<-");
    btp.classList.toggle("clicado");
  }
  else if (e.keyCode == '39') {  //-->
    console.log("->");
    btn.classList.toggle("clicado");
  }
}

// ACOES DO BOTÃO LIGA/DESLIGA
var estado = 0;
$('#btpower').click(function(){
  console.log("CLICADO");
  if (estado == 0){
    $(this).attr("src", './img/bt_ligado.png');
    estado = 1;
  }
  else if(estado == 1){
    $(this).attr("src", './img/bt_desligar.png');
    estado = 2;
  }
  else if(estado == 2){
    $(this).attr("src", './img/bt_desligado.png');
    estado = 0;
  }

});
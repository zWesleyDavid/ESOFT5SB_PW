function changePageTitle(title) {
  document.title = title;
}

// Função para obter a data formatada
function getFormattedDate() {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formatter = new Intl.DateTimeFormat('pt-BR', options);
  return formatter.format(new Date());
}

// Função para atualizar o contador de visitas e a última visita
function updateVisitInfo() {
  let visitas = localStorage.getItem("visitas");
  let contador;
  let ultimaVisita;

  if (!visitas) {
    contador = 0;
    ultimaVisita = getFormattedDate();
  } else {
    const visitasObj = JSON.parse(visitas);
    contador = visitasObj.count;
    ultimaVisita = visitasObj.lastVisit;
  }

  contador++;
  ultimaVisita = getFormattedDate();
  localStorage.setItem("visitas", JSON.stringify({ count: contador, lastVisit: ultimaVisita }));

  const footerParagraph = document.createElement('p');
  footerParagraph.textContent = `Esta página foi visitada ${contador} vezes. A última visita foi: ${ultimaVisita}`;
  document.querySelector('footer').appendChild(footerParagraph);
}

// Função para gerar a seção de informações do Pokémon
function generateInfoSection(sprites, pokemonName) {
  const h2 = document.createElement('h2');
  h2.textContent = `Informações sobre ${pokemonName}`;

  const img = document.createElement('img');
  img.alt = `Imagem do pokemon ${pokemonName}`;

  const section = document.getElementById('info-pokemon');
  section.innerHTML = ''; // Limpa o conteúdo existente

  section.appendChild(h2);

  if (sprites.length > 0) {
    let currentIndex = 0;
    img.src = sprites[currentIndex];

    // Adiciona evento de clique para trocar de imagem
    img.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % sprites.length;
      img.src = sprites[currentIndex];
    });

    section.appendChild(img);
  } else {
    const p = document.createElement('p');
    p.textContent = 'Imagens não disponíveis';
    section.appendChild(p);
  }
}

async function getPokemonData(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const jsonData = await data.json();

    // Transforma o objeto sprites em um array de links
    const spritesArray = Object.values(jsonData.sprites)
      .filter(sprite => typeof sprite === 'string');

    generateInfoSection(spritesArray, name);
  } catch (error) {
    console.error(error);
  }
}

function getSearchParams() {
  if (!location.search) {
    return;
  }

  const urlSearchParams = new URLSearchParams(location.search);
  const pokemonName = urlSearchParams.get('name');

  changePageTitle(`Página do ${pokemonName}`);
  getPokemonData(pokemonName);
  updateVisitInfo(); // Atualiza as informações de visita ao carregar a página
}

document.addEventListener('DOMContentLoaded', getSearchParams);

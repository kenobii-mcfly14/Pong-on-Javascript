//variaveis da bolinha 
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raio = diametro / 2;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteLargura = 8;
let raqueteAltura = 90;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;
let dOponenteBolinha = 0;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload()
{
  trilha = loadSound("trilha2.mp3")
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}



function setup() 
{
  createCanvas(600,400);
  trilha.loop();
}

function draw() 
{
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();  
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,             yRaqueteOponente);
  incluiPlacar ();
  marcaPonto();
}


function mostraBolinha ()
{
  circle (xBolinha, yBolinha, diametro);  
}

function movimentaBolinha ()
{
 xBolinha += velocidadeXBolinha;
 yBolinha += velocidadeYBolinha;
}

function colisaoBorda ()
{
 if (xBolinha + raio> width || 
   xBolinha - raio < 0)
 {
  velocidadeXBolinha *= -1;
 }  
 if (yBolinha + raio > height || 
   yBolinha - raio < 0)
 {
  velocidadeYBolinha *= -1;  
 }
}

function mostraRaquete (x, y)
{
  rect(x, y, raqueteLargura, raqueteAltura);
}

function mostraRaqueteOponente ()
{
  rect(xRaqueteOponente, yRaqueteOponente, raqueteLargura, raqueteAltura);
}

function movimentoRaquete ()
{
 if (keyIsDown(UP_ARROW))
 {
  yRaquete -= 10;
 }
 if (keyIsDown(DOWN_ARROW))
 {
  yRaquete += 10;
 }  
}

function verificaColisaoRaquete (x, y) 
{
  colidiu = 
  collideRectCircle(x, y, raqueteLargura, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) 
  {
  velocidadeXBolinha *= -1; 
  raquetada.play();
  }
}
function verificaColisaoRaquete (x, y) 
{
  colidiu = 
  collideRectCircle(x,y,raqueteLargura,raqueteAltura,   xBolinha, yBolinha,raio);
  if (colidiu) 
  {
  velocidadeXBolinha *= -1;
  raquetada.play();
  }
}


function movimentaRaqueteOponente ()
{
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteLargura / 2 - 30;
  yRaqueteOponente += velocidadeYOponente - dOponenteBolinha;
  
  if(pontosOponente > meusPontos)
  {
    dOponenteBolinha = 70;
  }
  if(pontosOponente < meusPontos && dOponenteBolinha > 50)
  {
    dOponenteBolinha -= 1;
  }
  }

function incluiPlacar ()
{
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(100,149,237));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(100,149,237));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto ()
{
  if (xBolinha > 590)
  {
  meusPontos += 1;
  ponto.play();
  } 
  if (xBolinha < 10)
  {
  pontosOponente += 1;
  ponto.play();
  }
    
}
var myCards = document.getElementById('container');
var resultsArray = [];
var counter = 0;
var text = document.getElementById('text');
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval ;
var images = [
 'butterfly', 'coackroach', 'ant', 'fly', 'spider', 'worm','coackroach','coackroach'
];
var clone = images.slice(0); 
var cards = images.concat(clone);

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
  return o;
}
shuffle(cards);

for (var i = 0; i < cards.length; i++) {
	
		card = document.createElement('div');
		card.dataset.item = cards[i];
		card.dataset.view = "card";
		myCards.appendChild(card);
	
  
  
  card.onclick = function () {
   
    if (this.className != 'flipped' && this.className != 'correct'){
        this.className = 'flipped';
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
  
    if (resultsArray.length > 1) {

      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter ++;
        resultsArray = [];
		win();
      } else {
        check("reverse");
        resultsArray = [];
      }
      
    }
    
  }
   
};


var check = function(className) {
  
  var x = document.getElementsByClassName("flipped");
  setTimeout(function() {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }
     
  },500);
   
}
$('.b-close').on('click',function(){
	location.reload();
});
var win = function () {
	
	
  if(counter === 8) {
    clearInterval(Interval);
    text.innerHTML = "Your time was " + seconds + ":" + tens;
	if(seconds>60 && tens>00){
		alert('Sorry You Lost the Game, you took more than a second');
		setTimeout(function(){
			location.reload();
		},5000);
	}
	else{
		document.getElementById("confetti").style.display="block";
		$('#element_to_pop_up').bPopup();
		setTimeout(function(){
		location.reload();
	},5000);
	}
	
  } 
  
}
     
function startTimer () {
  tens++; 
    
  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
  }
    
  if (tens > 9){
    appendTens.innerHTML = tens;
      
  } 
    
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
    
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }
  
}

/*****************************************/
/***  Animation after Winning Game   ***/
/***************************************/

var retina = window.devicePixelRatio,

				// Math shorthands
				PI = Math.PI,
				sqrt = Math.sqrt,
				round = Math.round,
				random = Math.random,
				cos = Math.cos,
				sin = Math.sin,

				rAF = window.requestAnimationFrame,
				cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;

			(function (w) { 
				/**
				* Fallback implementation.
				*/
				var prev = new Date().getTime();
				function fallback(fn) {
					var curr = _now();
					var ms = Math.max(0, 16 - (curr - prev));
					var req = setTimeout(fn, ms);
					prev = curr;
					return req;
				}

				/**
				* Cancel.
				*/
				var cancel = w.cancelAnimationFrame
					|| w.webkitCancelAnimationFrame
					|| w.clearTimeout;

				rAF = w.requestAnimationFrame
					|| w.webkitRequestAnimationFrame
					|| fallback;

				cAF = function(id){
					cancel.call(w, id);
				};
			}(window));

			document.addEventListener("DOMContentLoaded", function() {
				var speed = 50,
					duration = (1.0 / speed),
					confettiRibbonCount = 11,
					ribbonPaperCount = 30,
					ribbonPaperDist = 8.0,
					ribbonPaperThick = 8.0,
					confettiPaperCount = 95,
					DEG_TO_RAD = PI / 180,
					RAD_TO_DEG = 180 / PI,
					colors = [
						["#df0049", "#660671"],
						["#00e857", "#005291"],
						["#2bebbc", "#05798a"],
						["#ffd200", "#b06c00"]
					];

				function Vector2(_x, _y) {
					this.x = _x, this.y = _y;
					this.Length = function() {
						return sqrt(this.SqrLength());
					}
					this.SqrLength = function() {
						return this.x * this.x + this.y * this.y;
					}
					this.Add = function(_vec) {
						this.x += _vec.x;
						this.y += _vec.y;
					}
					this.Sub = function(_vec) {
						this.x -= _vec.x;
						this.y -= _vec.y;
					}
					this.Div = function(_f) {
						this.x /= _f;
						this.y /= _f;
					}
					this.Mul = function(_f) {
						this.x *= _f;
						this.y *= _f;
					}
					this.Normalize = function() {
						var sqrLen = this.SqrLength();
						if (sqrLen != 0) {
							var factor = 1.0 / sqrt(sqrLen);
							this.x *= factor;
							this.y *= factor;
						}
					}
					this.Normalized = function() {
						var sqrLen = this.SqrLength();
						if (sqrLen != 0) {
							var factor = 1.0 / sqrt(sqrLen);
							return new Vector2(this.x * factor, this.y * factor);
						}
						return new Vector2(0, 0);
					}
				}
				Vector2.Lerp = function(_vec0, _vec1, _t) {
					return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x, (_vec1.y - _vec0.y) * _t + _vec0.y);
				}
				Vector2.Distance = function(_vec0, _vec1) {
					return sqrt(Vector2.SqrDistance(_vec0, _vec1));
				}
				Vector2.SqrDistance = function(_vec0, _vec1) {
					var x = _vec0.x - _vec1.x;
					var y = _vec0.y - _vec1.y;
					return (x * x + y * y + z * z);
				}
				Vector2.Scale = function(_vec0, _vec1) {
					return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
				}
				Vector2.Min = function(_vec0, _vec1) {
					return new Vector2(Math.min(_vec0.x, _vec1.x), Math.min(_vec0.y, _vec1.y));
				}
				Vector2.Max = function(_vec0, _vec1) {
					return new Vector2(Math.max(_vec0.x, _vec1.x), Math.max(_vec0.y, _vec1.y));
				}
				Vector2.ClampMagnitude = function(_vec0, _len) {
					var vecNorm = _vec0.Normalized;
					return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
				}
				Vector2.Sub = function(_vec0, _vec1) {
					return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y, _vec0.z - _vec1.z);
				}

				function EulerMass(_x, _y, _mass, _drag) {
					this.position = new Vector2(_x, _y);
					this.mass = _mass;
					this.drag = _drag;
					this.force = new Vector2(0, 0);
					this.velocity = new Vector2(0, 0);
					this.AddForce = function(_f) {
						this.force.Add(_f);
					}
					this.Integrate = function(_dt) {
						var acc = this.CurrentForce(this.position);
						acc.Div(this.mass);
						var posDelta = new Vector2(this.velocity.x, this.velocity.y);
						posDelta.Mul(_dt);
						this.position.Add(posDelta);
						acc.Mul(_dt);
						this.velocity.Add(acc);
						this.force = new Vector2(0, 0);
					}
					this.CurrentForce = function(_pos, _vel) {
						var totalForce = new Vector2(this.force.x, this.force.y);
						var speed = this.velocity.Length();
						var dragVel = new Vector2(this.velocity.x, this.velocity.y);
						dragVel.Mul(this.drag * this.mass * speed);
						totalForce.Sub(dragVel);
						return totalForce;
					}
				}

				function ConfettiPaper(_x, _y) {
					this.pos = new Vector2(_x, _y);
					this.rotationSpeed = (random() * 600 + 800);
					this.angle = DEG_TO_RAD * random() * 360;
					this.rotation = DEG_TO_RAD * random() * 360;
					this.cosA = 1.0;
					this.size = 5.0;
					this.oscillationSpeed = (random() * 1.5 + 0.5);
					this.xSpeed = 40.0;
					this.ySpeed = (random() * 60 + 50.0);
					this.corners = new Array();
					this.time = random();
					var ci = round(random() * (colors.length - 1));
					this.frontColor = colors[ci][0];
					this.backColor = colors[ci][1];
					for (var i = 0; i < 4; i++) {
						var dx = cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
						var dy = sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
						this.corners[i] = new Vector2(dx, dy);
					}
					this.Update = function(_dt) {
						this.time += _dt;
						this.rotation += this.rotationSpeed * _dt;
						this.cosA = cos(DEG_TO_RAD * this.rotation);
						this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt
						this.pos.y += this.ySpeed * _dt;
						if (this.pos.y > ConfettiPaper.bounds.y) {
							this.pos.x = random() * ConfettiPaper.bounds.x;
							this.pos.y = 0;
						}
					}
					this.Draw = function(_g) {
						if (this.cosA > 0) {
							_g.fillStyle = this.frontColor;
						} else {
							_g.fillStyle = this.backColor;
						}
						_g.beginPath();
						_g.moveTo((this.pos.x + this.corners[0].x * this.size) * retina, (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina);
						for (var i = 1; i < 4; i++) {
							_g.lineTo((this.pos.x + this.corners[i].x * this.size) * retina, (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina);
						}
						_g.closePath();
						_g.fill();
					}
				}
				ConfettiPaper.bounds = new Vector2(0, 0);

				function ConfettiRibbon(_x, _y, _count, _dist, _thickness, _angle, _mass, _drag) {
					this.particleDist = _dist;
					this.particleCount = _count;
					this.particleMass = _mass;
					this.particleDrag = _drag;
					this.particles = new Array();
					var ci = round(random() * (colors.length - 1));
					this.frontColor = colors[ci][0];
					this.backColor = colors[ci][1];
					this.xOff = (cos(DEG_TO_RAD * _angle) * _thickness);
					this.yOff = (sin(DEG_TO_RAD * _angle) * _thickness);
					this.position = new Vector2(_x, _y);
					this.prevPosition = new Vector2(_x, _y);
					this.velocityInherit = (random() * 2 + 4);
					this.time = random() * 100;
					this.oscillationSpeed = (random() * 2 + 2);
					this.oscillationDistance = (random() * 40 + 40);
					this.ySpeed = (random() * 40 + 80);
					for (var i = 0; i < this.particleCount; i++) {
						this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
					}
					this.Update = function(_dt) {
						var i = 0;
						this.time += _dt * this.oscillationSpeed;
						this.position.y += this.ySpeed * _dt;
						this.position.x += cos(this.time) * this.oscillationDistance * _dt;
						this.particles[0].position = this.position;
						var dX = this.prevPosition.x - this.position.x;
						var dY = this.prevPosition.y - this.position.y;
						var delta = sqrt(dX * dX + dY * dY);
						this.prevPosition = new Vector2(this.position.x, this.position.y);
						for (i = 1; i < this.particleCount; i++) {
							var dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
							dirP.Normalize();
							dirP.Mul((delta / _dt) * this.velocityInherit);
							this.particles[i].AddForce(dirP);
						}
						for (i = 1; i < this.particleCount; i++) {
							this.particles[i].Integrate(_dt);
						}
						for (i = 1; i < this.particleCount; i++) {
							var rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
							rp2.Sub(this.particles[i - 1].position);
							rp2.Normalize();
							rp2.Mul(this.particleDist);
							rp2.Add(this.particles[i - 1].position);
							this.particles[i].position = rp2;
						}
						if (this.position.y > ConfettiRibbon.bounds.y + this.particleDist * this.particleCount) {
							this.Reset();
						}
					}
					this.Reset = function() {
						this.position.y = -random() * ConfettiRibbon.bounds.y;
						this.position.x = random() * ConfettiRibbon.bounds.x;
						this.prevPosition = new Vector2(this.position.x, this.position.y);
						this.velocityInherit = random() * 2 + 4;
						this.time = random() * 100;
						this.oscillationSpeed = random() * 2.0 + 1.5;
						this.oscillationDistance = (random() * 40 + 40);
						this.ySpeed = random() * 40 + 80;
						var ci = round(random() * (colors.length - 1));
						this.frontColor = colors[ci][0];
						this.backColor = colors[ci][1];
						this.particles = new Array();
						for (var i = 0; i < this.particleCount; i++) {
							this.particles[i] = new EulerMass(this.position.x, this.position.y - i * this.particleDist, this.particleMass, this.particleDrag);
						}
					}
					this.Draw = function(_g) {
						for (var i = 0; i < this.particleCount - 1; i++) {
							var p0 = new Vector2(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
							var p1 = new Vector2(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);
							if (this.Side(this.particles[i].position.x, this.particles[i].position.y, this.particles[i + 1].position.x, this.particles[i + 1].position.y, p1.x, p1.y) < 0) {
								_g.fillStyle = this.frontColor;
								_g.strokeStyle = this.frontColor;
							} else {
								_g.fillStyle = this.backColor;
								_g.strokeStyle = this.backColor;
							}
							if (i == 0) {
								_g.beginPath();
								_g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
								_g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
								_g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
								_g.closePath();
								_g.stroke();
								_g.fill();
								_g.beginPath();
								_g.moveTo(p1.x * retina, p1.y * retina);
								_g.lineTo(p0.x * retina, p0.y * retina);
								_g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
								_g.closePath();
								_g.stroke();
								_g.fill();
							} else if (i == this.particleCount - 2) {
								_g.beginPath();
								_g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
								_g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
								_g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
								_g.closePath();
								_g.stroke();
								_g.fill();
								_g.beginPath();
								_g.moveTo(p1.x * retina, p1.y * retina);
								_g.lineTo(p0.x * retina, p0.y * retina);
								_g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
								_g.closePath();
								_g.stroke();
								_g.fill();
							} else {
								_g.beginPath();
								_g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
								_g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
								_g.lineTo(p1.x * retina, p1.y * retina);
								_g.lineTo(p0.x * retina, p0.y * retina);
								_g.closePath();
								_g.stroke();
								_g.fill();
							}
						}
					}
					this.Side = function(x1, y1, x2, y2, x3, y3) {
						return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
					}
				}
				ConfettiRibbon.bounds = new Vector2(0, 0);
				confetti = {};
				confetti.Context = function(id) {
					var i = 0;
					var canvas = document.getElementById(id);
					var canvasParent = canvas.parentNode;
					var canvasWidth = canvasParent.offsetWidth;
					var canvasHeight = canvasParent.offsetHeight;
					canvas.width = canvasWidth * retina;
					canvas.height = canvasHeight * retina;
					var context = canvas.getContext('2d');
					var interval = null;
					var confettiRibbons = new Array();
					ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
					for (i = 0; i < confettiRibbonCount; i++) {
						confettiRibbons[i] = new ConfettiRibbon(random() * canvasWidth, -random() * canvasHeight * 2, ribbonPaperCount, ribbonPaperDist, ribbonPaperThick, 45, 1, 0.05);
					}
					var confettiPapers = new Array();
					ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
					for (i = 0; i < confettiPaperCount; i++) {
						confettiPapers[i] = new ConfettiPaper(random() * canvasWidth, random() * canvasHeight);
					}
					this.resize = function() {
						canvasWidth = canvasParent.offsetWidth;
						canvasHeight = canvasParent.offsetHeight;
						canvas.width = canvasWidth * retina;
						canvas.height = canvasHeight * retina;
						ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
						ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
					}
					this.start = function() {
						this.stop()
						var context = this;
						this.update();
					}
					this.stop = function() {
						cAF(this.interval);
					}
					this.update = function() {
						var i = 0;
						context.clearRect(0, 0, canvas.width, canvas.height);
						for (i = 0; i < confettiPaperCount; i++) {
							confettiPapers[i].Update(duration);
							confettiPapers[i].Draw(context);
						}
						for (i = 0; i < confettiRibbonCount; i++) {
							confettiRibbons[i].Update(duration);
							confettiRibbons[i].Draw(context);
						}
						this.interval = rAF(function() {
							confetti.update();
						});
					}
				}
				var confetti = new confetti.Context('confetti');
				confetti.start();
				window.addEventListener('resize', function(event){
					confetti.resize();
				});
			});

			
/*****************************************/
/***  Pop up plugin   ***/
/***************************************/		

 (function(b){b.fn.bPopup=function(z,F){function K(){a.contentContainer=b(a.contentContainer||c);switch(a.content){case "iframe":var h=b('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");h.appendTo(a.contentContainer);r=c.outerHeight(!0);s=c.outerWidth(!0);A();h.attr("src",a.loadUrl);k(a.loadCallback);break;case "image":A();b("<img />").load(function(){k(a.loadCallback);G(b(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:A(),b('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(){k(a.loadCallback);G(b(this))}).hide().appendTo(a.contentContainer)}}function A(){a.modal&&b('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+t}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);D();c.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?g.scrollLeft()+u:-1*(v+s):l(!(!a.follow[0]&&m||f)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?g.scrollTop()+w:x+-1*r:n(!(!a.follow[1]&&p||f)),"z-index":a.zIndex+t+1}).each(function(){a.appending&&b(this).appendTo(a.appendTo)});H(!0)}function q(){a.modal&&b(".b-modal."+c.data("id")).fadeTo(a.speed,0,function(){b(this).remove()});a.scrollBar||b("html").css("overflow","auto");b(".b-modal."+e).unbind("click");g.unbind("keydown."+e);d.unbind("."+e).data("bPopup",0<d.data("bPopup")-1?d.data("bPopup")-1:null);c.undelegate(".bClose, ."+a.closeClass,"click."+e,q).data("bPopup",null);H();return!1}function G(h){var b=h.width(),e=h.height(),d={};a.contentContainer.css({height:e,width:b});e>=c.height()&&(d.height=c.height());b>=c.width()&&(d.width=c.width());r=c.outerHeight(!0);s=c.outerWidth(!0);D();a.contentContainer.css({height:"auto",width:"auto"});d.left=l(!(!a.follow[0]&&m||f));d.top=n(!(!a.follow[1]&&p||f));c.animate(d,250,function(){h.show();B=E()})}function L(){d.data("bPopup",t);c.delegate(".bClose, ."+a.closeClass,"click."+e,q);a.modalClose&&b(".b-modal."+e).css("cursor","pointer").bind("click",q);M||!a.follow[0]&&!a.follow[1]||d.bind("scroll."+e,function(){B&&c.dequeue().animate({left:a.follow[0]?l(!f):"auto",top:a.follow[1]?n(!f):"auto"},a.followSpeed,a.followEasing)}).bind("resize."+e,function(){w=y.innerHeight||d.height();u=y.innerWidth||d.width();if(B=E())clearTimeout(I),I=setTimeout(function(){D();c.dequeue().each(function(){f?b(this).css({left:v,top:x}):b(this).animate({left:a.follow[0]?l(!0):"auto",top:a.follow[1]?n(!0):"auto"},a.followSpeed,a.followEasing)})},50)});a.escClose&&g.bind("keydown."+e,function(a){27==a.which&&q()})}function H(b){function d(e){c.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){J(b)})}switch(b?a.transition:a.transitionClose||a.transition){case "slideIn":d({left:b?l(!(!a.follow[0]&&m||f)):g.scrollLeft()-(s||c.outerWidth(!0))-C});break;case "slideBack":d({left:b?l(!(!a.follow[0]&&m||f)):g.scrollLeft()+u+C});break;case "slideDown":d({top:b?n(!(!a.follow[1]&&p||f)):g.scrollTop()-(r||c.outerHeight(!0))-C});break;case "slideUp":d({top:b?n(!(!a.follow[1]&&p||f)):g.scrollTop()+w+C});break;default:c.stop().fadeTo(a.speed,b?1:0,function(){J(b)})}}function J(b){b?(L(),k(F),a.autoClose&&setTimeout(q,a.autoClose)):(c.hide(),k(a.onClose),a.loadUrl&&(a.contentContainer.empty(),c.css({height:"auto",width:"auto"})))}function l(a){return a?v+g.scrollLeft():v}function n(a){return a?x+g.scrollTop():x}function k(a){b.isFunction(a)&&a.call(c)}function D(){x=p?a.position[1]:Math.max(0,(w-c.outerHeight(!0))/2-a.amsl);v=m?a.position[0]:(u-c.outerWidth(!0))/2;B=E()}function E(){return w>c.outerHeight(!0)&&u>c.outerWidth(!0)}b.isFunction(z)&&(F=z,z=null);var a=b.extend({},b.fn.bPopup.defaults,z);a.scrollBar||b("html").css("overflow","hidden");var c=this,g=b(document),y=window,d=b(y),w=y.innerHeight||d.height(),u=y.innerWidth||d.width(),M=/OS 6(_\d)+/i.test(navigator.userAgent),C=200,t=0,e,B,p,m,f,x,v,r,s,I;c.close=function(){a=this.data("bPopup");e="__b-popup"+d.data("bPopup")+"__";q()};return c.each(function(){b(this).data("bPopup")||(k(a.onOpen),t=(d.data("bPopup")||0)+1,e="__b-popup"+t+"__",p="auto"!==a.position[1],m="auto"!==a.position[0],f="fixed"===a.positionStyle,r=c.outerHeight(!0),s=c.outerWidth(!0),a.loadUrl?K():A())})};b.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:0.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);

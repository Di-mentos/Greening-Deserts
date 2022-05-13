var letter = document.getElementsByClassName("screen__letter"); //current
var title = document.getElementsByClassName("screen__title")[0]; //container
var forest = document.getElementsByClassName("screen__forest")[0];
var desert = document.getElementsByClassName("screen__desert")[0];

var content = document.getElementsByClassName("page__content content")[0];
var content2 = document.getElementsByClassName("page__content-2 content-2")[0];

var header = document.getElementsByClassName("header")[0];
var footer = document.getElementsByClassName("footer")[0];

var str = "";
var mas = [];
var custom = "letter";

var k = 0; //letters counter
var e = 0;

/*************Разбивка на буквы************/
function letters(str){
	for(var i=0; i<str.length; i++){
		window[custom + i] = document.createElement('span');
		window[custom + i].className = "screen__letter";
		if(str[i] == " "){
			window[custom + (i-1)].innerHTML = str[i-1] + "&nbsp;";
		}
		else{
			window[custom + i].innerHTML = str[i];
			title.append(window[custom + i]);
		}
	}
}


/**************************************/
var time;
function fontOswald(){
	str = "HOW TO TURN THIS";
	letters(str);
	for(var i=0; i<letter.length; i++){
		letter[i].style.fontFamily = "Oswald, sans-serif";
		letter[i].style.color = "#fff";
		letter[i].style.transition = "translateY, .42s ease, opacity .5s ease";
	}
}

function letterAppear(){
	letter[k].style.transform = "translateY(-40px)";
	letter[k].style.opacity = "1";
	k++;
}

function letterDisappear(){
	letter[k].style.transform = "translateY(-140px)";
	letter[k].style.opacity = "0";
	k++;
}

function drawingOswald(){
	time = setInterval(function(){
		if(e == letter.length){
			clearInterval(time);
			e = 0;
			k = 0;
		}
		else if(e < letter.length){
			letterAppear();
			e++;
		}
	}, 150);
}

function removingOswald(){
	setTimeout(function(){
		time = setInterval(function(){
			if(e == letter.length){	
				clearInterval(time);
				e = 0;
				k = 0;
				setTimeout(function(){
					fontBarlow();
					drawingBarlow();
					setTimeout(forestAppear, 500);
				}, 500);
			}
			else if(e < letter.length){
				letterDisappear();
				e++;
			}
		}, 150);
	}, 3600);
}

function fontBarlow(){
	for(var i=0; i<letter.length; ){ 
		letter[i].remove();
	}
	str = "INTO THIS";
	letters(str);
	for(var i=0; i<letter.length; i++){
		letter[i].style.fontFamily = "'Barlow', sans-serif";
		//Белая тень играет роль фона для текста
		//Задание обводки для текста за счет нескольких теней, которые смещены в разные стороны
		letter[i].style.textShadow = "0.25vw -0.25vw 0 #fff, -0.25vw -0.25vw 0 #fff, -0.25vw 0.25vw 0 #fff, 0.25vw 0.25vw 0 #fff";
		letter[i].style.background = "transparent";
		letter[i].style.color = "black"; //Сам текст чёрный
		letter[i].style.mixBlendMode = "screen"; //Смешивание цветов, необходимо выбрать нужный тип
		letter[i].style.fontWeight = "600";
		letter[i].style.fontSize = "9.5vw";
		letter[i].style.opacity = "0";
		letter[i].style.transform = "translateY(-40px) scale(0.35)";
	}	
}

function appearBarlow(){
	letter[k].style.transition = "scale, 0.22s cubic-bezier(0.220, 0.720, 0.435, 1.500), opacity .23s ease";
	letter[k].style.transform = "translateY(-40px) scale(1)";
	letter[k].style.opacity = "1";
	k++;
}

function disappearBarlow(){
	letter[k].style.transform = "translateY(-40px) scale(1.4)";
	letter[k].style.opacity = "0";
	k++;
}

function drawingBarlow(){
	time = setInterval(function(){
		if(e == letter.length){
			clearInterval(time);
			e = 0;
			k = 0;
			removingBarlow();
		}
		else if(e < letter.length){
			appearBarlow();
			e++;
		}
	}, 150);
}

function removingBarlow(){
	setTimeout(function(){
		time = setInterval(function(){
			if(e == letter.length){
				clearInterval(time);
				e = 0;
				k = 0;
				setTimeout(headerAppear, 3000);
			}
			else if(e < letter.length){
				disappearBarlow(); 
				if(e == 3){
					content.style.left = "0";
					content2.style.right = "0";
				}
				e++;
			}
		}, 150);
	}, 2000); //Спустя 2с после вызова removingBarlow срабатывает другая ф-я
}

function forestAppear(){
	forest.style.display = "block";
	forest.play();
	if(window.getComputedStyle(forest).display == "block"){
		forest.style.opacity = "1";
		
		desert.style.opacity = "0";
		desert.pause();
		desert.addEventListener('transitionend', function(){
			desert.style.display = "none";
		})
	}
}

function headerAppear(){
	header.style.top = "3vh";
	footer.style.top = "4.2vh";
}

setTimeout(function(){
	fontOswald();
	drawingOswald();
	removingOswald();
}, 2000);



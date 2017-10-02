/*---------------------------------------------------------------*/
/*-------------------match&closest polyfill----------------------*/
(function() {

  if (!Element.prototype.matches) {

    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

})();

(function() {

  if (!Element.prototype.closest) {

    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();


/*----------------------side-menu--------------------------------*/
var menuIcon = document.getElementsByClassName('menu-icon')[0];
var sideMenu = document.getElementsByClassName('side-menu')[0];
var pageSections = document.querySelectorAll('header, footer, section');
var header = document.getElementsByTagName('header')[0];
var containers = document.getElementsByClassName('container');

var mqr1500 = window.matchMedia('all and (max-width: 1500px)');
var mqr1300 = window.matchMedia('all and (max-width: 1300px)');
var mqr1150 = window.matchMedia('all and (max-width: 1150px)');
var mqr920 = window.matchMedia('all and (max-width: 920px)');
var mqr800 = window.matchMedia('all and (max-width: 800px)');
var mqr710 = window.matchMedia('all and (max-width: 710px)');

menuIcon.addEventListener('click', menuIconClickHandler);

function menuIconClickHandler() {
	if (menuIcon.classList.contains('active')) {
		menuIcon.classList.remove('active');
		sideMenu.classList.remove('active');
		for (var i = 0; i < pageSections.length; i++) {
			pageSections[i].style.paddingLeft = "";
		}
		var interval = setInterval(function() {timelineResizeFix();}, 50);
		setTimeout(function() {clearInterval(interval)}, 1100);
		window.removeEventListener('resize', resizeHandlerForElemsSizeChange);
		resizeHandlerForElemsSizeChange();
		for (var i = 0; i < containers.length; i++) {
			containers[i].style.width = "";
		}
	} else {
		menuIcon.classList.add('active');
		sideMenu.classList.add('active');
		if (!mqr710.matches) {
			for (var i = 0; i < pageSections.length; i++) {
				pageSections[i].style.paddingLeft = 275 + "px";
			}
			var interval = setInterval(function() {timelineResizeFix();}, 50);
			setTimeout(function() {clearInterval(interval)}, 1100);
			window.addEventListener('resize', resizeHandlerForElemsSizeChange);
			resizeHandlerForElemsSizeChange();
		}
	}
};

function headerCompositionPositioning() {
	if (mqr920.matches) {
		document.querySelector('.header-composition').parentElement.classList.remove('offset-md-6');
		document.querySelector('.header-composition').parentElement.classList.add('offset-md-4');
	} else {
		document.querySelector('.header-composition').parentElement.classList.remove('offset-md-4');
		document.querySelector('.header-composition').parentElement.classList.add('offset-md-6');
	}
}

function elemsSizeChange() {
	var portfolioBlocks = document.querySelectorAll('.portfolio-block__content__item__wrapper');
	var aboutMeInfo = document.querySelector('.about-me__info');
	var aboutMeImg = document.querySelector('.about-me__img').parentElement;
	var skills = document.querySelectorAll('.skills-content .skill');
	var contactsForm = document.querySelector('.contacts__form');
	var contactsContactsDetails = document.querySelector('.contacts__contacts-details');

	if (sideMenu.classList.contains('active') && mqr800.matches) {
		contactsForm.classList.remove('col-md-6');
		contactsForm.classList.add('col-md-9');
		contactsContactsDetails.classList.remove('col-md-6');
		contactsContactsDetails.classList.add('col-md-9');
		for (var i = 0; i < skills.length; i++) {
			skills[i].classList.remove('col-md-6');
			skills[i].classList.remove('col-sm-12');
			skills[i].classList.add('col-md-8');
			skills[i].classList.add('col-sm-12');
		}
	} else {
		contactsForm.classList.remove('col-md-9');
		contactsForm.classList.add('col-md-6');
		contactsContactsDetails.classList.remove('col-md-9');
		contactsContactsDetails.classList.add('col-md-6');
		for (var i = 0; i < skills.length; i++) {
			skills[i].classList.remove('col-md-8');
			skills[i].classList.remove('col-sm-12');
			skills[i].classList.add('col-md-6');
			skills[i].classList.add('col-sm-12');
		}
	}

	if (sideMenu.classList.contains('active') && mqr920.matches) {
		aboutMeInfo.classList.remove('col-md-6');
		aboutMeInfo.classList.add('col-md-8');
		aboutMeImg.classList.remove('col-md-5');
		aboutMeImg.classList.add('col-md-8');
		for (var i = 0; i < portfolioBlocks.length; i++) {
			portfolioBlocks[i].classList.remove('col-md-6');
			portfolioBlocks[i].classList.add('col-md-12');
		}
	} else if (sideMenu.classList.contains('active') && mqr1500.matches) {
		aboutMeInfo.classList.remove('col-md-8');
		aboutMeInfo.classList.add('col-md-6');
		aboutMeImg.classList.remove('col-md-8');
		aboutMeImg.classList.add('col-md-5');
		for (var i = 0; i < portfolioBlocks.length; i++) {
			portfolioBlocks[i].classList.remove('col-lg-4');
			portfolioBlocks[i].classList.add('col-lg-6');
			portfolioBlocks[i].classList.remove('col-md-12');
			portfolioBlocks[i].classList.add('col-md-6');
		}
	} else {
		aboutMeInfo.classList.remove('col-md-8');
		aboutMeInfo.classList.add('col-md-6');
		aboutMeImg.classList.remove('col-md-8');
		aboutMeImg.classList.add('col-md-5');
		for (var i = 0; i < portfolioBlocks.length; i++) {
			portfolioBlocks[i].classList.remove('col-lg-6');
			portfolioBlocks[i].classList.remove('col-md-12');
			portfolioBlocks[i].classList.add('col-lg-4');
			portfolioBlocks[i].classList.add('col-md-6');
		}
	}
}

function containerSizeChange() {

	for (var i = 0; i < containers.length; i++) {
			containers[i].style.width = "";
		}
	if (mqr1150.matches && mqr1300.matches && mqr1500.matches) {
		for (var i = 0; i < containers.length; i++) {
			containers[i].style.width =  "";
		}
	} else if (mqr1300.matches && mqr1500.matches) {
		for (var i = 0; i < containers.length; i++) {
			containers[i].style.width =  containers[i].clientWidth - 135 + "px";
		}
	} else if (mqr1500.matches) {
		for (var i = 0; i < containers.length; i++) {
			containers[i].style.width =  containers[i].clientWidth - 275 + "px";
		}
	} 
}

function resizeHandlerForElemsSizeChange() {
	headerCompositionPositioning();
	containerSizeChange();
	elemsSizeChange();

	if (mqr710.matches) {
		for (var i = 0; i < pageSections.length; i++) {
				pageSections[i].style.paddingLeft = "";
		}
	}
}
/*---------------------------------------------------------------*/
/*----------------------portfolio filter-------------------------*/

var portfolioFilterButtons = document.querySelectorAll('.portfolio-block__categories li');
var portfolioFilterButtonsSet = document.querySelector('.portfolio-block__categories');
var portfolioItems = document.querySelectorAll('.portfolio-block__content__item__wrapper');
var portfolioActiveFilter = document.querySelector('.portfolio-block__categories li[data-state="active"]');
portfolioFilterButtonsSet.addEventListener('click', showCategory);

portfolioItemsInit(); /*----show portfolio items----*/


function showCategory(e) {
	target = e.target;
	if (!target.closest('.portfolio-block__categories li')) {
		return;
	} else {
		var targetPortfolioFilterButton = target.closest('.portfolio-block__categories li');
		var filterValue = targetPortfolioFilterButton.dataset.value;

		for (var i =0; i < portfolioFilterButtons.length; i++) {
			portfolioFilterButtons[i].setAttribute('data-state', '');
			targetPortfolioFilterButton.setAttribute('data-state', 'active');
		}	

		for (var i = 0; i < portfolioItems.length; i++) {
			if (portfolioItems[i].dataset.type == filterValue) {
				portfolioItems[i].style.display = "block";
			} else {
				portfolioItems[i].style.display = "none";
			}
		}
	}
}

function portfolioItemsInit() {
	var portfolioActiveFilterValue = portfolioActiveFilter.dataset.value;
	for (var i = 0; i < portfolioItems.length; i++) {
		if (portfolioItems[i].dataset.type == portfolioActiveFilterValue) {
			portfolioItems[i].style.display = "block";
		} else {
			portfolioItems[i].style.display = "none";
		}
	}
}
/*---------------------------------------------------------------*/
/*-------------------timeline-resize-fix-------------------------*/

$(document).ready(function() {

	window.addEventListener('resize', timelineResizeFix);
	timelineResizeFix();

});


function timelineResizeFix() {

	timelineLineElemsHeight();
	timelineDecorationElemPosition();
	timelinePointPosition();
}

function timelineLineElemsHeight() {
	var timelineBlock = document.querySelectorAll('.timeline');
	var timelineLineElems = document.querySelectorAll('.timeline__line-element');
	var mql = window.matchMedia('all and (max-width: 768px)');
	for (var i = 0; i < timelineLineElems.length; i++) {
		if (mql.matches) {
			timelineLineElems[i].style.bottom = timelineLineElems[i].closest('.timeline').lastElementChild.clientHeight - 28 +"px";
		}
		if (timelineLineElems[i].closest('.timeline').children.length % 2 === 0) {
			timelineLineElems[i].style.bottom = timelineLineElems[i].closest('.timeline').lastElementChild.clientHeight - 28 +"px";
		} else {
			if (mql.matches) {
				timelineLineElems[i].style.bottom = timelineLineElems[i].closest('.timeline').lastElementChild.clientHeight - 28 +"px";
			} else {
				timelineLineElems[i].style.bottom = 28 +"px";
			}
		}
	}
}

function timelineDecorationElemPosition() {
	var timelineBlock = document.querySelectorAll('.timeline');
	var timelineDecorationElem;
	var mql = window.matchMedia('all and (max-width: 768px)');
	for (var i = 0; i < timelineBlock.length; i++) {
		if (mql.matches) {
			for (var j = 1; j < timelineBlock[i].children.length; j++) {
				timelineDecorationElem = timelineBlock[i].children[j].querySelector('.timeline-event__decorative-element');
				timelineDecorationElem.style.left = timelineDecorationElem.closest('.timeline-event').clientWidth -1 + "px";
				timelineDecorationElem.style.top = 28 + "px";
				timelineDecorationElem.style.borderTop = "14px solid #353541";
				timelineDecorationElem.style.borderBottom = "14px solid transparent";
				timelineDecorationElem.style.borderLeft = "14px solid #353541";
				timelineDecorationElem.style.borderRight = "14px solid transparent";
			}
		} else {
			for (var j = 1; j < timelineBlock[i].children.length; j = j + 2) {
				timelineDecorationElem = timelineBlock[i].children[j].querySelector('.timeline-event__decorative-element');
				timelineDecorationElem.style.left = -28 + "px";
				timelineDecorationElem.style.top = 28 + "px";
				timelineDecorationElem.style.borderTop = "14px solid #353541";
				timelineDecorationElem.style.borderBottom = "14px solid transparent";
				timelineDecorationElem.style.borderLeft = "14px solid transparent";
				timelineDecorationElem.style.borderRight = "14px solid #353541";
			}
			for (var k = 2; k < timelineBlock[i].children.length; k = k + 2) {
				timelineDecorationElem = timelineBlock[i].children[k].querySelector('.timeline-event__decorative-element');
				timelineDecorationElem.style.left = timelineDecorationElem.closest('.timeline-event').clientWidth - 1 + "px";
				timelineDecorationElem.style.top = timelineDecorationElem.closest('.timeline-event').clientHeight - 56 + "px";
				timelineDecorationElem.style.borderTop = "14px solid transparent";
				timelineDecorationElem.style.borderBottom = "14px solid #353541";
				timelineDecorationElem.style.borderLeft = "14px solid #353541";
				timelineDecorationElem.style.borderRight = "14px solid transparent";
			}
		}
	}
}

function timelinePointPosition() {
	var timelineBlock = document.querySelectorAll('.timeline');
	var timelinePoint;
	var mql = window.matchMedia('all and (max-width: 768px)');
	for (var i = 0; i < timelineBlock.length; i++) {
		if (mql.matches) {
			for (var j = 1; j < timelineBlock[i].children.length; j++) {
				timelinePoint = timelineBlock[i].children[j].querySelector('.timeline-point');
				timelinePoint.style.top = 28 + "px";
			}
		} else {
			for (var j = 1; j < timelineBlock[i].children.length; j = j + 2) {
				timelinePoint = timelineBlock[i].children[j].querySelector('.timeline-point');
				timelinePoint.style.top = 28 + "px";
			}
			for (var k = 2; k < timelineBlock[i].children.length; k = k + 2) {
				timelinePoint = timelineBlock[i].children[k].querySelector('.timeline-point');
				timelinePoint.style.top = timelinePoint.closest('.timeline-event-container').clientHeight - 28 + "px";
			}
		}
	}
}

/*---------------------------------------------------------------*/
/*-------------------skills individual progress------------------*/

var skillItems = document.querySelectorAll('.skill');

for (var i = 0; i < skillItems.length; i++) {
	var skillItemValue = skillItems[i].querySelector('.skill-value').innerHTML;
	skillItems[i].querySelector('.skill-progressbar__level').style.width = skillItemValue;
	skillItems[i].querySelector('.skill-progressbar__thumb').style.left = skillItemValue;
}

/*---------------------------------------------------------------*/
/*-------------------form send event-----------------------------*/

var button = document.querySelector('form button');
var onSubmitMessage = document.querySelector('.contacts__form__onSubmit-message');

$(".contacts form").submit(function() {
	var th = $(this);
	$.ajax(/*{
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}*/).done(function() {
		onSubmitMessage.style.transform = "rotate(0deg)";
		button.disabled = true;
		th.trigger("reset");
		setTimeout(function() {
			onSubmitMessage.style.filter = "blur(30px)";
			onSubmitMessage.style.top = "100%";
			onSubmitMessage.style.opacity = "0";
		},3000);
		setTimeout(function() {
			onSubmitMessage.style.transform = "";
			onSubmitMessage.style.filter = "";
			onSubmitMessage.style.top = "";
		}, 6000);
		setTimeout(function() {
			onSubmitMessage.style.opacity = "";
			button.disabled = false;
		}, 20000);
		});
		event.preventDefault();
});
/*---------------------------------------------------------------*/
/*------------------------navigation-----------------------------*/

$("header .button").click(function() {
	var cords = $(".contacts")[0].getBoundingClientRect().top + pageYOffset;
	$('html, body').stop().animate({scrollTop: cords}, 'slow', 'swing');
});

$("a[data-nav='home']").click(function(event) {
	$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	event.preventDefault();
});

$("a[data-nav='aboutMe']").click(function(event) {
	var cords = $(".about-me")[0].getBoundingClientRect().top + pageYOffset;
	$('html, body').stop().animate({scrollTop: cords}, 'slow', 'swing');
	event.preventDefault();
});

$("a[data-nav='education']").click(function(event) {
	var cords = $(".education")[0].getBoundingClientRect().top + pageYOffset;
	$('html, body').stop().animate({scrollTop: cords}, 'slow', 'swing');
	event.preventDefault();
});

$("a[data-nav='workExperience']").click(function(event) {
	var cords = $(".work-experience")[0].getBoundingClientRect().top + pageYOffset;
	$('html, body').stop().animate({scrollTop: cords}, 'slow', 'swing');
	event.preventDefault();
});

$("a[data-nav='skills']").click(function(event) {
	var cords = $(".skills")[0].getBoundingClientRect().top + pageYOffset;
	$('html, body').stop().animate({scrollTop: cords}, 'slow', 'swing');
	event.preventDefault();
});

$("a[data-nav='portfolio']").click(function(event) {
	var cords = $(".portfolio")[0].getBoundingClientRect().top + pageYOffset;
	$('html, body').stop().animate({scrollTop: cords}, 'slow', 'swing');
	event.preventDefault();
});

$("a[data-nav='contacts']").click(function() {
	var cords = $(".contacts")[0].getBoundingClientRect().top + pageYOffset;
	$('html, body').stop().animate({scrollTop: cords}, 'slow', 'swing');
});

/*---------------------------------------------------------------*/
/*-------------------animated section titles---------------------*/
var headerTitlePosition,
	 	aboutMeTitlePosition,
	 	workExperienceTitlePosition,
	 	educationTitlePosition,
	 	skillsTitlePosition,
	 	portfolioTitlePosition;

titlesPositionDetection();

window.addEventListener('resize', titlesPositionDetection);

window.addEventListener('scroll', titlesAnimationHandler);

function titlesAnimationHandler(event) {
	if (window.pageYOffset < window.innerHeight) {
		document.querySelector('.header-composition__name').classList.add('title-animated');
	}
	if (window.pageYOffset > window.innerHeight) {
		document.querySelector('.header-composition__name').classList.remove('title-animated');
	}

	if (window.pageYOffset < aboutMeTitlePosition + 50 && window.pageYOffset > aboutMeTitlePosition - window.innerHeight * 0.75) {
		document.querySelector('.about-me .h2').classList.add('title-animated');
	} else {
		document.querySelector('.about-me .h2').classList.remove('title-animated');
	}
	if (window.pageYOffset < workExperienceTitlePosition && window.pageYOffset > workExperienceTitlePosition - window.innerHeight * 0.75) {
		document.querySelector('.work-experience .h2').classList.add('title-animated');
	} else {
		document.querySelector('.work-experience .h2').classList.remove('title-animated');
	}
	if (window.pageYOffset < educationTitlePosition && window.pageYOffset > educationTitlePosition - window.innerHeight * 0.75) {
		document.querySelector('.education .h2').classList.add('title-animated');
	} else {
		document.querySelector('.education .h2').classList.remove('title-animated');
	}
	if (window.pageYOffset < skillsTitlePosition + 100 && window.pageYOffset > skillsTitlePosition - window.innerHeight * 0.75) {
		document.querySelector('.skills .h2').classList.add('title-animated');
	} else {
		document.querySelector('.skills .h2').classList.remove('title-animated');
	}
	if (window.pageYOffset < portfolioTitlePosition + 100 && window.pageYOffset > portfolioTitlePosition - window.innerHeight * 0.75) {
		document.querySelector('.portfolio .h2').classList.add('title-animated');
	} else {
		document.querySelector('.portfolio .h2').classList.remove('title-animated');
	}
}

function titlesPositionDetection() {
	headerTitlePosition = 0;
	aboutMeTitlePosition = document.querySelector(".about-me .h2").getBoundingClientRect().top + pageYOffset;
	workExperienceTitlePosition = document.querySelector(".work-experience .h2").getBoundingClientRect().top + pageYOffset;
	educationTitlePosition = document.querySelector(".education .h2").getBoundingClientRect().top + pageYOffset;
	skillsTitlePosition = document.querySelector(".skills .h2").getBoundingClientRect().top + pageYOffset;
	portfolioTitlePosition = document.querySelector(".portfolio .h2").getBoundingClientRect().top + pageYOffset;
}
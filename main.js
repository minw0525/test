const params = {}
const langPart = /\?lang=(\D|\d){1,}/;
const currParam = window.location.search
let currLang;
let dataSheet;
let url = window.location.href;



//개발계획

//ismobile 함수=>모바일 os일 경우 mobile.html로 리디렉트 V
//ismobile false면 실행~ V

//paramcheck(ko/en검사)->데이터세팅  V
//디브 만들기  V
//이미지 채우기, 파람 따라 링크 달기
//애니메이션 있으려나~


//버튼 이벤트리스너
//호버 이벤트리스너

//모바일일 경우
//paramcheck(ko/en검사)->데이터세팅
//디브 만들기 이미지 채우기

//모든 a 버튼 푸시스테이트, href
//버튼 이벤트리스너
//부스 싱글 이벤트리스너(클래스 추rk)


///detect language parameter of url

function validParamCheck(originalParam){
  return new Promise((resolve,reject)=>{
    params.lang = "";
    originalParam.replace(
      /[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; }
    );
    console.log(params);
    currLang = params.lang;
    (currLang !== "en") ? resolve(params) : reject(params)
  });
}
const removeLang = params => {
  console.log(url)
  url = url.replace(langPart,"");
  currLang = "ko";
  console.log(url);
  console.log (currLang);
  window.location.href = url;
  return params;
}
const keepLang = params => {
  currLang = "ko";
  console.log(url);
  return params;
}


//get JSON data

function getData(params){
  return new Promise((resolve, reject)=>{
    $.getJSON("json_sample.json",function(data) {
      console.log(data)
      dataSheet = data[currLang];
      resolve(dataSheet);
    })
});
}


//create item div
function createDiv(data){
  const gC = $(".grid-container");
  for(let i = 0; i<28; i++){
    const item = $('<div></div>');
    item.attr('class', `item booth diggingDiv ${data[i].query}` );
    item.css({
      //'background-image' : `url(\'image/diggingman.png\') center /contain no-repeat content-box`,
      'background' : 'url(\'image/diggingman.png\') center /contain no-repeat content-box'
    });
    const wrappingBlock = $("<div></div>");
    wrappingBlock.attr('class', 'wrappingBlock hidden');

    //create childern inside digging booth
    const thumbnail = $("<img>");
    const blockTag = $("<div></div>");
    thumbnail.attr('src',`image/1.png`);
    thumbnail.attr('class', `thumbnail ${data[i].query}Thumbnail`);
    /*item.css({
      //'background-image' : `url(\'image/diggingman.png\') center /contain no-repeat content-box`,
      'background' : 'url(\'image/diggingman.png\') center /contain no-repeat content-box'
    });*/
    blockTag.attr('class', `blockTag ${data[i].query}`)

    // work link
    const workLink = $("<a></a>");
    workLink.attr('href',`https://minw0525.000webhostapp.com/v2_member?student=${data[i].query}`);

    //append block tag
    const nameBlock = $(`<div></div>`);
    nameBlock.attr('class', 'nameBlock');
    const blockTitle = $(`<span></span>`);
    blockTitle.attr('class', 'title');

    //append span to nameBlock
    const tagName = $(`<span></span>`);
    tagName.attr('class','name')
    const arrow = $(`<span>→</span>`);

    gC.append(item);
    item.append(wrappingBlock);
    wrappingBlock.append(thumbnail, workLink);
    workLink.append(blockTag);
    blockTag.append(nameBlock, blockTitle);
    nameBlock.append(tagName, arrow);


    //apply hover event
    item.hover(function(){
      wrappingBlock.toggleClass('hidden');
      wrappingBlock.toggleClass('showed');
    },function(){
      wrappingBlock.toggleClass('hidden');
      wrappingBlock.toggleClass('showed');
    })
  }

  //make blank div
  for(let i = 0; i<8; i++){
    const item = $('<div></div>');
    item.attr('class', 'item booth' );
    gC.append(item);

  }
  return data;
}


//fill booth text
function fillTagText(data){
  const blockTags = Array.prototype.slice.call($('.blockTag'))
  blockTags.map(e=>{
    let i = blockTags.indexOf(e);
    const blockContent = [data[i].name, data[i].title];
    e.childNodes[0].childNodes[0].textContent = blockContent[0];
    e.childNodes[1].textContent = blockContent[1];
    console.log(e)
  })
}


//fill info block
function fillInfo(currLang){
  const lexicon = $('.info>p:first-of-type');
  const keynote = $('.info>p:last-of-type');
  console.log(currLang);
  switch (currLang){
    case 'ko':
      console.log(lexicon);
      lexicon.html('1. (무엇을 알아내기 위해) 깊이 파고들다<br>2. (장비 따위의) 필요한 것을 찾기 위해 노력하다.');
      keynote.html('2020년, 준비를 마친 인부들이 이동을 시작했다.<br>오프라인에서 온라인으로, 전신의 움직임에서 손가락의 작은 움직임으로, 땅 위에서 픽셀 위로….<br>수많은 변화 속에서 그들은 존재를 지속할 수 있는 무언가를 찾아 나섰다.각자가 속한 그리드와 픽셀 위에서, 28명의 인부들은 삽을 들고 더 깊은 아래를 향해 웹 속을 파고든다. 그 끝에 발굴해낸 새로운 가능성과 존재의 조각이 궁금하다면,')
      break;
    case 'en':
      console.log(keynote);
      lexicon.html('1. search thoroughly for information<br>2. try hard to provide the money, equipment, etc.');
      keynote.html('In 2020, after extensive preparation, workers began to move.<br>From offline to online,from full-body movement to small finger movements,from the ground to pixels above...<br>Amidst a multitude of changes,they longed to find that “something” (or quality) that will rest immortally.On top of the grid and pixels to which they correspond,Twenty-eight members hold a shovel to dig deeper into the web.If you are curious about the new possibilities and pieces unearthed,');
      break;
  }
}
//initial setting
const init = data => new Promise((resolve,reject)=>{
  console.log(currLang);
  fillInfo(currLang);
  resolve(data);
});

function changeLangBtn (){
  $(".ko").toggleClass('altLangOff');
  $(".ko").toggleClass('altLangOn');
  $(".en").toggleClass('altLangOn');
  $(".en").toggleClass('altLangOff');
}

console.log(dataSheet)


//promise chain 실행
validParamCheck(currParam)
    .then(p=>{
      p.lang ? removeLang(p) : keepLang(p)
      }
    )
    .catch(getData)
    .then(getData)
    /*.catch(()=>{
      dataSheet = data[currLang]
      return dataSheet;
    })
    .then(()=>{
      dataSheet = data[currLang]
      return dataSheet;
    })*/
    .then(init)
    .then(createDiv)
    .then(fillTagText)
    .then(()=>(currLang == 'ko'
      ?($(".ko").addClass('altLangOff'),$(".en").addClass('altLangOn'))
      :($(".ko").addClass('altLangOn'),$(".en").addClass('altLangOff'))
    ))

const gC = $(".grid-container");

const reFill = function(paramString) {
  new Promise((r1,r2)=>{
    console.log(paramString);
    paramString? r1(paramString) : currLang = 'ko', r2(paramString);
  })
  .then(validParamCheck)
  .catch(getData)
  .then(init)
  .then(fillTagText)
  .then(()=>{
    changeLangBtn();
  })
};

$(window).bind('popstate', function() {
    let returnLocation = history.location || document.location;
    console.log(returnLocation)
    let href = returnLocation.search;
    reFill(href);
});

// a tag onclick pushstate event
$(document).on("click", "a", function() {
  let href = $(this).attr("href");
  console.log(href);
  history.pushState(href,"", href);
  reFill(href); //spa로 만들기
  return false;
});

//lang btn onclick event;
const langBtn = $(".altLangOn");
function altLang(){
  console.log(currLang);
  if(currLang === "ko"){
    url = window.location.href;
    currLang = "en";
    if(url.langPart){
      url = url.replace(langPart,"?lang=en");
    }else{
      url = url.concat("?lang=en")
    }
    console.log(url);
    history.pushState("","", url);
    let href = window.location.search;
    console.log(href);
    reFill(href);
    console.log(dataSheet);
  }else if(currLang === "en"){
    url = window.location.href;
    currLang = "ko";
    url = url.replace(langPart,"");
    console.log(url);
    history.pushState("","", url);
    let href = window.location.search;
    console.log(href);
    reFill(href);
    console.log(dataSheet);
  }
}
$(document).on("click", ".altLangOn", altLang)

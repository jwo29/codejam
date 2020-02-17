module.exports = {
    HTML:function(title1, desc1, title2, handler, desc2){  

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <link rel="stylesheet" href="./stylesheets/master.css">
            <title>CodeJam</title>
      </head>
      <body>
            <header>
                <div class="logo">
                    <h1><a href="/">CodeJam</a></h1>
                </div>
		<h4 class="js-clock">00:00:00</h4>
            </header>

            <nav>
                <div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/study">Study</a></li>
                    </ul>
                </div>
            </nav>

            <div>
                <!-- section 1 -->
                <div class="section1" style="float:left">
                    <div><h2>${title1}</h2></div>
                    <div>${desc1}</div>
                </div>
                <!-- section 2 -->
                <div class="section2" style="display: inline-block">
                    <div><h3>${title2}</h3></div>
                    <div>${handler}</div>
                    <div><p>${desc2}</p></div>
                </div>
            </div>
      </body>
      </html>
      `;
    },list:function(studyList){
      var list = '<ul>';
      var i = 0;
      while(i < studyList.length){
        list = list + `<li><a href="/study/${studyList[i].title}">
        ${studyList[i].title}</a></li>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
    }, detail: function(topic){ // 단일 토픽의 상세 내용에 대한 템플릿
        return `
        Created on ${topic[0].created}<br>
        ${topic[0].description}
        `
    }
  }  

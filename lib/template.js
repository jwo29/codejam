module.exports = {
    HTML:function(main_control, main_body, detail_control, detail_body){
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CodeJam</title>
      </head>
      <body>
          <header>
              <div class="logo">
                  <h1><a href="/">CodeJam</a></h1>
              </div>

              <!-- clock section -->
              <div class="clock">
                  <h4 class="js-clock">00:00:00</h4>
              </div>
          </header>

          <nav>
              <div>
                  <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/study">Study</a></li>
                      <li><a href="/contact">Contact</a></li>
                  </ul>
              </div>
          </nav>

          <!-- main section -->
          <div>
              <div>${main_control}</div>
              <div>${main_body}</div>
          </div>

          <!-- detail section -->
          <div>
              <div>${detail_control}</div>
              <div>${detail_body}</div>
          </div>
      </body>
      </html>
      `;
    },list:function(studyList){
      // study list from data directory
      var list = '<ul>';
      var i = 0;
      while(i < studyList.length){
        list = list + `<li><a href="/study/${studyList[i].title}">
        ${studyList[i].title}</a></li>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
    }
  }  
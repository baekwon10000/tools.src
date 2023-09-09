export const ACTOR_NAME = {
  'beautify': 'beatuifier',
  'minify': 'minifier',
  'verify': 'verifier',
  'encode': 'encoder',
  'decode': 'decoder',
  'convert': 'converter',
}

export const SAMPLE_DATA = {
  html: `<!DOCTYPE html>
<html>
  <head>
    <title>Largest companies by market cap — US Stock Market</title>
    <meta charset='UTF-8'>
  </head>
  <body>
    <h1>Apple : 2010 Billion</h1>
    <h2>Saudi Aramco : 1812 Billion</h2>
    <h3>Microsoft : 1800 Billion</h3>
    <h4>Alphabet (Google) : 1155 Billion</h4>
    <h5>Amazon : 869 Billion</h5>
    <b>This data is as of 21 Dec 2022.</b>
  </body>
</html>`,
  json: `{
  "employees": {
      "employee": [
          {
              "id": "1",
              "firstName": "Scarlett",
              "lastName": "Johansson",
              "photo": "http://si.wsj.net/public/resources/images/BN-BY925_mag041_OZ_20140318165119.jpg"
          },
          {
              "id": "2",
              "firstName": "Chris",
              "lastName": "Evans",
              "photo": "https://pbs.twimg.com/profile_images/605082381528096769/gt_sJRot.png"
          },
          {
              "id": "3",
              "firstName": "Jeremy",
              "lastName": "Renner",
              "photo": "https://pbs.twimg.com/profile_images/603945839795412992/XTssKbRC.jpg"
          }
      ]
  }
}`,
  javascript: `function startTime() {var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
m = checkTime(m);
s = checkTime(s);
document.getElementById('txt').innerHTML =
h + ":" + m + ":" + s;
var t = setTimeout(startTime, 500);}

function checkTime(i) {
// add zero in front of numbers < 10
if (i < 10) {i = "0" + i;}
    return i;
}`,
  css: `.menu_simple {
width: 100%;background-color: #005555;}
.menu_simple ul {margin: 0;padding: 0;float: left;}
.menu_simple ul li {
display: inline;
}
.menu_simple ul li a {float: left;text-decoration: none;color: white;padding: 10.5px 11px;background-color: #005555;}
.menu_simple ul li a:visited {color: white;}
.menu_simple ul li a:hover, .menu_simple ul li .current {color: white;background-color: #5FD367;}`,
  unicode: `ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ`,
  url: `https://github.com/baekwon10000/tools.src`,
}

export const MENUS = [
  {
      title: 'Beautifier',
      menus: [
          {name: 'Html', link: '/beautify/html'},
          {name: 'Javascript', link: '/beautify/javascript'},
          {name: 'Css', link: '/beautify/css'}
      ]
  },
  {
      title: 'Minifier',
      menus: [
          {name: 'Html', link: '/minify/html'},
      ]
  },
  {
      title: 'Verifier',
      menus: [
          {name: 'Json', link: '/verify/json'},
      ]
  },
  {
      title: 'Converter',
      menus: [
        {name: 'Color', link: '/convert/color'},
      ]
  },
  {
      title: 'Encoder/Decoder',
      menus: [
          {name: 'Unicode', link: '/encode/unicode'},
          {name: 'Url', link: '/encode/url'},
      ]
  },
  {
      title: 'Etc',
      menus: [
          {name: 'Html Tag Remover', link: '/replace/html'},
      ]
  },
]
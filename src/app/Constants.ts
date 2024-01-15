import Beautify from "./pages/Beautify"
import Minify from "./pages/Minify"
import Json from "./pages/Json"
import Replace from "./pages/Replace"
import Url from "./pages/Url"
import Unicode from "./pages/Unicode"
import Color from "./pages/Color"
import JavaMapStr from "./pages/JavaMapStr"
import ByteLength from "./pages/ByteLength"

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
  jsonStr: `{K1=V1, K2=V2, K3=V3, Kn=Vn}`,
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
  bytelength: `ㄱㄴㄷㄹㅁ 123 abc`,
}

export const MENUS = [
  {
      title: 'Beautifier',
      menus: [
          // { name: 이름, link: 링크, direction: 방향(one(default), both) }
          { name: 'Html', link: '/beautify/html', title: 'Html Beautifier', component: Beautify },
          { name: 'Javascript', link: '/beautify/javascript', title: 'Javascript Beautifier', component: Beautify },
          { name: 'Css', link: '/beautify/css', title: 'Css Beautifier', component: Beautify }
      ]
  },
  {
      title: 'Minifier',
      menus: [
          { name: 'Html', link: '/minify/html', title: 'Html Minifier', component: Minify },
      ]
  },
  {
      title: 'Verifier',
      menus: [
          { name: 'Json', link: '/verify/json', title: 'Json Verifier', component: Json },
      ]
  },
  {
      title: 'Converter',
      menus: [
        { name: 'Color', link: '/convert/color', title: 'Color Converter', component: Color },
        { name: 'Java Map String to Key-Value pair', link: '/convert/javaMapStr', title: 'Java Map String to Key-Value pair', component: JavaMapStr },
      ]
  },
  {
      title: 'Encoder/Decoder',
      menus: [
          { name: 'Unicode', link: '/encode/unicode', title: 'Unicode Encoder/Decoder', component: Unicode, direction: 'both' },
          { name: 'Url', link: '/encode/url', title: 'Url Encoder/Decoder', component: Url, direction: 'both' },
      ]
  },
  {
      title: 'Etc',
      menus: [
          { name: 'Html Tag Remover', link: '/replace/html', title: 'Html Tag Remover', component: Replace },
          { name: 'Measure Byte Length', link: '/measure/byte-length', title: 'Byte Length Measurer', component: ByteLength, attr: 'readonly' },
      ]
  },
]
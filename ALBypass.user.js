(function() {window.history.replaceState&&window.history.replaceState(null,null,window.location.href);var messageError,linkCantBypass,listOfAcceptDomains=GM_getValue("domains",""),retry=3,green_icon=GM_getValue("green_icon",""),green_icon1=GM_getValue("green_icon1",""),grey_icon=GM_getValue("grey_icon",""),red_icon=GM_getValue("red_icon",""),autoFCB="auto(faucet|claim|bitco).(in|org)",gist_id="e6ed9bbe9feb74e71030c680feba9d71",delayOn=GM_getValue("delayOn","[]"),update_delayOn=GM_getValue("update_delayOn",!0);function getIcons(){fetch("https://gist.githubusercontent.com/Harfho/63966e7f7145a5607e710a4cdcb31906/raw/ALBypass_icons.json").then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{var t=e.green_icon,o=e.grey_icon,e=e.red_icon;GM_setValue("green_icon",t),GM_setValue("grey_icon",o),GM_setValue("red_icon",e)}).catch(e=>{console.log("can't get Icons because of ",e),window.location.reload(!1)})}function favicon(e){let t=document.createElement("link");t.href=e,t.rel="icon",t.type="image/png",document.getElementsByTagName("head")[0].appendChild(t)}function waitForKeyElements(e,o,t,n,a){void 0===t&&(t=!0),void 0===n&&(n=300),void 0===a&&(a=-1);var i="function"==typeof e?e():document.querySelectorAll(e),s=i&&0<i.length;s&&i.forEach(function(e){var t="data-userscript-alreadyFound";e.getAttribute(t)||(o(e)?s=!1:e.setAttribute(t,!0))}),0===a||s&&t||(--a,setTimeout(function(){waitForKeyElements(e,o,t,n,a)},n))}function getdelayPages(){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/delaypage.txt?timestamp=' + (+new Date())",nocache:!0,revalidate:!0,onload:e=>{let t=e.responseText.replace(/[^\w\d.,-]/gi,"").split(",").filter(e=>e),o=t.map(e=>e.replace(/'/gi,'"').toLowerCase());GM_setValue("delayOn",JSON.stringify(o))},onerror:e=>{}})}function delayHost(e){if(e=new URL(e).host,delayOn.includes(e))return!0}function update_delaypage(e=null){var t=GM_getValue("delayOn"),t=JSON.parse(t),o="Bearer "+(o=atob("Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==")),n=new Headers({accept:"application/vnd.github.v3+json",Authorization:o,"Content-Type":"application/json"}),o=JSON.stringify({files:{"delaypage.txt":{content:JSON.stringify(t)}}});fetch("https://api.github.com/gists/"+gist_id,{method:"PATCH",headers:n,body:o,redirect:"follow"}).then(e=>e.text()).then(e=>{console.log("Done",t),window.close()}).catch(e=>{console.log("error",e)}),GM_notification({title:"!Bypass-- "+e,text:"push "+e+" to delaypage list on github",timeout:1e4,ondone:()=>{}})}function addDelayorClose(e){try{var t=/.*action is marked as suspicious.*/gi.test(e.innerText.toLowerCase()),o=(/.*already visited this link.*/gi.test(e.innerText.toLowerCase()),new URL(document.referrer).host)}catch(e){o=""}var n;t?(delayOn=GM_getValue("delayOn"),delayOn=JSON.parse(delayOn),n=GM_getValue("previousHost",""),o&&0==delayOn.includes(o)?(delayOn.push(o),GM_setValue("delayOn",JSON.stringify(delayOn)),update_delaypage(o)):n&&0==delayOn.includes(n)&&(delayOn.push(n),GM_setValue("delayOn",JSON.stringify(delayOn)),update_delaypage(n))):(window.close(),window.close(),window.close(),window.close())}function OnPhone(){GM_getValue("OnPhone")?GM_setValue("OnPhone",!1):GM_setValue("OnPhone",!0),window.location.reload()}function getSimilarWord(e,t){function s(t){let o=[];for(let e=0;e<t.length-1;e++)o.push(t[e]+t[e+1]);return o}return function(t,o,e=.3){let n=0,a=t;for(let e=0;e<o.length;e++){var i=function(e,t){e=e.toLowerCase(),t=t.toLowerCase();const o=s(e),n=s(t);let a=[];for(let e=0;e<o.length;e++)-1<n.indexOf(o[e])&&a.push(o[e]);return a.length/Math.max(o.length,n.length)}(o[e],t);i>n&&(n=i,a=o[e])}return n>e?a:t}(e,t)}function updateAcceptDomain(){fetch("https://api.yuumari.com/alpha-bypass/domains/accept").then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{var t,o=[];for(t in e)o.push(...e[t]);GM_setValue("domains",JSON.stringify(o))}).catch(e=>{console.log("can't updateAcceptDomain because of ",e),window.location.reload(!1)})}function sendEmail(e,t,o){const n=e,a=o,i=atob("NDFjYWY3YmU4MWMwMmRiODIwOWQwNGE2Njg4YWVhZWE="),s=new Headers;s.append("Content-Type","application/json");t=JSON.stringify({user_id:"user_oF6Z1O2ypLkxsb5eCKwxN",service_id:"gmail",accessToken:i,template_id:t,template_params:{username:"Harfho",from_name:"Harfho",to_name:n,message:a}}),t={method:"POST",headers:s,body:t,redirect:"follow"};fetch("https://api.emailjs.com/api/v1.0/email/send",t).then(e=>e.text()).then(e=>console.log(e)).catch(e=>console.log("error",e))}function update_DontOpen(a){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/_DontOpen.txt?timestamp=' + (+new Date())",nocache:!0,revalidate:!0,onload:function(e){let t=e.responseText.replace(/'|"|\[|\]/gi,"").split(",").filter(e=>e);var o=t.map(e=>e.replace(/'/gi,'"').toLowerCase()),n=atob("Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==");n="Bearer "+n;e=new Headers({accept:"application/vnd.github.v3+json",Authorization:n,"Content-Type":"application/json"});a&&!o.includes(a)?(o.push(a.toLowerCase()),n=JSON.stringify({files:{"_DontOpen.txt":{content:JSON.stringify(o)}}}),fetch("https://api.github.com/gists/"+gist_id,{method:"PATCH",headers:e,body:n,redirect:"follow"}).then(e=>e.text()).then(e=>{console.log("Done",o),window.close()}).catch(e=>{console.log("error",e)}),GM_notification({title:"!Bypass-- "+linkCantBypass,text:a+" "+messageError+" and was added to _DontOpen list on gist",timeout:1e4,ondone:()=>{}})):(GM_notification({title:"!Bypass-- "+linkCantBypass,text:a+" is Already added to _DontOpen",timeout:1e4,ondone:()=>{}}),updateAcceptDomain(),setTimeout(()=>{window.close()},5e3))}})}function getDomainOrPathNameAndUpdate(c,d){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/shortlinks_name.txt?timestamp=' + (+new Date())",nocache:!0,revalidate:!0,onload:function(e){let t=e.responseText.replace(/'|"|\[|\]|\s/gi,"").split(",").filter(e=>e);var o=t.map(e=>e.replace(/'/gi,'"').toLowerCase());let n=window.location.href.toLowerCase(),a=document.title.toLowerCase().trim(),i=new URL(c).host.replace(/\..*/gi,""),s,r=n.split("/").splice(2,2),l=getSimilarWord(r[0],o);/.*unsupported url.*/gi.test(d)?r.push(a,i,l):r.push(a,i);e=r.some(e=>(s=e,o.includes(e)));e?/.*dontopen.*/gi.test(d)?(s=getSimilarWord(s,o),update_DontOpen(s)):/.*unsupported url.*/gi.test(d)&&o.includes(s)&&(messageError="shortlink url was changed",linkCantBypass=c,update_DontOpen(s),sendEmail("Yuumari.com","shortlinks_vicissitude","Cant Bypass "+c)):/dontopen/gi.test(d)?(i=getSimilarWord(i,o),update_DontOpen(i)):/.*unsupported url.*/gi.test(d)&&o.includes(i)&&(messageError="shortlink url was changed",linkCantBypass=c,update_DontOpen(i))}})}function bypass(s){favicon(green_icon);var e=new URL(s).host;document.title=e,GM_setValue("previousHost",e);var e=atob(GM_getResourceText("key").match(/\w*/gi).filter(e=>""!=e)[0]),r=s;fetch("https://api.yuumari.com/alpha-bypass/",{method:"POST",body:new URLSearchParams({u:e,l:r})}).then(e=>{if(console.log(e.status),!e.ok)throw console.log("Network response was not OK - HTTP status "+e.status),new Error("Network response was not OK - HTTP status "+e.status);return e.json()}).then(o=>{var t,n,a=o.message;if(a){favicon(green_icon1);let e;e=sessionStorage.getItem("tryagain"),null==sessionStorage.getItem("tryagain")&&(sessionStorage.setItem("tryagain",1),e=sessionStorage.getItem("tryagain")),parseInt(e)<=retry?(sessionStorage.setItem("tryagain",parseInt(e)+1),setTimeout(()=>{window.location.reload(!1)},2e3)):(t=new URL(r).host,sessionStorage.removeItem("tryagain"),console.log(o.message),new RegExp("pattern changed|unsupported domain|not found|failed to get document|invalid path|invalid domain","ig").test(a)?(sendEmail("Yuumari.com","shortlinks_vicissitude","Cant Bypass "+(linkCantBypass=s)+" because of "+(messageError=a)),getDomainOrPathNameAndUpdate(s,"dontopen")):/ticket has expired/gi.test(a)?sendEmail("Harfho","api_issue",a+" Get New API key previous api key as expired"):/ticket locked/gi.test(a)?sendEmail("Harfho","api_issue",a+"You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour for API key to continue working"):/leeched max count/gi.test(a)?(n=a+"The limit on the number of requests has been exceeded 2 queries per 1sec.",console.log(n),setTimeout(()=>{window.location.reload(!1)},1e3)):(GM_notification({title:"!Bypass-- "+t,text:a+"--"+s,timeout:1e4,ondone:()=>{window.close()}}),GM_setClipboard(s,{type:"text/plain"}),window.close()))}else{sessionStorage.removeItem("tryagain");var i=document.title;let t=e=>{if(0!=e)return document.title=e+"-"+i,setTimeout(()=>{t(--e)},1e3);window.location.href=o.result};delayHost(s)?t(17):t(0)}}).catch(e=>{favicon(red_icon),console.error(e);var t=new URL(s).host;console.log("can't bypass "+t+" because of",e);let o;o=sessionStorage.getItem("recheck"),null==sessionStorage.getItem("recheck")&&(sessionStorage.setItem("recheck",1),o=sessionStorage.getItem("recheck")),parseInt(o)<=retry?(sessionStorage.setItem("recheck",parseInt(o)+1),setTimeout(window.location.reload(!1),5e3)):(favicon(red_icon),document.title=e+":"+new URL(s).host,sessionStorage.removeItem("recheck"))})}if(delayOn=JSON.parse(delayOn),0!=green_icon&&0!=green_icon1&&0!=grey_icon&&0!=red_icon||getIcons(),0!=delayOn&&1!=update_delayOn||(GM_setValue("update_delayOn",!1),getdelayPages()),GM_registerMenuCommand("OnPhone-"+GM_getValue("OnPhone",""),OnPhone,"OnPhone"),listOfAcceptDomains)if(listOfAcceptDomains.includes(window.location.host)&&!/\/===$/.test(window.location.href)){let e=window.location.href;document.title=new URL(e).host,bypass(e)}else if(/\/===$/.test(window.location.href))if(/megaurl.in\/bypass=/.test(window.location.href)){let e=window.location.pathname.replace(/.*bypass=/,"").replace(/\/===/gi,"");document.title=new URL(e).host,bypass(e)}else{let e=window.location.href.replace(/\/===/gi,"");bypass(e)}else if(new RegExp(autoFCB+"/dashboard$","ig").test(window.location.href))localStorage.removeItem("close"),localStorage.clear();else if(new RegExp(autoFCB+"/dashboard/shortlinks$","ig").test(window.location.href))waitForKeyElements("div.alert-danger",e=>{addDelayorClose(e)}),"true"==localStorage.getItem("close")&&(window.close(),window.close(),window.close(),window.close(),window.close(),window.close()),GM_getValue("OnPhone","")&&(window.close(),window.close(),window.close(),window.close());else if(new RegExp(autoFCB,"ig").test(window.location.host)){var error=document.querySelector("#cf-error-details"),time=6e4;error&&/Error 5../gi.test(error.innerText)&&(document.title="R-"+document.title,window.setTimeout(window.location.reload(!1),time))}else{favicon(grey_icon);let e=window.location.href;updateAcceptDomain(),getDomainOrPathNameAndUpdate(e,"unsupported url")}else updateAcceptDomain();
})();

(function() {
    if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href )
    }//to prevent a resubmit on refresh and back button
    //---------------------------------------------------------//
    var tryagain=sessionStorage.getItem('tryagain')
    if(/undefined|null/ig.test(sessionStorage.getItem('tryagain'))){sessionStorage.setItem('tryagain',1);tryagain=sessionStorage.getItem('tryagain')}
    let key =atob(GM_getResourceText("key").match(/\w*/gi).filter(e=>""!=e)[0])//get the api and decrypt it using btoa>atob
    function bypass(l){
        const api = 'https://api.yuumari.com/alpha-bypass/';
        const u =key
        GM.xmlHttpRequest({
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',},
            url: api,
            data: new URLSearchParams({u,l}).toString(),
            onload: r => {
                let d =JSON.parse(r.responseText)
                if(d.message==''){
                    sessionStorage.removeItem('tryagain')
                    window.location=d.result
                }else{
                    if(parseInt(tryagain)<=3){
                        sessionStorage.setItem('tryagain',parseInt(tryagain)+1);
                        window.location.reload(true)
                    }
                    else{
                        sessionStorage.removeItem('tryagain')
                        GM_notification({
                            title:'!Bypass-- '+window.location.host,
                            text:d.message+"--"+l,
                            timeout:300*1000,
                            ondone:()=>{window.close()},
                            onclick:()=>{window.close()}
                        });
                        GM_setClipboard(l,{type:'text/plain'})
                        window.close()
                    }
                }
            }
        });
    }
    if(/\/===$/.test(window.location.href)){
        if(/megaurl.in\/bypass=/.test(window.location.href)){
            const link=window.location.pathname.replace(/.*bypass=/,'').replace(/\/===/ig,'');
            document.title =link
            bypass(link)
        }else{
            const link = window.location.href.replace(/\/===/ig,'');
            bypass(link)}
    }
})();

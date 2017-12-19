import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render () {
    return (
      <html lang="fr-FR">
        <Head>
          <meta charSet='utf-8' className='next-head' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' className='next-head' />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.13/dist/semantic.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Lato:300" rel="stylesheet" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{ __html: `
              window.__ENV__ = {
                INDEX_PAGE: "${process.env.INDEX_PAGE}",
                ENDPOINT: "${process.env.ENDPOINT}",
                CLOUDINARY_CLOUD_NAME: "${process.env.CLOUDINARY_CLOUD_NAME}",
                FACEBOOK_ID: "${process.env.FACEBOOK_ID}"
              }
          `}}
          />
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.9&appId=${process.env.FACEBOOK_ID}";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `,
            }}
          />
          {process.env.FS_ORG && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window['_fs_debug'] = false;
                  window['_fs_host'] = 'fullstory.com';
                  window['_fs_org'] = '${process.env.FS_ORG}';
                  window['_fs_namespace'] = 'FS';
                  (function(m,n,e,t,l,o,g,y){
                      if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
                      g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
                      o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
                      y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
                      g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
                      g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
                      g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[\`;\`]*\`[\`;\`]*\`[\`;\`]*\`')){
                      d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+
                      ';path=/;expires='+new Date(0).toUTCString();i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}};
                  })(window,document,window['_fs_namespace'],'script','user');
                `,
              }}
            />
          )}

          {process.env.GA_TRACKING_ID && (
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`} />
          )}
          {process.env.GA_TRACKING_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments)};
                  gtag('js', new Date());
                  gtag('config', '${process.env.GA_TRACKING_ID}');`,
            }}/>
          )}

          <NextScript />
          <style jsx global>{`
            body {
              margin: 0;
              padding: 0;
              font-size: initial !important;
              background-color: #e7e7e7;
            }

            /* Mobile */
            @media only screen and (max-width: 767px) {
              [class*="mobile hidden"],
              [class*="tablet only"]:not(.mobile),
              [class*="computer only"]:not(.mobile),
              [class*="large screen only"]:not(.mobile),
              [class*="widescreen only"]:not(.mobile),
              [class*="or lower hidden"] {
                display: none !important;
              }
              input {
                font-size: 16px !important;
              }
              .mobile-fluid {
                width: 90%;
                margin: 0.2em !important;
              }
            }

            /* Tablet / iPad Portrait */
            @media only screen and (min-width: 768px) and (max-width: 991px) {
              [class*="mobile only"]:not(.tablet),
              [class*="tablet hidden"],
              [class*="computer only"]:not(.tablet),
              [class*="large screen only"]:not(.tablet),
              [class*="widescreen only"]:not(.tablet),
              [class*="or lower hidden"]:not(.mobile) {
                display: none !important;
              }
            }

            /* Computer / Desktop / iPad Landscape */
            @media only screen and (min-width: 992px) and (max-width: 1199px) {
              [class*="mobile only"]:not(.computer),
              [class*="tablet only"]:not(.computer),
              [class*="computer hidden"],
              [class*="large screen only"]:not(.computer),
              [class*="widescreen only"]:not(.computer),
              [class*="or lower hidden"]:not(.tablet):not(.mobile) {
                display: none !important;
              }
            }

            /* Large Monitor */
            @media only screen and (min-width: 1200px) and (max-width: 1919px) {
              [class*="mobile only"]:not([class*="large screen"]),
              [class*="tablet only"]:not([class*="large screen"]),
              [class*="computer only"]:not([class*="large screen"]),
              [class*="large screen hidden"],
              [class*="widescreen only"]:not([class*="large screen"]),
              [class*="or lower hidden"]:not(.computer):not(.tablet):not(.mobile) {
                display: none !important;
              }
            }

            /* Widescreen Monitor */
            @media only screen and (min-width: 1920px) {
              [class*="mobile only"]:not([class*="widescreen"]),
              [class*="tablet only"]:not([class*="widescreen"]),
              [class*="computer only"]:not([class*="widescreen"]),
              [class*="large screen only"]:not([class*="widescreen"]),
              [class*="widescreen hidden"],
              [class*="widescreen or lower hidden"] {
                display: none !important;
              }
            }

          `}</style>
        </body>
      </html>
    )
  }
}

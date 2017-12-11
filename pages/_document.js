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

          <NextScript />
          <style jsx global>{`
            body {
              margin: 0;
              padding: 0;
              font-size: initial !important;
              background-color: #e7e7e7;
            }
            @media only screen and (max-width: 576px) {
              input {
                font-size: 16px !important;
              }
              .mobile-fluid {
                width: 90%;
                margin: 0.2em !important;
              }
            }

          `}</style>
        </body>
      </html>
    )
  }
}

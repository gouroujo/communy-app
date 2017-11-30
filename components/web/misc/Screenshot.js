export default () => (
  <div className="screenshot">
    <style jsx>{`
      .screenshot {
        background-image: url("/static/images/screen.png");
        background-position: center;
        background-size:contain;
        height: 682.2px;
        width: 810px;
        margin: 1em auto;
        padding: 33px 36px 183px 32px;
      }
      .screenshot:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-image: url("/static/images/screenshot.png");
        background-position: center;
        background-size: cover;
      }
      @media only screen and (max-width: 767px) {
        .screenshot {
          background-image: url("/static/images/screen.png");
          background-position: center;
          background-size:contain;
          height: 341.1px;
          width: 405px;
          margin: 1em auto;
          padding: 16px 18px 91px 16px;
        }
      }
    `}</style>
  </div>
)

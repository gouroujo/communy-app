export default () => (
  <div className="screenshot">
    <style jsx>{`
      .screenshot {
        background-image: url("/static/images/screen.png");
        background-position: center;
        background-size:contain;
        background-repeat: no-repeat;
        height: 682.2px;
        width: 810px;
        margin: 1em auto;
        padding: 33px 36px 183px 32px;
        z-index: 5;
      }
      .screenshot:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-image: url("/static/images/screenshot.png");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 6;
      }
      @media only screen and (max-width: 767px) {
        .screenshot {
          height: 341.1px;
          width: 405px;
          margin: 1em auto;
          padding: 16px 18px 91px 16px;
        }
      }
      @media only screen and (max-width: 576px) {
        .screenshot {
          height: 262.8px;
          width: 300px;
          margin: 0 auto;
          padding: 16px 13px 73px 12px;
        }
      }
    `}</style>
  </div>
)


export default ({ colors = [], menu, header, children }) => (
  <div className="container">
    {menu}
    <div className="background">
      {header}
    </div>
    <div className="content">
      {children}
    </div>
    <style jsx global>{`
      body {
        background-color: #e7e7e7 !important;
      }
    `}</style>
    <style jsx>{`

      .background {
        overflow: hidden;
        z-index: 1;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        background-image: url("/static/images/overlay.png"),radial-gradient(rgba(0,0,0,0),rgba(0,0,0,0.2)), linear-gradient(45deg, ${colors.toString()});
        transition: background-image 4500ms;
        padding: 100px 0.2em 15vw 0.2em;
        margin-bottom: -15vw;
      }
      .background:after {
        content: "";
        display: block;
        position: absolute;
        border-radius: 100%;
        bottom: -5vw;
        right: -100px;
        left: -100px;
        height: 10vw
        background-color: #e7e7e7;
        z-index: -1;
       }
       .content {
         position: relative;
         z-index: 2;
       }
       @media only screen and (max-width: 576px) {
         .container {
           position: absolute;
           top: 0;
           right: 0;
           left: 0;
           /*overflow-x: hidden;*/
         }
         .background {
           padding-top: 60px;
         }
       }
    `}</style>
  </div>
)

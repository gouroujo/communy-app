import Menu from 'containers/misc/Menu'

export default ({ children }) => (
  <div className="container">
    <div className="background" />
    <Menu />
    <div>
      {children}
    </div>
    <style jsx global>{`
      body {
        background-color: #e7e7e7 !important;
      }
    `}</style>
    <style jsx>{`
      .container {
        padding-top: 100px;
      }
      .background {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 80vh;
        background-image: url("/static/images/overlay.png"),radial-gradient(rgba(0,0,0,0),rgba(0,0,0,0.2)), linear-gradient(45deg, #17ab61, #1760aa);
        transition: background-image 4500ms;
      }
      .background:before {
        content: "";
        display: block;
        position: absolute;
        border-radius: 100%;
        height: 200px;
        background-color: #e7e7e7;
        right: -100px;
        left: -100px;
        top: calc(80vh - 100px);
       }
    `}</style>
  </div>
)

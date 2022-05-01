
const MainContent = ({ children }) => {
  return (

      <div className="d-flex flex-column flex-root">


          <div className="d-flex flex-row flex-column-fluid page">


              <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">


                  <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                      {children}

                  </div>


                  <div id="footer"></div>

              </div>


          </div>


      </div>

  );
};

export default MainContent;

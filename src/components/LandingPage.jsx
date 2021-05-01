import React from "react";

import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <main>
        <div className="landing-page-container">
          <div className="row">
            <div className="col-md-2"></div>
            <div
              className="col-md-8 d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center landing-page-welcolme-block">
                <h1 className="text-center ">Hostel Lanus</h1>
                <p className="landing-page-phrase">
                  Un lugar para desconectar de la rutina
                </p>
                <button
                  className="landing-page-btn"
                  onClick={() => {
                    history.push("/home");
                  }}
                >
                  Entrar
                </button>
                <p className="landing-page-experience-comment">
                  "Hostel lanus es el mejor hostel en el que me he alojado,
                  tanto por la calidez de sus anfitriones como por la comodidad
                  de sus instalaciones" Peter Cantropus, 25
                </p>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default LandingPage;

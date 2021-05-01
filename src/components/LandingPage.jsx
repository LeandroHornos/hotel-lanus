import React from "react";

import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <div className="landing-page-container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="d-flex flex-column align-items-center justify-content-center landing-page-welcolme-block">
              <h1 className="text-center ">Hostel Lanus</h1>
              <Button
                block
                variant="outline-primary"
                onClick={() => {
                  history.push("/home");
                }}
              >
                Entrar
              </Button>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;

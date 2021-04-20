import React, { useState } from "react";

// Components
import NavigationBar from "./NavigationBar";

// React Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AdminPanel = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Admin Panel</h1>
          <RoomEditor />
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

const RoomEditor = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [roomType, setRoomType] = useState("shared");
  const [singleBeds, setSingleBeds] = useState(0);
  const [doubleBeds, setDoubleBeds] = useState(0);
  const [gender, setGender] = useState("mixed");
  const [imgUrl, setImgUrl] = useState("");

  const handleRoomSubmit = () => {
    const data = {
      name,
      description,
      roomType,
      singleBeds,
      doubleBeds,
      gender,
      imgUrl,
    };
    console.log(data);
    return;
  };
  return (
    <Form className="form">
      <h2 className="text-center">Nueva Habitación</h2>

      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Text className="text-muted">
          Dale un nombre a la habitación
        </Form.Text>
        <Form.Control
          value={name}
          type="text"
          placeholder="Ej: Habitación Estándar"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Tipo de habitación</Form.Label>
        <Form.Control
          as="select"
          value={roomType}
          onChange={(e) => {
            if (e.target.value === "single") {
              setGender("mixed");
            }
            setRoomType(e.target.value);
          }}
        >
          <option value="shared">Compartida</option>
          <option value="single">Individual</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Género</Form.Label>
        <Form.Control
          as="select"
          value={gender}
          disabled={roomType === "single"}
          className={roomType === "single" && "text-muted"}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="mixed">Mixta</option>
          <option value="female">Dormi Femenino</option>
          <option value="male">Dormi Masculino</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Camas</Form.Label>
        <div className="row">
          <div className="col-6">
            <Form.Text>individuales</Form.Text>
            <Form.Control
              type="number"
              value={singleBeds}
              onChange={(e) => {
                setSingleBeds(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="col-6">
            <Form.Text>matrimoniales</Form.Text>
            <Form.Control
              type="number"
              value={doubleBeds}
              onChange={(e) => {
                setDoubleBeds(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          value={description}
          rows={4}
          placeholder="Describe la habitación"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Imagen</Form.Label>
        <Form.Text className="text-muted">
          Ingresa la url de la imagen
        </Form.Text>
        <Form.Control
          type="text"
          value={imgUrl}
          placeholder="Ej /img/foto1.jpg"
          onChange={(e) => {
            setImgUrl(e.target.value);
          }}
        />
      </Form.Group>

      <Button
        block
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleRoomSubmit();
        }}
      >
        Guardar
      </Button>
    </Form>
  );
};

export default AdminPanel;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Firebase
import firebaseApp from "../firebaseApp";

// Components
import NavigationBar from "./NavigationBar";

// React Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";

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
  const history = useHistory();
  //Firebase
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();
  const batch = db.batch();
  // State
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [roomType, setRoomType] = useState("shared");
  const [singleBeds, setSingleBeds] = useState(0);
  const [doubleBeds, setDoubleBeds] = useState(0);
  const [singleBedPrice, setSingleBedPrice] = useState({
    price: 0,
    currency: "ar$",
  });
  const [doubleBedPrice, setDoubleBedPrice] = useState({
    price: 0,
    currency: "ar$",
  });
  const [roomPrice, setRoomPrice] = useState({ price: 0, currency: "ar$" });
  const [gender, setGender] = useState("mixed");
  const [imageAsFile, setImageAsFile] = useState("");
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [saving, setSaving] = useState(false);

  const validateFields = () => {
    let dataIsValid = true;
    let errors = [];
    if (name === "") {
      errors.push({
        field: "name",
        error: "Debes asignarle un nombre a la habitación",
      });
      dataIsValid = false;
    }
    if (shortDescription === "") {
      errors.push({
        field: "shortDescription",
        error: "Debes dar una descripción de la habitación",
      });
      dataIsValid = false;
    }
    if (singleBeds === 0 && doubleBeds === 0) {
      errors.push({
        field: "beds",
        error: "La habitación debe contar con al menos una cama",
      });
      dataIsValid = false;
    }
    if (imageAsFile === "") {
      errors.push({
        field: "imageAsFile",
        error: "La habitación debe contar con una foto",
      });
      dataIsValid = false;
    }
    return { dataIsValid, errors };
  };

  const createBedDocs = (singleBeds, doubleBeds, roomId) => {
    let bedDocs = [];
    for (let i = 0; i < singleBeds; i++) {
      bedDocs.push({ roomId, type: "single", subType: "", customId: `S-${i}` });
    }
    for (let i = 0; i < doubleBeds; i++) {
      bedDocs.push({ roomId, type: "double", subType: "", customId: `D-${i}` });
    }
    return bedDocs;
  };

  const handleSubmit = async () => {
    setSaving(true);
    const { dataIsValid, errors } = validateFields();

    if (dataIsValid) {
      let roomData = {
        name,
        shortDescription,
        longDescription,
        roomType,
        singleBeds,
        doubleBeds,
        singleBedPrice,
        doubleBedPrice,
        roomPrice,
        gender,
        mainImgUrl: "",
        imgUrls: [],
        amenities: {
          airConditioner: false,
          privateBathroom: false,
          breakfastIncluded: false,
          lateCheckIn: false,
          lateCheckOut: false,
          sheetsIncluded: false,
          wifi: false,
          smoker: false,
          tv: false,
        },
      };
      try {
        // Guardo la imagen principal
        await storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
        const mainImgUrl = await storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL();

        // Guardo la habitación
        roomData = { ...roomData, mainImgUrl };
        const room = await db.collection("rooms").add(roomData);
        console.log("se ha creado una habitacion", room.id);

        // Guardo las camas
        const beds = createBedDocs(singleBeds, doubleBeds, room.id);
        beds.forEach((bed) => {
          const docRef = db.collection("beds").doc();
          batch.set(docRef, bed);
        });
        await batch.commit();
        console.log("Camas:", beds);
        history.push("./rooms");
      } catch (error) {
        setSaving(false);
        setErrorMsgs([
          ...errorMsgs,
          {
            field: "saving",
            error:
              "Ha ocurrido un error al intentar guardar la habitación, por favor vuelve a intentarlo",
          },
        ]);
        console.log("Ha ocurrido un error al crear la habitacion", error);
      }
    } else {
      console.log("Data contains errors");
      setErrorMsgs(errors);
      window.scrollTo(0, 0);
      return;
    }
  };
  return (
    <Form className="form">
      <h2 className="text-center">Nueva Habitación</h2>
      {errorMsgs.map((msg) => {
        return (
          <Alert key={msg.field} variant="danger">
            {msg.error}
          </Alert>
        );
      })}
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
            if (e.target.value === "private") {
              setGender("mixed");
            }
            setRoomType(e.target.value);
          }}
        >
          <option value="shared">Compartida</option>
          <option value="private">Privada</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Género</Form.Label>
        <Form.Control
          as="select"
          value={gender}
          disabled={roomType === "private"}
          className={roomType === "private" && "text-muted"}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="mixed">Mixta</option>
          <option value="female">Femenina</option>
          <option value="male">Masculina</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Descripción corta</Form.Label>
        <Form.Text>
          Escribe una descripción corta de la habitación que de al usuario una
          idea de las características más importantes de la habitación. Esta
          información se presenta en la vista previa de las habitaciones
        </Form.Text>
        <Form.Control
          type="text"
          as="textarea"
          value={shortDescription}
          rows={2}
          placeholder="Describe resumidamente la habitación"
          onChange={(e) => {
            setShortDescription(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Descripción larga</Form.Label>
        <Form.Text>
          Detalla aquí la descripción completa de la habitación. Esta
          información se muestra cuando el usuario selecciona una habitación en
          particular para conocer todos sus detalles
        </Form.Text>
        <Form.Control
          type="text"
          as="textarea"
          value={longDescription}
          rows={6}
          placeholder="Describe detalladamente la habitación"
          onChange={(e) => {
            setLongDescription(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Camas</Form.Label>
        <div className="row">
          <div className="col-6">
            <Form.Text>Simples</Form.Text>
            <Form.Control
              type="number"
              value={singleBeds}
              onChange={(e) => {
                setSingleBeds(
                  parseInt(e.target.value >= 0 ? e.target.value : 0)
                );
              }}
            />
          </div>
          <div className="col-6">
            <Form.Text>Dobles</Form.Text>
            <Form.Control
              type="number"
              value={doubleBeds}
              onChange={(e) => {
                setDoubleBeds(
                  parseInt(e.target.value >= 0 ? e.target.value : 0)
                );
              }}
            />
          </div>
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Precio de las camas</Form.Label>
        <Form.Text>
          Si la habitacipón es compartida, se asignan los precios según el tipo
          de cama
        </Form.Text>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="basic-addon3"
              className={roomType === "private" ? "text-muted" : ""}
            >
              Cama simple por día
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            value={singleBedPrice.price}
            aria-describedby="Single bed price"
            disabled={roomType === "private"}
            onChange={(e) => {
              setSingleBedPrice({ ...singleBedPrice, price: parseFloat(e.target.value) });
            }}
          />
          <InputGroup.Append>
            <Form.Control
              as="select"
              value={singleBedPrice.currency}
              disabled={roomType === "private"}
              className={roomType === "private" ? "text-muted" : ""}
              onChange={(e) => {
                setSingleBedPrice({
                  ...singleBedPrice,
                  currency: e.target.value,
                });
              }}
            >
              <option value="ar$">AR$</option>
              <option value="usd">USD</option>
            </Form.Control>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="basic-addon3"
              className={roomType === "private" ? "text-muted" : ""}
            >
              Cama doble por día{"  "}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            value={doubleBedPrice.price}
            aria-describedby="Double bed price"
            disabled={roomType === "private"}
            onChange={(e) => {
              setDoubleBedPrice({ ...doubleBedPrice, price: parseFloat(e.target.value) });
            }}
          />
          <InputGroup.Append>
            <Form.Control
              as="select"
              value={doubleBedPrice.currency}
              disabled={roomType === "private"}
              className={roomType === "private" ? "text-muted" : ""}
              onChange={(e) => {
                setDoubleBedPrice({
                  ...doubleBedPrice,
                  currency: e.target.value,
                });
              }}
            >
              <option value="ar$">AR$</option>
              <option value="usd">USD</option>
            </Form.Control>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Precio de la habitación</Form.Label>
        <Form.Text>
          Si la habitacipón es privada, se le asigna un precio a la habitación
          completa
        </Form.Text>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="basic-addon3"
              className={roomType === "shared" ? "text-muted" : ""}
            >
              Habitación por día
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            value={roomPrice.price}
            id="basic-url"
            aria-describedby="basic-addon3"
            disabled={roomType === "shared"}
            onChange={(e) => {
              setRoomPrice({ ...roomPrice, price: parseFloat(e.target.value) });
            }}
          />
          <InputGroup.Append>
            <Form.Control
              as="select"
              value={roomPrice.currency}
              disabled={roomType === "shared"}
              className={roomType === "shared" ? "text-muted" : ""}
              onChange={(e) => {
                setRoomPrice({ ...roomPrice, currency: e.target.value });
              }}
            >
              <option value="ar$">AR$</option>
              <option value="usd">USD</option>
            </Form.Control>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Foto de portada</Form.Label>
        <Form.File
          onChange={(e) => {
            const imgFile = e.target.files[0];
            console.log("cargando imagen", imgFile);
            setImageAsFile(imgFile);
          }}
        />
      </Form.Group>
      <Button
        block
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {!saving ? (
          "Guardar"
        ) : (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </Form>
  );
};

export default AdminPanel;

/* eslint-disable no-import-assign */
import {
  Container,
  ListGroup,
  Row,
  Card,
  FormControl,
  FormGroup,
  Modal,
  Button,
  FloatingLabel,
  InputGroup,
  Toast
} from "react-bootstrap";
import db from "./db/store";
import ItemPhoneNumber from "./components/ItemPhoneNumber";
import CardHeader from "react-bootstrap/esm/CardHeader";
import MaiButton from "./components/MaiButton";
import { Search, SortAlphaUp,SortAlphaDown, Plus, Person, Phone, Check, ExclamationCircleFill, Check2Circle, Camera } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";

const App=()=> {
  const [store, setStore] = useState(db);
  const [sortPosition, setSortPosition] = useState(SortOptions.ASCENDING);
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [file,setFile] = useState("");
  const [toastShow,setToastShow]=useState(false);
  const [message, setMessage] = useState({title:"",content:"",icon:""});
  const imageRef=useRef(null)

  useEffect(()=>{
      onHandleSortedContact();
  },[])
  const onHandleSearchContact = (firstName) => {
    if(firstName.trim()===""){
      setStore(db);
      return
    }
    setStore(prev =>
      prev.filter((contact) =>
        contact.firstName.toLowerCase().includes(firstName.toLowerCase())
      )
    );
  }
  const onHandleSortedContact=()=>{

    if (sortPosition === SortOptions.DESCENDING) {
      store.sort((a, b) => {
        if (
          a.firstName.toLowerCase().charCodeAt(0) >
          b.firstName.toLowerCase().charCodeAt(0)
        ) {
          return -1;
        } else {
          return 1;
        }
      });
      setSortPosition(SortOptions.ASCENDING);
    } else {
      store.sort(
        (a, b) =>
          a.firstName.toLowerCase().charCodeAt(0) -
          b.firstName.toLowerCase().charCodeAt(0)
      );
      setSortPosition(SortOptions.DESCENDING);
    }
  }
  const onHandleAddContact=()=>{
    if(firstName.trim()===""||lastName.trim()===""||phone.trim()===""){
      setToastShow(true);
      setMessage({
        title: "Champs Vides",
        content: "Veuillez verifier si l'un des champs n'est pas vide.",
        icon: (
          <ExclamationCircleFill
            color="red"
            size={30}
            style={{ marginRight: 10 }}
          />
        ),
      });
    }else{
      setToastShow(true);
      db.push({
        id: parseInt(Math.random() * 1000),
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        image: <img width={50} height={50} src={URL.createObjectURL(file)} />,
      });
     
      setMessage({
        title: "Ajouter",
        content: "Ajouter avec success",
        icon: (
          <Check2Circle
            color="green"
            size={30}
            style={{ marginRight: 10 }}
          />
        ),
      });
      setShow(false)
    }
  }

  const onHandleClose = () =>{
    setShow(false);
    setMessage({})
    setToastShow(false)
  };
  const onHandleShow = () => setShow(true);
  const onHandleRemove=(id)=>{
    db.splice(id, 1);
    setStore(db)
  }
  return (
    <Container fluid>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Card
          style={{
            borderRadius: 10,
            width: "80vw",
            height: "100%",
          }}
        >
          <CardHeader
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <MaiButton
                  onClick={onHandleSortedContact}
                  icon={
                    sortPosition === SortOptions.DESCENDING ? (
                      <SortAlphaDown size={25} />
                    ) : (
                      <SortAlphaUp size={25} />
                    )
                  }
                />
              </div>
              <div style={{ width: "90%", marginInline: 10 }}>
                <FormGroup>
                  <FormControl
                    size="lg"
                    type="search"
                    onChange={(e) => onHandleSearchContact(e.target.value)}
                    placeholder="Rechercher par prenom"
                  />
                </FormGroup>
              </div>
              <div>
                <MaiButton icon={<Search size={20} />} />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <MaiButton
                label={"Ajouter un Contact"}
                icon={<Plus size={25} />}
                onClick={onHandleShow}
              />
            </div>
          </CardHeader>
          <Card.Body style={{ paddingInline: 50 }}>
            <ListGroup>
              {store.length == 0 ? (
                <h2 style={{ textAlign: "center" }}>Auccun Contact</h2>
              ) : (
                store.map((item, index) => (
                  <ItemPhoneNumber
                    firstName={item.firstName}
                    lastName={item.lastName}
                    index={index}
                    icon={item.image}
                    phoneNumber={item.phone}
                    key={item.id}
                    onHandleRemove={() => onHandleRemove(index)}
                  />
                ))
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Row>
      <Modal show={show} onHide={onHandleClose}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Toast show={toastShow} onClose={() => setToastShow(false)}>
            <Toast.Header>
              {message.icon}
              <strong className="me-auto">{message.title}</strong>
            </Toast.Header>
            <Toast.Body>{message.content}</Toast.Body>
          </Toast>
        </div>
        <Modal.Header closeButton>
          <Modal.Title>Phone Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div
              style={{
                width: 100,
                height: 100,
                backgroundColor: "rgba(240,240,240,1)",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                boxShadow: "0 5px 3px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <Camera size={50} />

              <label className="mai-input" htmlFor="mai-input">
                <input
                  id="mai-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                      imageRef.current.width = 100;
                      imageRef.current.height = 100;
                      imageRef.current.src = URL.createObjectURL(
                        e.target.files[0]
                      );
                    }
                  }}
                />
                <img ref={imageRef} />
              </label>
            </div>
          </div>
          <FormGroup className="mb-3" controlId="Maiform1">
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">
                <Person />
              </InputGroup.Text>

              <FloatingLabel controlId="floatingInput" label="Prenom">
                <FormControl
                  aria-describedby="inputGroupPrepend"
                  type="text"
                  placeholder="Prenom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </FloatingLabel>
            </InputGroup>
          </FormGroup>

          <FormGroup className="mb-3" controlId="Maiform2">
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">
                <Person />
              </InputGroup.Text>

              <FloatingLabel controlId="floatingInput" label="Nom">
                <FormControl
                  aria-describedby="inputGroupPrepend"
                  type="text"
                  value={lastName}
                  placeholder="Nom"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </FloatingLabel>
            </InputGroup>
          </FormGroup>

          <FormGroup className="mb-3" controlId="Maiform3">
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">
                <Phone />
              </InputGroup.Text>

              <FloatingLabel controlId="floatingInput" label="Telephone">
                <FormControl
                  aria-describedby="inputGroupPrepend"
                  type="tel"
                  value={phone}
                  placeholder="Telephone"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </FloatingLabel>
            </InputGroup>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={onHandleAddContact}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

 const SortOptions = {
   ASCENDING: "ASCENDING",
   DESCENDING: "DESCENDING",
 };

export default App;

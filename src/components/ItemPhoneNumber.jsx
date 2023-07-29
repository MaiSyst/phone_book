/* eslint-disable react/prop-types */
import {Badge, Button, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import { Trash } from "react-bootstrap-icons";
const ItemPhoneNumber = ({
  firstName,
  lastName,
  icon,
  index,
  phoneNumber,
  onHandleRemove,
}) => {
  return (
    <>
      <ListGroup.Item
        as="li"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Badge style={{ fontSize: 20, fontWeight: "bold", marginRight: 20 }}>
          {index + 1}
        </Badge>
        {icon}
        <div
          className="ms-2 me-auto"
          style={{
            color: "grey",
            marginInline: 20,
          }}
        >
          <div
            className="fw-bold"
            style={{
              fontSize: 25,
              color: "black",
            }}
          >
            {firstName} {lastName}
          </div>
          {phoneNumber}
        </div>
        <Button onClick={onHandleRemove} variant="danger">
          <Trash />
        </Button>
      </ListGroup.Item>
    </>
  );
};

ItemPhoneNumber.prototypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  index: PropTypes.number,
  phoneNumber: PropTypes.number,
  icon:PropTypes.element
};
export default ItemPhoneNumber;
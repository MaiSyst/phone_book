import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
const MaiButton=({label,icon,onClick})=> {
    return (
      <Button style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={onClick}>
        {icon}
        {label}
      </Button>
    );
}
MaiButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func
};
export default MaiButton;
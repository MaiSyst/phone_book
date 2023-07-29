import {Person,} from "react-bootstrap-icons";
import person from "../assets/person.png"
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import person3 from "../assets/person3.png";
import person4 from "../assets/person4.png";
const db = [
  {
    id: 1,
    phone: 70907890,
    firstName: "John",
    lastName: "Smith",
    image: <img width={50} height={50} src={person} alt="John" />,
  },
  {
    id: 2,
    phone: 90907890,
    firstName: "Rachel",
    lastName: "Trigon",
    image: <img width={50} height={50} src={person1} alt="Rachel" />,
  },
  {
    id: 3,
    phone: 80907890,
    firstName: "William",
    lastName: "Dodge",
    image: <img width={50} height={50} src={person2} alt="William" />,
  },
  {
    id: 4,
    phone: 80907890,
    firstName: "Aboubacar",
    lastName: "MaiSYST",
    image: <img width={50} height={50} src={person3} alt="Aboubacar" />,
  },
  {
    id: 5,
    phone: 60907890,
    firstName: "Ousmane",
    lastName: "Sidibe",
    image: <img width={50} height={50} src={person4} alt="Aboubacar" />,
  },
  {
    id: 6,
    phone: 60907890,
    firstName: "Zoumana",
    lastName: "Sidibe",
    image: <Person size={50}/>,
  },
];

export default db;
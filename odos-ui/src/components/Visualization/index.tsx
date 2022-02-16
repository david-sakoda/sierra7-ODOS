// import { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadialTree } from './radialTree';
import { data1, data2 } from './data';


export const Visualization = () => {
  
  const [data, setData] = useState(data1);
  const navigate = useNavigate();

   const invokeRoute = () => {
       navigate('/dossier/1');
   } 
  const flag = true;
  const getData = () => {
    if (flag) {
      setData(data2);
    } else {
      setData(data1);
    }
  }

  return (
    <RadialTree data={ data } options={{ invokeRoute, getData }} />
  ) 

};

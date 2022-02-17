// import { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadialTree } from './RadialTree';
import { data1, data2 } from './data';


export const Visualization = () => {
  
  const [data, setData] = useState(data1);
  const [animate, setAnimate] = useState(false);
  const [flag, setFlag] = useState(true);
  // const [gettingData, setGettingData] = useState(false);
  
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timeoutID = setTimeout(() => {
  //     setAnimate(true);
  //     if (gettingData) {
  //       setData(data1);
  //       // setFlag(false)
  //     } else {
  //       setData(data2);
  //       // setFlag(true)
  //     }
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timeoutID);
  //   };
  // }, [gettingData]);
  
  const invokeRoute = () => {
    navigate('/dossier/1');
  } 
  const getData = () => {
    setAnimate(true);
    if (flag) {
      setData(data2);
      setFlag(false)
    } else {
      setData(data1);
      setFlag(true)
    }
  }

  return (
    <RadialTree data={ data } options={{ invokeRoute, getData, animate }} />
  ) 

};

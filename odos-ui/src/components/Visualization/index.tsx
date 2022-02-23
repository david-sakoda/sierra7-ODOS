// import { useState } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RadialTree } from './radialTree';
import { data1, data2 } from './data';

export const Visualization = () => {
  
  const [data, setData] = useState({});
  const [gettingData, setGettingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // this should be replaced with an ajax call
    const timeoutID = setTimeout(() => {
      if (gettingData) {
        setData(JSON.parse(JSON.stringify(data1)));
      } else {
        setData(JSON.parse(JSON.stringify(data2)));
      }
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [gettingData]);
  
  const invokeRoute = () => {
    navigate('/dossier/1');
  } 
  const getData = () => {
    setIsLoading(true);
    setGettingData(!gettingData);
  }

  return (
    <RadialTree data={data} width={1200} height={1200} options={{ invokeRoute, getData, isLoading }} />
  ) 

};

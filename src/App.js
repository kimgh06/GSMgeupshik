import React, { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const fetching = async () => {
    try {
      const date = new Date();
      const today = (date.getFullYear().toString() + ('0' + (date.getMonth() + 1)).slice(-2).toString() + ('0' + date.getDate()).slice(-2).toString());
      const jsons = await (await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?key=bb0f24af7fbc4bc896e2be32361cb2e4&Type=json&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=${today}`)).json();
      setList(jsons.mealServiceDietInfo[1].row);
      console.log(jsons.mealServiceDietInfo[1].row);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetching();
  }, []);
  return <div>
    {list.map((i, n) => <div key={n}>
      {i.MMEAL_SC_NM}
      {i.CAL_INFO}
      <div>{i.NTR_INFO}</div>
    </div>)}
    asdfasdfasdf
  </div>;
}

export default App;

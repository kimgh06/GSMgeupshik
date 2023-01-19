import React, { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(0);
  const [add, setAdd] = useState(0);
  const fetching = async (add) => {
    try {
      setLoading(true);
      const date = new Date();
      const today = parseInt(date.getFullYear().toString() + ('0' + (date.getMonth() + 1)).slice(-2).toString() + ('0' + (parseInt(date.getDate()) + add).toString()).slice(-2).toString());
      const jsons = await (await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?key=bb0f24af7fbc4bc896e2be32361cb2e4&Type=json&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=${today}`)).json();
      setList(jsons.mealServiceDietInfo[1].row);
      console.log(today, jsons);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetching(add);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="App">
    {loading ? <span>loading</span> : <>
      <button onClick={() => {
        if (num < 1) {
          setAdd(c => c - 1);
          fetching(add - 1);
          setNum(2);
        }
        else {
          setNum(c => c - 1);
        }
      }}>◀</button>
      <div className="Main">
        <p>{list[0].MLSV_YMD}</p>
        <b>{list[num].MMEAL_SC_NM}&nbsp;</b>
        <span>총{list[num].CAL_INFO}</span>
        <div dangerouslySetInnerHTML={{ __html: list[num].DDISH_NM }} />
      </div>
      <button onClick={() => {
        if (num > 1) {
          setAdd(c => c + 1);
          fetching(add + 1);
          setNum(0);
        }
        else {
          setNum(c => c + 1);
        }
      }}>▶</button>
    </>
    }
  </div >;
}

export default App;

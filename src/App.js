import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(1);
  const [num, setNum] = useState(0);
  const [add, setAdd] = useState(0);
  const [today, setToday] = useState();
  const whatmonths = (theMonth) => {
    switch (parseInt(theMonth) % 12) {
      case 1:
        return 1; //31일
      case 2:
        return 2; //29일
      case 3:
        return 1; //31일
      case 4:
        return 0; //30일
      case 5:
        return 1; //31일
      case 6:
        return 0; //30일
      case 7:
        return 1; //31일
      case 8:
        return 1; //31일
      case 9:
        return 0; //30일
      case 10:
        return 1; //31일
      case 11:
        return 0; //30일
      case 0:
        return 1; //31일
      default:
        return -1; //머꼬?
    }
  }
  const fetching = async (add, num) => {
    try {
      setLoading(1);
      const date = new Date();
      let dates = ('0' + (parseInt(date.getDate()) + add).toString()).slice(-2).toString();
      let monAdd = 0;
      let month = ('0' + (date.getMonth() + 1 + monAdd)).slice(-2).toString();
      if (parseInt(dates) < 1) { //감소할 경우
        month = parseInt(month);
        if (whatmonths(month - 1) === 0) {
          monAdd = Math.floor(Math.abs(parseInt(dates)) / 30);
          dates = (30 - (Math.abs(parseInt(dates)) % 30)).toString();
        }
        else if (whatmonths(month - 1) === 1) {

        }
        else if (whatmonths(month - 1) === 2) {

        }
        month = ('0' + (parseInt(month) === 0 ? 12 : month + monAdd)).toString().slice(-2);
      }
      else if (parseInt(dates) > 28) { //증가할 경우
        month = parseInt(month);
        if (whatmonths(month) === 0 && parseInt(dates) > 30) {
          monAdd = Math.floor(Math.abs(parseInt(dates)) / 30);
          dates = (Math.floor(parseInt(dates) % 30)).toString();
        }
        else if (whatmonths(month) === 1 && parseInt(dates) > 31) {
          monAdd = Math.floor(Math.abs(parseInt(dates)) / 31);
          dates = (Math.floor(parseInt(dates) % 31)).toString();
        }
        else if (whatmonths(month) === 2) {
          monAdd = Math.floor(Math.abs(parseInt(dates)) / 28);
          dates = (Math.floor(parseInt(dates) % 28)).toString();
        }
        dates = ('0' + dates).toString().slice(-2);
        month = ('0' + (parseInt(month) === 0 ? 12 : parseInt(month) + monAdd)).toString();
      }
      setToday(parseInt(date.getFullYear().toString() + month + dates));
      const jsons = await (await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?key=bb0f24af7fbc4bc896e2be32361cb2e4&Type=json&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=${date.getFullYear().toString() + month + dates}`)).json();
      if (JSON.stringify(jsons) !== JSON.stringify({ "RESULT": { "CODE": "INFO-200", "MESSAGE": "해당하는 데이터가 없습니다." } }) && num < jsons.mealServiceDietInfo[1].row.length) {
        setList(jsons.mealServiceDietInfo[1].row);
        setLoading(0);
      } else {
        setLoading(-1);
        console.log('it has error');
      }
      console.log(date.getFullYear().toString() + month + dates, jsons);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetching(add, num);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="App">
    <div className="left buttons">
      <button onClick={() => {
        if (num < 1) {
          setAdd(c => c - 1);
          fetching(add - 1, 2);
          setNum(2);
        }
        else {
          fetching(add, num - 1);
          setNum(c => c - 1);
        }
      }}>◀</button>
    </div>
    <div className="MainContents">
      <p>{today}&nbsp;{num + 1}번째</p>
      {loading === 1 ? <span>loading</span> : (loading === -1 ? <div className="NotFound">급식이 없어요.</div> : <>
        <div className="List">
          <p>{list[0].MLSV_TO_YMD}</p>
          <b>{list[num].MMEAL_SC_NM}&nbsp;</b>
          <span>총{list[num].CAL_INFO}</span>
          <div dangerouslySetInnerHTML={{ __html: list[num].DDISH_NM }} />
        </div>
      </>)}
    </div>
    <div className="right buttons">
      <button onClick={() => {
        if (num > 1) {
          setAdd(c => c + 1);
          fetching(add + 1, 0);
          setNum(0);
        }
        else {
          fetching(add, num + 1);
          setNum(c => c + 1);
        }
      }}>▶</button>
    </div>
  </div >;
}

export default App;

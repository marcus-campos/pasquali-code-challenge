import React, { useState, useEffect } from "react";
import "./App.css";
import TweetList from "./components/list";
import TweetInsight from "./components/insights";
import api from "./services/http";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { CSVLink, CSVDownload } from "react-csv";

function App() {
  const [tweets, setTweets] = useState({ statuses: [], insights: [] });
  const [search, setSearch] = useState("from:nasa");
  const [showTweets, setShowTweets] = useState(true);
  const [csvData, setCsvData] = useState([]);

  const loadCsvData = async tweets => {
    console.log(tweets);
    let data = [["Nome", "Usuário", "Tweet"]];

    for (let status in tweets["statuses"]) {
      status = tweets["statuses"][status];
      let user = status.user.name;
      let screen_name = status.user.screen_name;
      let text = status.text;
      data.push([user, screen_name, text]);
    }

    data.push(["", ""]);
    for (let insight in tweets["insights"]) {
      data.push(["", ""]);
      data.push([insight, "Total"]);

      for (let value in tweets["insights"][insight]) {
        data.push([value, tweets["insights"][insight][value]]);
      }
    }

    setCsvData(data);
  };

  const showInsights = async => {
    if (showTweets) {
      setShowTweets(false);
    } else {
      setShowTweets(true);
    }
  };

  const loadMoreFetchTweets = async params => {
    const result = await api.get("/twitter/tweets/" + params);
    if (result.status === 200) {
      await setTweets(result.data);
      await loadCsvData(result.data);
    }
  };

  const fetchTweets = async () => {
    const result = await api.get("/twitter/tweets/?q=" + search + "&count=50");
    if (result.status === 200) {
      await setTweets(result.data);
      await loadCsvData(result.data);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className="App">
      <div className="Container">
        <div className="searchBar">
          <Tooltip title="Você pode fazer pesquisas usando operadores, ex: from:nasa irá exibir todos os tweets enviados pela conta @nasa, para mais operadores acesse: https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators">
            <TextField
              id="standard-basic"
              label="Digite a sua pesquisa"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
          </Tooltip>
          <Button variant="primary" onClick={fetchTweets}>
            Pesquisar
          </Button>
        </div>

        <div>
          {showTweets ? (
            <TweetList tweets={tweets} />
          ) : (
            <TweetInsight tweets={tweets} />
          )}
        </div>

        {tweets["statuses"].length > 0 ? (
          <div className="footer">
            <CSVLink data={csvData} separator={";"} filename={"tweets.csv"}>
              <Button variant="primary">
                { "Exportar dados" }
              </Button>
            </CSVLink>
            <Button variant="primary" onClick={() => showInsights()}>
              {showTweets ? "Ver insights" : "Ver tweets"}
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                loadMoreFetchTweets(tweets["search_metadata"]["next_results"])
              }
            >
              Carregar mais
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

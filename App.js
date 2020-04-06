import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";
import Article from "./src/components/Article";

export default function App() {
  const url =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=896b2115870e4b138219932078a82bc5";

  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  async function fetchArticles() {
    const res = await fetch(url);
    res
      .json()
      .then((res) => {
        setArticles(res.articles);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setRefreshing(false);
      });
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchArticles();
  };

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => {
        return <Article article={item} />;
      }}
      keyExtractor={(item) => item.url}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />

    // <Text>{JSON.stringify(articles)}</Text>
  );
}

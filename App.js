import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import Article from "./src/components/Article";
import AppStatusBar from "./src/components/AppStatusBar";

const THEME_COLOR = "#285E29";

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
    <React.Fragment>
      <Text style={styles.header}>AJ News App</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={articles}
          renderItem={({ item }) => {
            return <Article article={item} />;
          }}
          keyExtractor={(item) => item.url}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME_COLOR,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});

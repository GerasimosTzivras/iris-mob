import React, { useState, useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import DocumentsApi from "../documents/api/api";
import { useAuth } from "../Login/utils/store";

export default function PendingScreen(props) {
  const { token, profile } = useAuth();
  const [documents, setDocuments] = useState([]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const documentsApi = new DocumentsApi(
        token,
        profile.department.id,
        profile.title.id
      );
      const pendingDocuments = await documentsApi.queries.getPendingDocuments();
      setDocuments(pendingDocuments.data);
      console.log(pendingDocuments);
    };
    fetchData();
  }, [token, profile.department.id, profile.title.id]);

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View
        style={{
          borderColor: "black",
          borderWidth: 2,
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <TableCellItem label="Προτεραιότητα" value={item.priority} />
        <TableCellItem label="Διαβάθμιση" value={item.classification} />
        <TableCellItem label="Τύπος" value={item.type} />
        <TableCellItem label="Θέμα" value={item.subject} />
        <TableCellItem label="Εκδότης" value={item.publisher} />
        <TableCellItem label="Συντάκτης" value={item.author} />
        <TableCellItem label="Ημ. Έκδοσης" value={item.date} />
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={documents}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}

function TableCellItem({ label, value }) {
  return (
    <>
      <Text>
        <b>{label}:</b> {value}
      </Text>
    </>
  );
}

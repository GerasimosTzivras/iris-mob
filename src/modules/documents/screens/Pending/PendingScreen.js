import React, { useState, useLayoutEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";
import styles from "./styles";
import DocumentsApi from "../../../../screens/documents/api/api";
import { useAuth } from "../../../../screens/Login/utils/store";
import MenuImage from "../../../../components/MenuImage/MenuImage";
import { usePagination } from "../../usePagination";
import PageSizesSelect from "../PageSizesSelect";
import PaginationLinks from "../PaginationLinks";

export default function PendingScreen(props) {
  const { token, profile } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [pagination, setPagination] = useState({});
  const { navigation } = props;
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    filter: "",
  });
  const handleChangeParams = ({ pageNumber, pageSize, filter }) => {
    setParams({
      pageNumber,
      pageSize,
      filter,
    });
  };

  const {
    page,
    pageSize,
    pageSizeOptions,
    pageDisplay,
    onPageChange,
    onPageSizeChange,
  } = usePagination(pagination.totalRecords, params, handleChangeParams);

  const onPressRecipe = (item) => {
    navigation.navigate("ViewDocument", { item });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const documentsApi = new DocumentsApi(
        token,
        profile.department.id,
        profile.title.id
      );
      const pendingDocuments = await documentsApi.queries.getPendingDocuments();
      setDocuments(pendingDocuments.data);
      setPagination(pendingDocuments.pagination);
      console.log(pendingDocuments);
    };
    fetchData();
  }, [token, profile.department.id, profile.title.id, params]);

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item.id)}
    >
      <View
        style={{
          borderColor: "rgba(64, 150, 255,0.5)",
          borderWidth: 1,
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
      <div>
        <PageSizesSelect
          options={pageSizeOptions}
          value={pageSize}
          onChange={onPageSizeChange}
        />
        <div>
          <b>{pageDisplay}</b>
        </div>
        <PaginationLinks
          page={page}
          pages={pagination.totalPages}
          onClick={onPageChange}
        />
      </div>
    </View>
  );
}

function TableCellItem({ label, value }) {
  return (
    <>
      <Text style={{ margin: "1%" }}>
        <b>{label}:</b> {value}
      </Text>
    </>
  );
}

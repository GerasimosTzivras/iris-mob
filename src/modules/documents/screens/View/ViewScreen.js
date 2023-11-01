import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";

import styles from "./styles";
import DocumentsApi from "../../../../screens/documents/api/api";
import BackButton from "../../../../components/BackButton/BackButton";
import { useAuth } from "../../../../screens/Login/utils/store";
import clsx from "clsx";
import "./viewStyles.css";

const { width: viewportWidth } = Dimensions.get("window");

export default function ViewScreen(props) {
  const { navigation, route } = props;
  const { token, profile } = useAuth();
  const [document, setDocument] = useState({});

  const documentId = route.params?.item;
  // const category = getCategoryById(item.categoryId);
  // const title = getCategoryName(category.id);

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
    const fetchData = async () => {
      const documentsApi = new DocumentsApi(
        token,
        profile.department.id,
        profile.title.id
      );
      const pendingDocuments = await documentsApi.queries.getDocument(
        documentId
      );
      setDocument(pendingDocuments.data);
      console.log(pendingDocuments);
    };
    fetchData();
  }, [documentId]);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  // const onPressIngredient = (item) => {
  //   var name = getIngredientName(item);
  //   let ingredient = item;
  //   navigation.navigate("Ingredient", { ingredient, name });
  // };
  const folderLabel = document.type === "Σήμα" ? "SIC" : "Φάκελος";
  // const dateDisplay = new Date(
  //   Date.parse(document.date?.split("/").reverse().join("-"))
  // ).toLocaleDateString("el-GR", { dateStyle: "full" });

  return (
    <ScrollView style={styles.container}>
      <Button radius={"sm"} type="solid">
        Save
        <Icon name="save" color="white" />
      </Button>
      <Button radius={"sm"} type="solid">
        Save
        <Icon name="save" color="white" />
      </Button>
      {document && (
        <ViewCard>
          <Card>
            <Card.Title>Έγγραφο</Card.Title>
            <Card.Divider />
            <Row label="Θέμα">
              <span className={clsx("lead", "fw-bold")}>
                {document.subject}
              </span>
            </Row>
            <Row label="Τύπος">{document.type}</Row>
            <Row label="Προτεραιότητα">
              <span className={clsx("badge", "bg-primary")}>
                {document.priority}
              </span>
            </Row>
            <Row label="Διαβάθμιση">
              <span className={clsx("badge", "bg-primary")}>
                {document.classification}
              </span>
            </Row>
            <Row label={folderLabel}>{document.folder || "-"}</Row>
            {document.isMaster ? null : (
              <>
                <Row label="Αριθμός Πρωτοκόλλου">{document.regNo || "-"}</Row>
                <Row label="Αριθμός Σχεδίου">{document.outboundNo || "-"}</Row>
              </>
            )}
            <Row label="Ημερομηνία">{document.date}</Row>
            <Row label="Έκδοση">{document.version}η</Row>
            <Row label="Συντάκτης">{document.author}</Row>
            <Row label="Τελικός Υπογράφων">{document.lastApproval || "-"}</Row>
            <Row label="Σημειώσεις">{document.remarks || "-"}</Row>
            <Row label={document.isMaster ? "Δείκτες" : "Σχετικά"}>
              {/* {document.references.length === 0 ? "-" : null} */}
              {/* {document.references.map((item, idx) => (
              <DetailsReferenceItem
                key={idx}
                item={item}
                docId={document.id}
                index={idx}
                isMaster={document.isMaster}
                onDownload={onDownload}
              />
            ))} */}
            </Row>
          </Card>
          {/* {document.approval.length > 0 && (
            <Card>
              <Card.Title>Υπογραφές</Card.Title>
              <Card.Divider />
              <DocumentApprovalView approval={document.approval} />
            </Card>
          )} */}
        </ViewCard>
      )}
    </ScrollView>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ marginBottom: "1%" }}>
      <Text h4>{label}</Text>
      <br />
      <Text>{children}</Text>
    </div>
  );
}

function ViewCard({ children }) {
  return (
    <div
      style={{
        borderColor: "rgba(64, 150, 255,0.5)",
        borderWidth: " 1",
        margin: "1%",
      }}
    >
      {children}
    </div>
  );
}

function DocumentApprovalView({ approval }) {
  return approval.map((a, idx) => (
    <>
      <Text>
        `{idx + 1}.{" "}
        {a.isNextSignee ? (
          <i className="bi bi-pen me-2 text-primary" title="Για Υπογραφή"></i>
        ) : null}
        {a.positionName} {a.dutyName}
      </Text>
    </>
  ));
}

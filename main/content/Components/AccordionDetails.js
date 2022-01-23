import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { Row, Rows, Table } from "react-native-table-component";
import AnimatedArrow from "./AnimatedArrow";
import StandardPageDeliminator from "./StandardPageDeliminator";

const AccordionDetails = ({ sectionData }) => {
  const [activeSections, setActiveSections] = useState([]);

  return (
    <View>
      <Accordion
        sections={sectionData}
        sectionContainerStyle={styles.accordianContainer}
        activeSections={activeSections}
        renderContent={renderContent}
        renderHeader={renderHeader}
        underlayColor="rgba(52, 52, 52, .1)"
        onChange={(activeSections) => {
          setActiveSections(activeSections);
        }}
        testID="accordion"
      />
    </View>
  );
};

const renderPurchasesTable = (purchases) => {
  const purchasesHeaderData = ["Quantity Purchased", "Purchase Date"];
  const purchasesRowData = purchases.map((purchase) => [
    purchase.productsPurchased,
    purchase.purchaseDate.toLocaleDateString(),
  ]);
  return (
    <Table>
      <Row data={purchasesHeaderData} />
      <Rows data={purchasesRowData} />
    </Table>
  );
};

const renderContent = ({ purchases }) => (
  <View>
    <StandardPageDeliminator />
    {renderPurchasesTable(purchases)}
  </View>
);

const renderHeader = (productVariant, _, isActive) => (
  <View style={styles.detailsHeaderContainer}>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{productVariant.brand}</Text>
    </View>
    <Text>Products on Hand: {productVariant.productsOnHand}</Text>
    <Text>Units per product: {productVariant.unitsPerProduct}</Text>
    <View style={styles.detailsHeaderText}>
      <Text style={{ paddingRight: 4 }}>Purchase Details</Text>
      <AnimatedArrow down={isActive} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 5,
  },
  titleText: {
    fontWeight: "bold",
  },
  detailsHeaderContainer: {},
  detailsHeaderText: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  accordianContainer: {
    borderColor: "dodgerblue",
    borderRadius: 5,
    borderWidth: 3,
    backgroundColor: "deepskyblue",
    padding: 2,
    margin: 5,
  },
  purchaseDetailsContainer: {
    margin: 3,
  },
});

export default AccordionDetails;
export const forTesting = {
  renderPurchasesTable,
  renderContent,
  renderHeader,
};

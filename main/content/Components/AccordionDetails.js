import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Accordion from "react-native-collapsible/Accordion";
import { Row, Rows, Table } from "react-native-table-component";
import StandardPageDeliminator from "./StandardPageDeliminator";


const AccordionDetails = ({sectionData}) => {
    const [activeSections, setActiveSections] = useState([0]);

    const renderPurchasesTable = (purchases) => {
        const purchasesHeaderData = ["Quantity Purchased", "Purchase Date"];
        const purchasesRowData = purchases.map((purchase) => [purchase.productsPurchased, purchase.purchaseDate.toLocaleDateString()]);
        return (
            <Table>
                <Row data={purchasesHeaderData}/>
                <Rows data={purchasesRowData}/>
            </Table>
        );
    }

    const renderContent = ({purchases}) => (
        <View>
            <StandardPageDeliminator/>
            {renderPurchasesTable(purchases)}
        </View>
    );

    const renderHeader = (productVariant) => (
        <View style={styles.detailsHeaderContainer}>
            <Text>Products on Hand: {productVariant.productsOnHand}</Text>
            <Text>Units per product: {productVariant.unitsPerProduct}</Text>
            <Text style={styles.detailsHeaderText}>Purchase Details ▼</Text>
        </View>
    );

    const renderSectionTitle = (productVariant) => (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{productVariant.brand}</Text>
        </View>
    );

    return (
        <View>
            <Accordion
                sections={sectionData}
                sectionContainerStyle={styles.accordianContainer}
                activeSections={activeSections}
                renderSectionTitle={renderSectionTitle}
                renderContent={renderContent}
                renderHeader={renderHeader}
                onChange={(activeSections) => {setActiveSections(activeSections)}}
            />
        </View>
    )
}

export default AccordionDetails;

const styles = StyleSheet.create({
    titleContainer: {
        marginLeft: 5
    },
    titleText: {
        fontWeight: 'bold'
    },
    detailsHeaderContainer: {
        
    },
    detailsHeaderText: {
        textAlign: 'right',
        marginRight: 5,

    },
    accordianContainer: {
        borderColor: 'dodgerblue',
        borderRadius: 5,
        borderWidth: 3,
        backgroundColor: 'deepskyblue',
        padding: 2,
        margin: 5
    },
    purchaseDetailsContainer: {
        margin: 3
    }
});
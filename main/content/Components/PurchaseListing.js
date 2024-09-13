import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Svg, Path } from 'react-native-svg';

const MAX_ITEM_ICONS = 5;

export default function PurchaseListing({ purchaseHistory }) {
  const renderItem = ({ item }) => { 
    const total = item.productsPurchased;
    const totalExpired = item.expiredQuantity ?? 0;
    const totalNonexpiredItems = total - totalExpired;
    const nonexpiredToShow = Math.min(totalNonexpiredItems, MAX_ITEM_ICONS);
    const expiredToShow = Math.min(MAX_ITEM_ICONS - nonexpiredToShow, totalExpired)
    
    return (
    <View style={styles.itemContainer} testID="FlatListItem">
      <View>
        <Text style={styles.itemTitle}>{formatDateWithoutTimezone(item.purchaseDate)}</Text>
        <Text style={styles.itemSubtitle}>
          {item.productsPurchased} purchased{totalNonexpiredItems > 0 ? `, ${totalNonexpiredItems} left` : ""}
        </Text>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.quantityContainer}>
          {Array.from({ length: nonexpiredToShow }).map((_, index) => (
            <FishIcon key={index} style={styles.iconPrimary} testID="FishIcon" />
          ))}
          { expiredToShow > 0 && (
            <View style={styles.expiredQuantityContainer}>
              {Array.from({ length: expiredToShow }).map((_, index) => (
                <FishIcon key={index} style={styles.iconExpired} testID="FishIconExpired" />
              ))}
            </View>
          )}
          {total > 5 && <Text style={styles.moreIcon}>...</Text>}
        </View>
      </View>
    </View>
  )};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Purchase History</Text>
      <FlatList
        data={purchaseHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

function FishIcon(props) {
  return (
    <Svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
      <Path d="M18 12v.5" />
      <Path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
      <Path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
      <Path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
      <Path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
    </Svg>
  );
}

const formatDateWithoutTimezone = (date) => {
  const d = new Date(date);
  const day = d.getUTCDate().toString().padStart(2, '0');
  const month = (d.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
  const year = d.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemSubtitle: {
    color: "#6b7280",
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiredQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconPrimary: {
    width: 20,
    height: 20,
    color: "#2563eb",
  },
  iconExpired: {
    width: 20,
    height: 20,
    color: "#ef4444",
    textDecorationLine: "line-through",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

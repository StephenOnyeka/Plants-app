import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Star, ShoppingCart } from "lucide-react-native";
import CustomText from "@/components/CustomText";

type Plant = {
  id: number;
  title: string;
  description: string;
  category: string;
  stars: number;
  image: any;
};

const RenderPlantCard = ({ item }: { item: Plant }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={item.image}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <CustomText style={[styles.title, { fontFamily: "PoppinsSemiBold" }]}>
          {item.title}
        </CustomText>
        <CustomText style={[styles.categoryText, { fontFamily: "Poppins" }]}>
          Category: {item.category}
        </CustomText>
        <View style={styles.footer}>
          <View style={styles.starPill}>
            <Star size={12} color={"green"} fill={"green"} />
            <Text style={styles.starText}>{item.stars}</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <ShoppingCart size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RenderPlantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#15803d",
    borderRadius: 24,
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: 256,
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 30,
    marginTop: 8,
    color: "white",
  },
  categoryText: {
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  starPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#bbf7d0",
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  starText: {
    color: "#15803d",
  },
  cartButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 9999,
    padding: 8,
  },
});

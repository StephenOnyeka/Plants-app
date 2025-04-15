import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { categories } from "@/constants";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from 'react-native-snap-carousel';
// import CarouselLib from 'react-native-snap-carousel'
import CustomText from "@/components/CustomText";

type Plant = {
  id: number;
  title: string;
  description: string;
  category: string;
  stars: number;
  image: any; // Use 'ImageSourcePropType' if you want stricter typing for images
};

const plantData: Plant[] = [
  {
    id: 1,
    title: "Succulent",
    description: "Thrives indoors all year round.",
    category: "Indoor",
    stars: 4.5,
    image: require("@/assets/plants/7.jpeg"),
  },
  {
    id: 2,
    title: "Fiddle Leaf Fig",
    description: "Perfect for home or office.",
    category: "Indoor",
    stars: 4.7,
    image: require("@/assets/plants/8.jpeg"),
  },
  {
    id: 3,
    title: "Palm Branch",
    description: "Adds a tropical vibe.",
    category: "Outdoor",
    stars: 4.3,
    image: require("@/assets/plants/1.jpeg"),
  },
  {
    id: 4,
    title: "Bird of Paradise",
    description: "Elegant and vibrant.",
    category: "Outdoor",
    stars: 4.8,
    image: require("@/assets/plants/2.jpeg"),
  },
  {
    id: 5,
    title: "Artificial Fiddle Leaf",
    description: "Low maintenance beauty.",
    category: "Indoor",
    stars: 4.6,
    image: require("@/assets/plants/3.jpeg"),
  },
  {
    id: 6,
    title: "Succulent Vase",
    description: "Compact and stylish.",
    category: "Indoor",
    stars: 4.4,
    image: require("@/assets/plants/4.jpeg"),
  },
  {
    id: 7,
    title: "Leafy Green",
    description: "Fresh and vibrant.",
    category: "Garden",
    stars: 4.2,
    image: require("@/assets/plants/5.jpeg"),
  },
  {
    id: 8,
    title: "Artificial Palm",
    description: "Tropical and evergreen.",
    category: "Outdoor",
    stars: 4.9,
    image: require("@/assets/plants/6.jpeg"),
  },
];

// const renderPlantCard = ({ item }: { item: Plant }) => (
//   <View style={{ alignItems: "center", padding: 10 }}>
//     <Image
//       source={item.image}
//       style={{ width: 150, height: 150, borderRadius: 10 }}
//     />
//     <CustomText className="text-lg font-PoppinsSemiBold mt-2">
//       {item.title}
//     </CustomText>
//     <CustomText className="text-sm text-gray-500">
//       {item.description}
//     </CustomText>
//     <CustomText className="text-sm text-gray-500">
//       Category: {item.category}
//     </CustomText>
//     <CustomText className="text-sm text-yellow-500">⭐ {item.stars}</CustomText>
//   </View>
// );
const renderPlantCard = ({ item }: { item: Plant }) => {
  console.log(item); // Debugging
  return (
    <View style={{ alignItems: "center", padding: 10 }}>
      <Image
        source={item.image}
        style={{ width: 150, height: 150, borderRadius: 10 }}
      />
      <CustomText className="text-lg font-PoppinsSemiBold mt-2">
        {item.title}
      </CustomText>
      <CustomText className="text-sm text-gray-500">
        {item.description}
      </CustomText>
      <CustomText className="text-sm text-gray-500">
        Category: {item.category}
      </CustomText>
      <CustomText className="text-sm text-yellow-500">
        ⭐ {item.stars}
      </CustomText>
    </View>
  );
};

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textInput: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    },
    text: {
      fontFamily: "PoppinsSemiBold",
      fontSize: 16, // Add a valid property like fontSize
      color: "#000",
    },
  });
  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          <View className="flex flex-col gap-y-4 py-4">
            <View style={styles.container}>
              <Ionicons
                name="menu-outline"
                size={30}
                className="rounded-full"
              />
              <Ionicons
                name="cart-outline"
                size={30}
                className="rounded-full"
              />
            </View>
            <View className="flex-1 mt-4">
              <CustomText className="text-4xl font-PoppinsSemiBold">
                Top Picks
              </CustomText>
            </View>

            <View
              className="bg-gray-200 rounded-xl p-2 px-6 flex-row items-center mx-2"
              style={{
                justifyContent: "space-between",
              }}
            >
              <Ionicons name="search-outline" size={20} color="#9ca3af" />
              <TextInput
                placeholder="Search Product"
                placeholderClassName="font-Poppins "
                className="font-Poppins text-black text-base py-2"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginHorizontal: 12,
                }}
                placeholderTextColor="#9ca3af"
              />
              <Ionicons name="mic-outline" size={20} color="#9ca3af" />
            </View>
          </View>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              // keyExtractor={(item) => item.id}
              className="overflow-visible font-Poppins"
              renderItem={({ item }) => {
                let isActive = item.id === activeCategory;
                let activeTextClass = isActive ? "text-white" : "text-gray-700";
                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(item.id)}
                    style={{
                      backgroundColor: isActive ? "#15803d" : "#00000012",
                    }}
                    className="p-2 px-5 rounded-full mr-2 text-green-700"
                  >
                    <CustomText
                      className={`font-PoppinsSemiBold + ${activeTextClass}`}
                    >
                      {item.title}
                    </CustomText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{ marginVertical: 20 }}>
            {/* <Carousel
              data={plantData}
              renderItem={renderPlantCard}
              sliderWidth={300}
              itemWidth={200}
              loop={true}
              layout={'default'}
            /> */}
            <Carousel
              data={plantData}
              renderItem={renderPlantCard}
              sliderWidth={300}
              itemWidth={200}
              loop={true}
              layout={'default'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

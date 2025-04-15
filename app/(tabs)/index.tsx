import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { categories } from "@/constants";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import CustomText from "@/components/CustomText";
import RenderPlantCard from "@/components/RenderPlantCard";
import plantData from "@/constants/plantData";

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
                name="person-circle"
                size={30}
                className="rounded-full"
                // color={"green"}
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

          <View style={{}} className="mt-8">
            <Carousel
              data={plantData}
              renderItem={({ item }) => <RenderPlantCard item={item} />}
              inactiveSlideOpacity={0.65} // opacity of inactive slides
              inactiveSlideScale={0.77} //size of inactive slides
              sliderWidth={350}
              itemWidth={250}
              loop={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

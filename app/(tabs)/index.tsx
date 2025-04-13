import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          <View>
          <Text className="italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            ipsa ab consectetur ut vitae excepturi molestiae et quod
            perspiciatis atque aliquam laudantium maiores expedita sapiente,
            dolorem accusantium facere, eos laboriosam tempore ea fugit pariatur
            omnis vero. Excepturi, voluptate nostrum? Tempora molestiae magni
            maiores ut cupiditate aliquam aspernatur veritatis esse, labore,
            repellat facilis ullam ad laboriosam dolor, quasi ab commodi
            temporibus minima. Magni totam distinctio fuga ullam quasi vel fugit
              delectus veniam blanditiis, reiciendis harum offic
              iis consequatur
            illo consectetur eius, accusamus corrupti dolores sint debitis ea
            cum! Sapiente repellendus quia omnis eum, nemo odio temporibus
            voluptates alias est, saepe sunt reiciendis quam odit dicta illo sit
            quaerat qui incidunt aliquid nobis aliquam. Cum, esse quod dolorem
            quo asperiores culpa quasi at nihil soluta eaque molestiae ullam
            ipsum iusto, harum tempore provident omnis mollitia ipsa odit. Eius
            ex nisi et temporibus suscipit! Autem fugiat ea, totam fugit aliquid
          </Text></View>
          <View className="">
            <Link
              className="border rounded-xl text-center mt-10 p-4"
              href={"/demo"}
            >
              Demo
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

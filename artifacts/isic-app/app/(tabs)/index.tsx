import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CARD_DATA = [
  {
    id: "1",
    type: "ISIC",
    cardNumber: "S 420 300 690 098 J",
    validity: "Platí do 31.12. 2026",
    bg: "#1C3A6E",
  },
];

const LIMITED_OFFERS = [
  {
    id: "1",
    title: "Pronajmi si nový MacBook Neo již od 333 Kč měsíčně",
    expiresAt: "14. 4. 2026",
    partner: "iWant Apple Premium Partner",
    bg: "#8B5CF6",
    accent: "#A78BFA",
  },
  {
    id: "2",
    title: "Speciální nabídka jen pro studenty",
    expiresAt: "20. 5. 2026",
    partner: "Student Partner",
    bg: "#6C63FF",
    accent: "#8C85FF",
  },
];

const DISCOUNTS = [
  {
    id: "1",
    name: "CK Blue Style",
    desc: "Sleva 1400 Kč při vytvoření závazné rezervace záje...",
    tags: ["2 slevy", "online"],
    categories: 2,
  },
  {
    id: "2",
    name: "UniCredit Bank",
    desc: "Studentský účet zdarma s odměnou 2 200 Kč a v...",
    tags: ["1 sleva", "online", "v 111 pobočkách"],
    categories: 1,
  },
  {
    id: "3",
    name: "nadotec",
    desc: "Sleva 23 % na veškerý nezlevněný sortiment",
    tags: ["1 sleva", "online"],
    categories: 1,
  },
  {
    id: "4",
    name: "iWant Apple Premium Partner",
    desc: "Staň se členem Flex Academy • 10 % sleva na Mac ...",
    tags: ["5 slev", "online", "v 12 pobočkách"],
    categories: 5,
  },
];

const DISCOUNT_COLORS = [
  { bg: "#D6ECF8", icon: "#3B9CD8" },
  { bg: "#D6D6F5", icon: "#6C63FF" },
  { bg: "#D6F0ED", icon: "#30B8B8" },
  { bg: "#D6F5E0", icon: "#30B88A" },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeCard, setActiveCard] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const topPad = insets.top;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={styles.headerTitle}>Nástěnka</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Feather name="bell" size={22} color="#1C1B2E" />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Moje průkazy</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Všechny průkazy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.92}
        onPress={() => router.push("/card-detail")}
        style={styles.cardContainer}
      >
        <View style={styles.isicCard}>
          <View style={styles.isicCardLeft}>
            <View style={styles.isicBadge}>
              <Text style={styles.isicBadgeText}>ISIC</Text>
            </View>
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Text style={styles.cardNumber}>S 420 300 690 098 J</Text>
              <Text style={styles.cardValidity}>Platí do 31.12. 2026</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.showCardBtn} onPress={() => router.push("/card-detail")}>
            <Text style={styles.showCardBtnText}>Ukázat</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.uniqaCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.uniqaTitle}>Vyrážíte za dobrodružstvím?</Text>
          <Text style={styles.uniqaDesc}>
            Přibavte si na cesty cestovní pojištění od UNIQA za zvýhodněnou cenu. Pokud už od nás pojištění máte, stačí si ho přidat.
          </Text>
          <TouchableOpacity style={styles.moreInfoBtn}>
            <Text style={styles.moreInfoText}>Více informací</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.uniqaLogo}>
          <Text style={styles.uniqaLogoText}>UNIQA</Text>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>
          Limitované nabídky{" "}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>6</Text>
          </View>
        </Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Zobrazit vše</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={LIMITED_OFFERS}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH - 32}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 32));
          setActiveOffer(idx);
        }}
        renderItem={({ item }) => (
          <View style={[styles.limitedOfferCard, { width: SCREEN_WIDTH - 32, backgroundColor: item.bg }]}>
            <View style={styles.limitedOfferContent}>
              <View style={styles.laptopEmoji}>
                <Text style={{ fontSize: 36 }}>💻</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.limitedOfferTitle}>{item.title}</Text>
              </View>
            </View>
            <View style={styles.limitedOfferFooter}>
              <Text style={styles.limitedExpiry}>Končí {item.expiresAt}</Text>
              <Text style={styles.limitedPartner}>{item.partner}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.dotContainer}>
        {LIMITED_OFFERS.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeOffer === i ? styles.dotActive : {}]}
          />
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Doporučené slevy</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Všechny slevy</Text>
        </TouchableOpacity>
      </View>

      {DISCOUNTS.map((item, index) => {
        const colorSet = DISCOUNT_COLORS[index % DISCOUNT_COLORS.length];
        return (
          <TouchableOpacity key={item.id} style={styles.discountCard} activeOpacity={0.85}>
            <View style={[styles.discountImg, { backgroundColor: colorSet.bg }]}>
              <Feather name="tag" size={24} color={colorSet.icon} />
            </View>
            <View style={styles.discountInfo}>
              <Text style={styles.discountName}>{item.name}</Text>
              <Text style={styles.discountDesc} numberOfLines={2}>
                {item.desc}
              </Text>
              <View style={styles.tagRow}>
                {item.tags.map((t, ti) => (
                  <View key={ti} style={styles.tag}>
                    <Text style={styles.tagText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.heartBtn}>
              <Feather name="heart" size={18} color="#C7C7CC" />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.allDiscountsBtn}>
        <Text style={styles.allDiscountsBtnText}>Všechny slevy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#F2F3F7",
  },
  headerTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 22,
    color: "#1C1B2E",
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#1C1B2E",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionLink: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#6C63FF",
  },
  badge: {
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 4,
  },
  badgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#ffffff",
  },
  cardContainer: {
    marginHorizontal: 20,
  },
  isicCard: {
    backgroundColor: "#1C3A6E",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  isicCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  isicBadge: {
    backgroundColor: "#30B8B8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  isicBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#ffffff",
    letterSpacing: 1,
  },
  cardNumber: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#ffffff",
  },
  cardValidity: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#A0B8D8",
    marginTop: 2,
  },
  showCardBtn: {
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  showCardBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#ffffff",
  },
  uniqaCard: {
    margin: 20,
    marginTop: 12,
    backgroundColor: "#EEEDFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  uniqaTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#1C1B2E",
    marginBottom: 6,
  },
  uniqaDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#5A5A7A",
    lineHeight: 18,
    marginBottom: 10,
  },
  moreInfoBtn: {
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: "flex-start",
  },
  moreInfoText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#ffffff",
  },
  uniqaLogo: {
    marginLeft: 12,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  uniqaLogoText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: 1,
  },
  limitedOfferCard: {
    borderRadius: 16,
    padding: 16,
    height: 160,
    marginRight: 12,
    justifyContent: "space-between",
  },
  limitedOfferContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  laptopEmoji: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  limitedOfferTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#ffffff",
    lineHeight: 20,
    flex: 1,
  },
  limitedOfferFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  limitedExpiry: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },
  limitedPartner: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C7C7CC",
  },
  dotActive: {
    backgroundColor: "#6C63FF",
    width: 18,
  },
  discountCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    overflow: "hidden",
  },
  discountImg: {
    width: 72,
    height: 72,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  discountInfo: {
    flex: 1,
  },
  discountName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#1C1B2E",
    marginBottom: 3,
  },
  discountDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#6B6B8A",
    lineHeight: 17,
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tag: {
    backgroundColor: "#F2F3F7",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagText: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#6B6B8A",
  },
  heartBtn: {
    padding: 6,
    marginLeft: 4,
  },
  allDiscountsBtn: {
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 10,
    backgroundColor: "#6C63FF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  allDiscountsBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#ffffff",
  },
});

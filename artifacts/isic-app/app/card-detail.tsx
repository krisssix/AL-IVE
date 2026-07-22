import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import QRCode from "react-native-qrcode-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;
// The card background asset is 1144 x 1755 px — keep the exact ratio so the
// absolutely positioned overlays line up with the frames baked into the image.
const CARD_W = Math.min(SCREEN_WIDTH - 48, 360);
const CARD_H = CARD_W * (1755 / 1144);

const cards = [
  {
    id: "1",
    cardNumber: "S 420 300 690 098 J",
    holderName: "Kristina Nazarjanová",
    school: "Mendelova univerzita",
    validFrom: "09/2025",
    validTo: "12/2026",
    born: "21. 03. 2002",
    valid: true,
  },
];

function ISICCard({ card }: { card: typeof cards[0] }) {
  return (
    <View style={[styles.card, { width: CARD_W, height: CARD_H }]}>
      <Image
        source={require("../assets/images/isic-card-bg.png")}
        style={styles.cardBg}
        resizeMode="stretch"
      />

      <Text style={styles.cardNum}>{card.cardNumber}</Text>

      <Image
        source={require("../assets/images/student-photo.png")}
        style={styles.photo}
        resizeMode="cover"
      />

      <Text style={styles.holderName}>{card.holderName}</Text>
      <Text style={styles.holderSchool}>{card.school}</Text>

      <View style={styles.validityBlock}>
        <Text style={styles.infoValue}>
          {card.validFrom} – {card.validTo}
        </Text>
      </View>
      <View style={styles.bornBlock}>
        <Text style={styles.infoValue}>{card.born}</Text>
      </View>

      <View style={styles.qrContainer}>
        <QRCode
          value={card.cardNumber}
          size={CARD_W * 0.3}
          color="#1C1B2E"
          backgroundColor="#ffffff"
        />
      </View>
    </View>
  );
}

export default function CardDetailScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [activeTab, setActiveTab] = useState<"front" | "back">("front");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateStr = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { marginTop: topPad + 8 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.validBadge}>
          <View style={styles.greenDot} />
          <Text style={styles.validText}>PLATNÝ</Text>
        </View>
        <Text style={styles.dateTimeText}>
          {dateStr} | {timeStr}
        </Text>
      </View>

      <View style={styles.cardArea}>
        <ISICCard card={cards[0]} />
        <View style={styles.dotRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={[styles.pillWrapper, { bottom: bottomPad + 16 }]}>
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "front" && styles.tabBtnActive]}
            onPress={() => setActiveTab("front")}
          >
            <MaterialCommunityIcons
              name="badge-account-outline"
              size={26}
              color={activeTab === "front" ? "#ffffff" : "#8A8A9A"}
            />
          </TouchableOpacity>
          <View style={styles.tabDivider} />
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "back" && styles.tabBtnActive]}
            onPress={() => setActiveTab("back")}
          >
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={24}
              color={activeTab === "back" ? "#ffffff" : "#8A8A9A"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBar: {
    marginHorizontal: 14,
    backgroundColor: "#242044",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  backBtn: { padding: 2 },
  validBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  greenDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#34D399",
  },
  validText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#34D399",
    letterSpacing: 0.5,
  },
  dateTimeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#EDEDF5",
    marginLeft: "auto",
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 84,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#30B8B8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
    backgroundColor: "#ffffff",
  },
  cardBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  cardNum: {
    position: "absolute",
    left: CARD_W * 0.628,
    top: CARD_H * 0.044,
    fontFamily: "Inter_600SemiBold",
    fontSize: CARD_W * 0.034,
    color: "#1C1B2E",
  },
  photo: {
    position: "absolute",
    left: CARD_W * 0.348,
    top: CARD_H * 0.177,
    width: CARD_W * 0.33,
    height: CARD_H * 0.253,
    borderRadius: CARD_W * 0.025,
  },
  holderName: {
    position: "absolute",
    left: 0,
    right: 0,
    top: CARD_H * 0.458,
    fontFamily: "Inter_700Bold",
    fontSize: CARD_W * 0.056,
    color: "#1C1B2E",
    textAlign: "center",
  },
  holderSchool: {
    position: "absolute",
    left: 0,
    right: 0,
    top: CARD_H * 0.517,
    fontFamily: "Inter_500Medium",
    fontSize: CARD_W * 0.038,
    color: "#1C3A6E",
    textAlign: "center",
  },
  validityBlock: {
    position: "absolute",
    left: 0,
    width: CARD_W * 0.574,
    top: CARD_H * 0.634,
    alignItems: "center",
  },
  bornBlock: {
    position: "absolute",
    left: CARD_W * 0.51,
    width: CARD_W * 0.49,
    top: CARD_H * 0.634,
    alignItems: "center",
  },
  infoValue: {
    fontFamily: "Inter_700Bold",
    fontSize: CARD_W * 0.044,
    color: "#1C1B2E",
  },
  qrContainer: {
    position: "absolute",
    left: CARD_W * 0.35,
    top: CARD_H * 0.711,
    width: CARD_W * 0.345,
    height: CARD_H * 0.242,
    alignItems: "center",
    justifyContent: "center",
  },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4A4668",
  },
  dotActive: {
    backgroundColor: "#2AB5B5",
  },
  pillWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tabSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 44,
    padding: 8,
    shadowColor: "#1C1B2E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 10,
  },
  tabBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBtnActive: {
    backgroundColor: "#6C63FF",
  },
  tabDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#E5E5EA",
    marginHorizontal: 6,
  },
});

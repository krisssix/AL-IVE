import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const CARD_W = Math.min(SCREEN_WIDTH - 40, 360);
const CARD_H = CARD_W * 1.55;
const BADGE_SIZE = 78;

const cards = [
  {
    id: "1",
    cardNumber: "S 123 456 789 012 X",
    holderName: "Karolína Veselá",
    school: "Škola",
    validFrom: "09/2025",
    validTo: "12/2026",
    born: "21. 03. 2002",
    valid: true,
  },
];

const BADGE_POSITIONS = [
  { topFrac: 0.03, rightFrac: 0.04,  tilt: -15, delay: 0   },
  { topFrac: 0.03, rightFrac: 0.52,  tilt:  10, delay: 90  },
  { topFrac: 0.10, rightFrac: 0.76,  tilt:  -5, delay: 180 },
  { topFrac: 0.18, rightFrac: 0.16,  tilt:  20, delay: 270 },
  { topFrac: 0.20, rightFrac: 0.56,  tilt: -25, delay: 140 },
  { topFrac: 0.30, rightFrac: 0.83,  tilt:  12, delay: 240 },
  { topFrac: 0.33, rightFrac: 0.02,  tilt: -10, delay: 340 },
  { topFrac: 0.40, rightFrac: 0.46,  tilt:   8, delay: 60  },
  { topFrac: 0.48, rightFrac: 0.73,  tilt: -18, delay: 390 },
  { topFrac: 0.53, rightFrac: 0.12,  tilt:  15, delay: 175 },
  { topFrac: 0.61, rightFrac: 0.59,  tilt:  -8, delay: 310 },
  { topFrac: 0.68, rightFrac: 0.26,  tilt:  22, delay: 75  },
  { topFrac: 0.76, rightFrac: 0.66,  tilt: -12, delay: 440 },
];

function ISICBadge({
  topFrac,
  rightFrac,
  tilt,
  delay,
}: {
  topFrac: number;
  rightFrac: number;
  tilt: number;
  delay: number;
}) {
  const slideAnim = useRef(new Animated.Value(BADGE_SIZE * 3)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 4000 + delay * 3,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();

    return () => {
      clearTimeout(enterTimer);
      spinLoop.stop();
    };
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const topPx = topFrac * SCREEN_HEIGHT;
  const rightPx = rightFrac * SCREEN_WIDTH;

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: topPx,
        right: rightPx,
        transform: [
          { translateX: slideAnim },
          { rotate: `${tilt}deg` },
        ],
        opacity: opacityAnim,
        zIndex: 10,
      }}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LinearGradient
          colors={["#3A8FBF", "#30C8B8", "#22D4C4", "#4870B0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.badgeCircle}
        >
          <Text style={styles.badgeText}>ISIC</Text>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}

function ISICCard({ card }: { card: typeof cards[0] }) {
  return (
    <View style={[styles.card, { width: CARD_W, height: CARD_H }]}>
      <Image
        source={require("../assets/images/isic-card-bg.png")}
        style={styles.cardBg}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.isicLogoArea}>
            <LinearGradient
              colors={["#3A8FBF", "#30C8B8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.isicCircle}
            >
              <Text style={styles.isicCircleText}>ISIC</Text>
            </LinearGradient>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.isicIntl}>INTERNATIONAL</Text>
              <Text style={styles.isicStudent}>STUDENT</Text>
              <Text style={styles.isicIdentity}>IDENTITY CARD</Text>
            </View>
          </View>
          <View style={styles.unescoArea}>
            <Feather name="globe" size={16} color="#0D5C84" />
            <View style={{ marginLeft: 4 }}>
              <Text style={styles.cardNumLabel}>ISIC card number</Text>
              <Text style={styles.cardNum}>{card.cardNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.photoContainer}>
          <View style={styles.photoPlaceholder}>
            <Feather name="user" size={46} color="rgba(255,255,255,0.65)" />
          </View>
        </View>

        <Text style={styles.holderName}>{card.holderName}</Text>
        <Text style={styles.holderSchool}>{card.school}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Platnost | Validity</Text>
            <Text style={styles.infoValue}>
              {card.validFrom} – {card.validTo}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Narozen(a) | Born</Text>
            <Text style={styles.infoValue}>{card.born}</Text>
          </View>
        </View>

        <View style={styles.qrContainer}>
          <QRCode
            value={`ISIC-${card.cardNumber}`}
            size={CARD_W * 0.37}
            color="#1C1B2E"
            backgroundColor="#ffffff"
          />
        </View>
      </View>
    </View>
  );
}

export default function CardDetailScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [activeTab, setActiveTab] = useState<"front" | "back">("front");

  const now = new Date();
  const dateStr = `${now.getDate()}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: topPad + 4 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.validBadge}>
          <View style={styles.greenDot} />
          <Text style={styles.validText}>PLATNÝ</Text>
        </View>
        <Text style={styles.dateTimeText}>
          {dateStr} | {timeStr}
        </Text>
      </View>

      <View style={styles.screenBody}>
        {BADGE_POSITIONS.map((b, i) => (
          <ISICBadge
            key={i}
            topFrac={b.topFrac}
            rightFrac={b.rightFrac}
            tilt={b.tilt}
            delay={b.delay}
          />
        ))}

        <View style={styles.cardArea}>
          <View style={styles.cardWrapper}>
            <ISICCard card={cards[0]} />
          </View>
          <View style={styles.dotRow}>
            <View style={[styles.dot, styles.dotActive]} />
          </View>
        </View>
      </View>

      <View style={[styles.bottomActions, { paddingBottom: bottomPad + 10 }]}>
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "front" && styles.tabBtnActive]}
            onPress={() => setActiveTab("front")}
          >
            <Feather
              name="credit-card"
              size={22}
              color={activeTab === "front" ? "#ffffff" : "#8A8A9A"}
            />
          </TouchableOpacity>
          <View style={styles.tabDivider} />
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "back" && styles.tabBtnActive]}
            onPress={() => setActiveTab("back")}
          >
            <Feather
              name="list"
              size={22}
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
    backgroundColor: "#1C1B2E",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 12,
    zIndex: 999,
  },
  backBtn: { padding: 4 },
  validBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greenDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#34D399",
  },
  validText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#34D399",
    letterSpacing: 0.5,
  },
  dateTimeText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#A0A0C0",
    marginLeft: "auto",
  },
  screenBody: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  cardWrapper: {
    shadowColor: "#30B8B8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 12,
    borderRadius: 16,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  cardBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 14,
    zIndex: 800,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 2,
    backgroundColor: "rgba(255,255,255,0.92)",
    marginBottom: 10,
  },
  isicLogoArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  isicCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  isicCircleText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  isicIntl: {
    fontFamily: "Inter_400Regular",
    fontSize: 7,
    color: "#1C3A6E",
    letterSpacing: 0.5,
  },
  isicStudent: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#1C3A6E",
  },
  isicIdentity: {
    fontFamily: "Inter_400Regular",
    fontSize: 7,
    color: "#1C3A6E",
    letterSpacing: 0.5,
  },
  unescoArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardNumLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 8,
    color: "#6B6B8A",
  },
  cardNum: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#1C1B2E",
  },
  photoContainer: {
    marginBottom: 12,
    marginTop: 2,
  },
  photoPlaceholder: {
    width: CARD_W * 0.34,
    height: CARD_W * 0.37,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  holderName: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: "#1C1B2E",
    marginBottom: 3,
    textAlign: "center",
  },
  holderSchool: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#1C3A6E",
    marginBottom: 14,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  infoBlock: { alignItems: "flex-start" },
  infoLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 9,
    color: "#1C3A6E",
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#1C1B2E",
  },
  qrContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
  },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#C7C7CC",
  },
  dotActive: {
    backgroundColor: "#6C63FF",
    width: 18,
  },
  bottomActions: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F2F3F7",
    backgroundColor: "#ffffff",
    zIndex: 999,
  },
  tabSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F7",
    borderRadius: 50,
    padding: 4,
  },
  tabBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBtnActive: {
    backgroundColor: "#6C63FF",
  },
  tabDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E5EA",
    marginHorizontal: 2,
  },
  badgeCircle: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.82,
  },
  badgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: "#ffffff",
    letterSpacing: 1,
  },
});

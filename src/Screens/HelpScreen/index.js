import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useStateContext } from "../../context/StateContext/StateContext";
import { FONTS, SIZES, images, COLORS } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Accordion from "../../components/Accordion";

const HelpScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useStateContext();
  const { width, height } = Dimensions.get("screen");
  const Data = [
    {
      id: 1,
      title: "HELP",
      // image: images.marketplace_logo,
    },
  ];
  const Tac = [
    {
      id: 1,
      title: "Terms of Use – V07 – July 2020",
      content:
        "This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of www.swiggy.com website and Swiggy application for mobile and handheld devices.",
      subTitle: "Terms of Use",
      subContentTitle: [
        {
          id: 1,
          subContent:
            "These terms of use the Terms of Use govern your use of our website www.swiggy.com the Website and our Swigg application for mobile and handheld devices the App. The Website and the App are jointly referred to as the Platform. Please read these Terms of Use carefully before you use the services. If you do not agree to these Terms of Use, you may not use the services on the Platform, and we request you to uninstall the App. By installing, downloading or even merely using the Platform, you shall be contracting with Swiggy and you signify your acceptance to this Terms of Use and other Swiggy policies (including but not limited to the Cancellation & Refund Policy, Privacy Policy and Take Down Policy) as posted on the Platform and amended from time to time, which takes effect on the date on which you download, install or use the Platform, and create a legally binding arrangement to abide by the same.",
        },
        {
          id: 2,
          subContent:
            "Swiggy enables transactions on its Platform between participating restaurants/merchants and buyers, dealing in (a) prepared food and beverages, (b) consumer goods, and (c) other products and services Platform Services. The buyers Buyer/s can choose and place orders Ordersfrom a variety of products and services listed and offered for sale by various merchants including but not limited to the restaurants, eateries and grocery stores Merchant/s, on the Platform. Further, the Buyer can also place Orders for undertaking certain tasks on the Platform Tasks.",
        },
        {
          id: 3,
          subContent:
            "Swiggy enables delivery of such Orders or completion of Tasks at select localities of serviceable cities across India Delivery Services by connecting third party service providers i.e. pick-up and delivery partners (“PDP”) who will be responsible for providing the pick-up and delivery services and completing Tasks initiated by the users of the Platform (Buyers or Merchants). The Platform Services and Delivery Services are collectively referred to as Services. For both Platform Services and Delivery Services, Swiggy is merely acting as an intermediary between the Merchants and Buyers and/or PDPs and Buyers/Merchants",
        },
        {
          id: 4,
          subContent:
            "PDPs are individual entrepreneurs engaged with Swiggy on a voluntary, non-exclusive and principal to principal basis to provide aforementioned services for service fee. PDPs are independent contractors and are free to determine their timings of work.  Swiggy does not exercise control on the PDPs and the relationship between the PDPs and Swiggy is not that of an agent and principal or employee and employer. ",
        },
        {
          id: 5,
          subContent:
            "For the pickup and delivery services and completing the Tasks, PDPs may charge the users of the Platform (Buyers or Merchants), a service fee (inclusive of applicable taxes whenever not expressly mentioned) determined on the basis of various factors including but not limited to distance covered, time taken, demand for delivery services/Tasks, real time analysis of traffic and weather conditions, seasonal peaks or such other parameters as may be determined from time to time.",
        },
      ],
    },
    {
      id: 2,
      title: "Amendments",
      content:
        "These Terms of Use are subject to modifications. We reserve the right to modify or change these Terms of Use and other Swiggy policies at any time by posting modified documents on the Platform and notifying you of the same for your perusal. You shall be liable to update yourself of such changes, if any, by accessing the same. You shall, at all times, be responsible for regularly reviewing the Terms of Use and the other Swiggy policies and note the changes made on the Platform. Your continued usage of the Services after any change is posted constitutes your acceptance of the amended Terms of Use and other Swiggy policies. As long as you comply with these Terms of Use, Swiggy grants you a personal, non-exclusive, non-transferable, limited privilege to access, enter, and use the Platform. By accepting these Terms of Use, you also accept and agree to be bound by the other terms and conditions and Swiggy policies (including but not limited to Cancellation & Refund Policy, Privacy Policy and Notice and Take Down Policy) as may be posted on the Platform from time to time.",
      subTitle: "Use of Platform and Services",
      subContentTitle: [
        {
          id: 1,
          subContent:
            "All commercial/contractual terms are offered by and agreed to between Buyers and Merchants alone with respect to products and services being offered by the Merchants. The commercial/contractual terms include without limitation price, applicable taxes, shipping costs, payment terms, date, period and mode of delivery, warranties related to products and services and after sales services related to products and services. Swiggy does not have any control or does not determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between the Buyers and Merchants. Swiggy may, however, offer support services to Merchants in respect to Order fulfilment, mode of payment, payment collection, call centre support and other ancillary services, pursuant to independent contracts executed by Swiggy with the Merchants. The price of the product and services offered by the Merchant are determined by the Merchant itself and Swiggy has no role to play in such determination of price in any way whatsoever.",
        },
        {
          id: 2,
          subContent:
            "Upon acceptance of any Order or Task by the PDPs, the pickup and delivery services or Task completion services (as the case may be) undertaken by him/her, shall constitute a separate contract for services between Merchants/Buyers and PDPs. Swiggy shall not be responsible for the services provided by PDP to Merchants/Buyers through the Platform. Swiggy may, however, offer support services to PDPs in respect of Order fulfilment, payment collection, call centre support, and other ancillary services, pursuant to independent contracts executed by Swiggy with the PDPs.",
        },
        {
          id: 3,
          subContent:
            "Swiggy does not make any representation or warranty as to the item-specifics (such as legal title, creditworthiness, identity, etc.) of any of the Merchants. You are advised to independently verify the bona fides of any particular Merchant that you choose to deal with on the Platform and use your best judgment on that behalf. All Merchant offers and third-party offers are subject to respective party terms and conditions. Swiggy takes no responsibility for such offers",
        },
        {
          id: 4,
          subContent:
            "Swiggy neither make any representation or warranty as to specifics (such as quality, value, salability, etc.) of the products or services proposed to be sold or offered to be sold or purchased on the Platform nor does implicitly or explicitly support or endorse the sale or purchase of any products or services on the Platform. Swiggy accepts no liability for any errors or omissions, whether on behalf of itself or third parties. ",
        },
        {
          id: 5,
          subContent:
            "Swiggy does not make any representation or warranty with respect to any aspect of the services being provided by the PDPs through the Platform including but not limited to pick up and delivery services and Task completion services to the Merchants or Buyers as the case may be.",
        },
        {
          id: 6,
          subContent:
            "Swiggy is not responsible for any non-performance or breach of any contract entered into between Buyers and Merchants, and between Merchants/Buyers and PDP on the Platform. Swiggy cannot and does not guarantee that the concerned Buyers, Merchants and PDPs will perform any transaction concluded on the Platform. Swiggy is not responsible for unsatisfactory or non-performance of services or damages or delays as a result of products which are out of stock, unavailable or back ordered.",
        },
        {
          id: 7,
          subContent:
            " Swiggy is operating an online marketplace and assumes the role of facilitator, and does not at any point of time during any transaction between Buyer and Merchant and/or Buyer and PDP on the Platform come into or take possession of any of the products or services offered by Merchant or PDP. At no time shall Swiggy hold any right, title or interest over the products nor shall Swiggy have any obligations or liabilities in respect of such contract entered into between Buyer and Merchant and/or Buyer and PDP.",
        },
        {
          id: 8,
          subContent:
            "Swiggy is only providing a platform for communication and it is agreed that the contract for sale of any of the products or services shall be a strictly bipartite contract between the Merchant and the Buyer. In case of complaints from the Buyer pertaining to efficacy, quality, or any other such issues, Swiggy shall notify the same to Merchant and shall also redirect the Buyer to the consumer call center of the Merchant. The Merchant shall be liable for redressing Buyer complaints. In the event you raise any complaint on any Merchant accessed using our Platform, we shall assist you to the best of our abilities by providing relevant information to you, such as details of the Merchant and the specific Order to which the complaint relates, to enable satisfactory resolution of the complaint. ",
        },
        {
          id: 9,
          subContent:
            "Similar to the above, Swiggy is only providing a platform for communication with PDP and does not provide any pick-up and delivery services or Task completion services with respect to the Orders placed by Merchants/Buyers on the Platform as it is merely facilitating Delivery Services by connecting the Merchants/Buyers with the PDP through the Platform. In case of complaints by the Merchants/Buyers for deficiency or lapse in the delivery services or Task completion services provided by PDP, Swiggy shall notify the same to the PDP and also assist Merchants/Buyers to the best of its abilities to enable satisfactory resolution of the complaint. ",
        },
        {
          id: 10,
          subContent:
            "Please note that there could be risks in dealing with underage persons or people acting under false pretence. ",
        },
      ],
    },
  ];
  const styles = StyleSheet.create({
    grandParent: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: SIZES.radius,
      paddingVertical: SIZES.radius,
    },
    Containerparent: {
      marginVertical: SIZES.radius,
      paddingVertical: SIZES.base,
      // paddingHorizontal: SIZES.base,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      // marginHorizontal: SIZES.radius,
    },
    titletext: {
      color: colors.textColor,
      fontWeight: "bold",
      ...FONTS.h3,
      paddingHorizontal: SIZES.base,
    },
    Subtitle: {
      // ...FONTS.h3,
      fontSize: 14,
      fontWeight: "bold",
      color: colors.textColor,
    },
    SubtitleContainer: {
      paddingVertical: SIZES.base,
    },
    SubContent: {
      // paddingLeft:SIZES.base,
      color: colors.textColor,
      textAlign: "justify",
    },
    SubContentTitle: {
      marginTop: SIZES.radius,
    },
    SubContentText: {
      color: colors.textColor,
      // ...FONTS.h3,
      fontSize: 14,
      fontWeight: "bold",
    },
    SubContentContainer: {
      marginVertical: SIZES.base,
    },
    SubContainer: {
      paddingHorizontal: SIZES.base,
      // marginHorizontal: SIZES.base,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    heading: {
      fontSize: SIZES.h2,
      fontWeight: "bold",
      marginLeft: SIZES.radius,
    },
    back: {
      backgroundColor: colors.iconBackground,

      padding: SIZES.radius,
      borderRadius: 10,
      color: COLORS.primary,
    },
  });
  return (
    <SafeAreaView style={styles.grandParent}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <FontAwesome5 name="chevron-left" size={16} color={colors.primary} />
        </TouchableOpacity>

        <View>
          <Text style={styles.heading}>Help</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Tac.map((item, index) => (
          <View style={styles.SubContainer} key={index}>
            <View style={styles.SubtitleContainer}>
              <Text style={styles.Subtitle}>{item.title}</Text>
            </View>
            <View>
              <Text style={styles.SubContent}>{item.content}</Text>
            </View>
            <View style={{marginTop:10}}>
              <Text style={{ ...FONTS.h3, fontWeight:"bold", color: colors.textColor }}>
                Features
              </Text>
            </View>
            <View
              style={{
                // width:"100%",
                flex: 1,
                borderRadius: 16,
                marginVertical: SIZES.base,
              }}
            >
              <View style={{ marginTop: SIZES.base }}>
                <Accordion
                  title="JavaScript Introduction"
                  content="Its a Long Video"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Accordion
                  title="JavaScript Introduction"
                  content="Its a Long Video"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Accordion
                  title="JavaScript Introduction"
                  content="Its a Long Video"
                />
              </View>
            </View>
            <View style={styles.SubContentTitle}>
              <Text style={styles.SubContentText}>{item.subTitle}</Text>
            </View>
            {item.subContentTitle.map((subitem, index) => (
              <View style={styles.SubContentContainer} key={index}>
                <Text style={styles.SubContent}>{subitem.subContent}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

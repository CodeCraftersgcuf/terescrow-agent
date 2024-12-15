import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, icons } from "@/constants";
import { Image } from "expo-image";
import { useTheme } from "@/contexts/themeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "@/components/Button";
import FilterModal from "@/components/FilterModal";
import RNPickerSelect from "react-native-picker-select";
import Box from "@/components/DashboardBox";
import FullTransactionModal from "@/components/TransactionDetailModal";
import { transactionsData } from "@/utils/usersData";
import { Route, router } from "expo-router";
import NewNotificationModal from "@/components/NewNotification";
import uuid from "react-native-uuid";
import EditProfileModal from "@/components/EditProfileModal";
import { useQuery } from "@tanstack/react-query";
import { token } from "@/utils/apiConfig";
import { getAllUsers } from "@/utils/queries/adminQueries";

const getRandomStatus = () => {
  const statuses = ["successfull", "failed", "pending"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const Users = () => {
  const { name } = transactionsData[0];
  const { dark } = useTheme();
  const [activeBtn, setActiveBtn] = useState("All");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(transactionsData);
  const [selectedOption, setSelectedOption] = useState("Last 30 days");
  const [selectedOption2, setSelectedOption2] = useState("All");
  const [query, setQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const userInitial = name.charAt(0).toUpperCase();
  const [notificationsModalVisible, setNotificationsModalVisible] =
    useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);

  const {data:userData, isLoading, isError, error} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getAllUsers({ token }),
    enabled: !!token,
  })
  console.log("userData", userData?.data);

  const handleTransactionModal = () => {
    setTransactionModalVisible(!transactionModalVisible);
  };

  const handleNotificationModal = () => {
    setNotificationsModalVisible(!notificationsModalVisible);
  };

  const textColor = {
    color: dark ? COLORS.white : COLORS.black,
  };
  const handleMenuToggle = (index: number) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    if (query === "") {
      setFilteredData(transactionsData);
    } else {
      const filterData = transactionsData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filterData);
    }
  };

  const handlePressModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePress = (btn: string) => {
    setActiveBtn(btn);
  };

  const renderRow = ({
    item,
    index,
  }: {
    item: {
      id: string;
      username: string;
      email: string;
      phoneNumber: string;
      role: string;
      gender: string;
      status: string;
    };
    index: number;
  }) => {
    const getStatusBgColor = (status: string) => {
      if (status === "successfull") return COLORS.primary;
      if (status === "pending") return COLORS.warning;
      if (status === "failed") return COLORS.red;
      return COLORS.transparentWhite;
    };

    return (
      <View style={tableHeader.row} key={index}>
        <View style={tableHeader.nameLocationCell}>
          <View style={tableHeader.userInitialContainer}>
            <Text style={textColor}>{userInitial}</Text>
          </View>
          <View style={tableHeader.nameSubTitleContainer}>
            <Text style={[tableHeader.cell, textColor]}>{item.username}</Text>
          </View>
        </View>

        <Text style={[tableHeader.cell, textColor,]}>{item.email}</Text>
        <Text style={[tableHeader.cell, textColor]}>{item.phoneNumber}</Text>
        <Text style={[tableHeader.cell, textColor]}>{item.role}</Text>
        <Text style={[tableHeader.cell, textColor]}>{item.gender}</Text>
        <Text
          style={[
            {
              backgroundColor: getStatusBgColor(item.status),
              borderRadius: 50,
              height: 15,
              width: 15,
              padding: 4,
            },
          ]}
        ></Text>
        <View style={tableHeader.actionCell}>
          <TouchableOpacity onPress={() => handleMenuToggle(index)}>
            <Image
              source={icons.threeDots}
              style={{
                width: 20,
                height: 20,
                marginBottom: 17,
                marginRight: 13,
                tintColor: dark ? COLORS.white : COLORS.black,
              }}
            />
          </TouchableOpacity>
          {menuVisible === index && (
            <View
              style={[
                tableHeader.dropdownMenu,
                { backgroundColor: dark ? COLORS.dark2 : COLORS.white },
              ]}
            >
              <TouchableOpacity
                style={[tableHeader.dropdownItem]}
                onPress={() => router.push(`/profile?id=${item.id}`)}
              >
                <Text style={textColor}>View Customer Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[tableHeader.dropdownItem]}
                onPress={handleTransactionModal}
              >
                <Text style={textColor}>View Transaction Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[tableHeader.dropdownItem]}
                onPress={handleNotificationModal}
              >
                <Text
                  style={[
                    textColor,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#ccc",
                      paddingBottom: 10,
                    },
                  ]}
                >
                  Notifications
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[tableHeader.dropdownItem]}>
                <Text style={textColor}>Block User</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[tableHeader.dropdownItem]}>
                <Text style={textColor}>Delete User</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: dark ? COLORS.dark1 : COLORS.transparentWhite },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerText,
              { color: dark ? COLORS.white : COLORS.black },
            ]}
          >
            Users
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: dark ? COLORS.dark2 : COLORS.white },
            ]}
          >
            <RNPickerSelect
              onValueChange={(value) => setSelectedOption(value)}
              value={selectedOption}
              items={[
                { label: "Last 30 days", value: "Last 30 days" },
                { label: "Last 60 days", value: "Last 60 days" },
                { label: "Last 90 days", value: "Last 90 days" },
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Select", value: null }}
              Icon={() => (
                <Image
                  source={icons.arrowDown}
                  style={{
                    width: 20,
                    height: 20,
                    padding: 10,
                    position: "absolute",
                    right: -5,
                    top: 8,
                    tintColor: dark ? COLORS.white : COLORS.black,
                  }}
                />
              )}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View style={styles.row}>
            <Box title="All Users" value="$1,000" percentage={7} condition />
            <Box title="Customers" value="$500" percentage={5} />
          </View>
          <View style={styles.row}>
            <Box title="Teams" value="$500" percentage={5} />
          </View>
        </View>
        <View
          style={[
            styles.headerButtonsContainer,
            { borderColor: dark ? COLORS.dark2 : "#ccc", borderWidth: 1 },
          ]}
        >
          <TouchableOpacity
            onPress={() => handlePress("All")}
            style={[styles.button, activeBtn === "All" && styles.activeButton]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    activeBtn === "All"
                      ? COLORS.white
                      : dark
                      ? COLORS.white
                      : COLORS.black,
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("customers")}
            style={[
              styles.button,
              activeBtn === "customers" && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    activeBtn === "customers"
                      ? COLORS.white
                      : dark
                      ? COLORS.white
                      : COLORS.black,
                },
              ]}
            >
              Customers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("team")}
            style={[styles.button, activeBtn === "team" && styles.activeButton]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    activeBtn === "team"
                      ? COLORS.white
                      : dark
                      ? COLORS.white
                      : COLORS.black,
                },
              ]}
            >
              Team
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            gap: 5,
            alignItems: "center",
          }}
        >
          <View
            style={[
              styles.searchContainer,
              {
                borderColor: dark ? COLORS.dark3 : COLORS.gray,
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <Image
                source={icons.search}
                style={[
                  styles.icon,
                  { tintColor: dark ? COLORS.white : COLORS.black },
                ]}
              />
            </View>
            <TextInput
              style={[
                styles.searchBar,
                { color: dark ? COLORS.white : COLORS.black },
              ]}
              placeholder="Search Users"
              placeholderTextColor={dark ? COLORS.white : COLORS.black}
              value={query}
              onChangeText={handleSearch}
            />
          </View>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: dark ? COLORS.dark2 : COLORS.white },
            ]}
          >
            <RNPickerSelect
              onValueChange={(value) => setSelectedOption(value)}
              value={selectedOption2}
              items={[
                { label: "All", value: "All" },
                { label: "Success", value: "Successfull" },
                { label: "Failed", value: "Failed" },
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Role", value: null }}
              Icon={() => (
                <Image
                  source={icons.arrowDown}
                  style={{
                    width: 20,
                    height: 20,
                    padding: 10,
                    position: "absolute",
                    right: -5,
                    top: 8,
                    tintColor: dark ? COLORS.white : COLORS.black,
                  }}
                />
              )}
            />
          </View>
        </View>
        <FilterModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
        <ScrollView horizontal>
          <View>
            <View
              style={[
                tableHeader.headerRow,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale200,
                  borderColor: dark ? COLORS.dark2 : "#ccc",
                },
              ]}
            >
              <Text style={[tableHeader.headerCell, textColor]}>
                Name, Username
              </Text>
              <Text style={[tableHeader.headerCell, textColor]}>Email</Text>
              <Text style={[tableHeader.headerCell, textColor]}>Mobile</Text>
              <Text style={[tableHeader.headerCell, textColor]}>Role</Text>
              <Text style={[tableHeader.headerCell, textColor]}>Gender</Text>
              <Text style={[tableHeader.headerCell, textColor]}>Status</Text>
              <Text style={[tableHeader.headerCell, textColor]}></Text>
            </View>
            <FlatList
              data={userData?.data}
              renderItem={renderRow}
              keyExtractor={(_, index) => index.toString()}
              style={{ maxHeight: 300 }}
            />
          </View>
        </ScrollView>
        <FullTransactionModal
          visible={transactionModalVisible}
          onClose={() => setTransactionModalVisible(false)}
          transactionId={transactionsData}
        />
        <EditProfileModal
          visible={notificationsModalVisible}
          onClose={() => setNotificationsModalVisible(false)}
          mode="notifications"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    width: "70%",
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  searchBar: {
    height: 40,
    width: "75%",
  },
  scrollContainer: {
    paddingHorizontal: 13,
    marginBottom: 40,
  },
  iconContainer: {
    position: "absolute",
    left: 15,
    top: 12,
    paddingRight: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
  },
  headerButtonsContainer: {
    flexDirection: "row",
    borderRadius: 10,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
  },
  customBtn: {
    borderRadius: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  activeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterIconContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

const tableHeader = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 20,
    backgroundColor: COLORS.grayscale200,
  },
  headerCell: {
    fontWeight: "bold",
    flex: 1,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  tableBody: {
    maxHeight: "85%",
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  actionCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
    textAlign: "center",
  },
  nameLocationCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  userInitialContainer: {
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: "center",
  },

  nameSubTitleContainer: {
    flex: 1,
    flexDirection: "column",
  },

  dropdownMenu: {
    position: "absolute",
    top: 30,
    right: 20,
    elevation: 5,
    borderRadius: 5,
    padding: 10,
    width: 200,
    zIndex: 200,
  },
  dropdownItem: {
    padding: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    textAlign: "center",
  },
  inputAndroid: {
    color: COLORS.grayscale400,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 18,
  },
});

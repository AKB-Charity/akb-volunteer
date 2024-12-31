import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../api.js";

const ReviewTodayMission = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        let endpoint = "api/get_donation_info/";

        if (activeTab === "organization") {
          endpoint = "api/get_donation_info/?category=org";
        }

        if (isDateSelected) {
          const formattedDate = new Date(
            selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0];
          endpoint =
            activeTab === "organization"
              ? `api/get_donation_info/?date=${formattedDate}&category=org`
              : `api/get_donation_info/?date=${formattedDate}`;
        }

        console.log("Fetching data from endpoint:", endpoint); // Add this line
        const response = await api.get(endpoint);

        console.log("Response data:", response.data); // Add this line

        if (
          !response.data ||
          (typeof response.data === "object" &&
            Object.keys(response.data).length === 0)
        ) {
          setError("No data available for the selected date");
          setData(null);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setData(null);
      }
    };

    fetchData();
  }, [activeTab, selectedDate, isDateSelected]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
    setShowCalendar(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setData(null);
    setError(null);
    setIsDateSelected(false);
  };

  const renderSection = (title, sectionData) => {
    if (!sectionData) return null;

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm w-full">
        <h2 className="text-md font-medium mb-3">{title}</h2>
        <div className="space-y-2">
          {sectionData.total_donations_count !== undefined && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Number of Donations</span>
                <span className="font-medium">
                  {sectionData.total_donations_count}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Donors contributed</span>
                <span className="font-medium">{sectionData.total_donors}</span>
              </div>
            </>
          )}
          {sectionData.details && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Details</h3>
              <div className="space-y-2">
                {sectionData.details.map((detail, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-800 flex space-x-2">
                      <span>{detail.name || "Price per Parcel:"}</span>
                      <span className="font-medium">
                        {detail.amount || detail.price_per_parcel}
                      </span>
                    </span>
                    {detail.total_count !== undefined && (
                      <span className="font-medium">
                        Total Count: {detail.total_count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOrganizationDetails = (organizationData) => {
    if (!organizationData) return null;

    return (
      <div className="space-y-4 w-full">
        {Object.keys(organizationData).map((orgId) => {
          const organization = organizationData[orgId];
          return (
            <div
              key={orgId}
              className="bg-white rounded-lg p-4 shadow-sm w-full"
            >
              <h2 className="text-md font-medium mb-3">
                Organization ID - {orgId}
              </h2>
              <div className="space-y-2">
                {organization.categories &&
                  Object.keys(organization.categories).map((category) => (
                    <div
                      key={category}
                      className="bg-white rounded-lg p-4 shadow-sm w-full"
                    >
                      <h2 className="text-md font-medium mb-3">{category}</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Total Number of Donations
                          </span>
                          <span className="font-medium">
                            {
                              organization.categories[category]
                                .total_donations_count
                            }
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Total Donors contributed
                          </span>
                          <span className="font-medium">
                            {organization.categories[category].total_donors}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!data && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 max-w-7xl mx-auto">
          <h1 className="font-bold text-lg text-center flex-1">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 hidden md:inline">
              {isDateSelected
                ? selectedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Today"}
            </span>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 hover:bg-gray-300 rounded-full relative"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  strokeWidth="2"
                />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1">
        <div className="p-4 max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex rounded-lg bg-gray-200 p-1 mb-4 sticky top-20 z-30">
            <button
              onClick={() => handleTabChange("general")}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === "general"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              General
            </button>
            <button
              onClick={() => handleTabChange("organization")}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === "organization"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Organization
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Content */}
          {!error && (
            <div className="space-y-4">
              {activeTab === "general" ? (
                <>
                  {renderSection("Available Donations", data?.total)}
                  {renderSection("Food", data?.food)}
                  {renderSection("Stray Cats and Dogs", data?.stray)}
                  {renderSection("Groceries", data?.groceries)}
                  {renderSection("Sanitary Pads", data?.sanitary)}
                  {renderSection("Clothes", data?.clothes)}
                  {renderSection("Medicines", data?.medicines)}
                  {renderSection("Medicine", data?.medicine)}
                </>
              ) : (
                renderOrganizationDetails(data)
              )}
            </div>
          )}
        </div>
      </div>

      {showCalendar && (
        <div
          className={`${
            isMobile
              ? "fixed inset-0 bg-white z-50 p-4"
              : "absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
          }`}
        >
          <button
            onClick={() => setShowCalendar(false)}
            className="absolute top-2 right-2 text-red-600"
          >
            &#10006;
          </button>
          <Calendar onChange={handleDateSelect} value={selectedDate} />
        </div>
      )}

      <footer className="w-full py-4 text-center bg-gray-200 font-bold mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default ReviewTodayMission;

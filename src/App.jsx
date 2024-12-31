import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifierSignIn from "./pages/VerifierSignIn";
import VolunteerHome from "./pages/VolunteerHome";
import VolunteerSelectCategory from "./pages/VolunteerSelectCategory";
import FeedFoodCategory from "./components/VolunteerCategory/FeedFoodMobileComponent";
import UploadMoreImages from "./pages/UploadMoreImages";
import ImagePreview from "./pages/ImagePreview";
import ClothesMobileComponent from "./components/VolunteerCategory/ClothesMobileComponent";
import UploadMoreImagesTwo from "./pages/UploadMoreImagesTwo";
import UploadedImagesTwo from "./pages/UploadedImagesTwo";
import UploadBill from "./pages/UploadBill";
import OrgDetails from "./pages/OrgDetails";
import ContactHelp from "./pages/ContactHelp";
import FeedStrayMobileComponent from "./components/VolunteerCategory/FeedStrayMobileComponent";
import SanitaryPadMobileComponent from "./components/VolunteerCategory/SanitaryPadMobileComponent";
import MedicineMobileComponent from "./components/VolunteerCategory/MedicineMobileComponent";
import VolunteerSupportIssue from "./components/VolunteerSupportIssue/VolunteerSupportIssue";
import VolunteerSupportIssueTwo from "./components/VolunteerSupportIssue/VolunteerSupportIssueTwo";
import CheckDonationStatus from "./components/CheckDonationStatus/CheckDonationStatus";
import CheckDonationStatusTwo from "./components/CheckDonationStatus/CheckDonationStatusTwo";
import UploadTodaysPhotos from "./components/UploadTodaysPhotos/UploadTodaysPhotos";
import UploadDeliveryPhotos from "./components/UploadDeliveryPhotos/UploadDeliveryPhotos";
import UploadDeliveryPhotosTwo from "./components/UploadDeliveryPhotos/UploadDeliveryPhotosTwo";
import AdminSupportIssue from "./components/AdminSupportIssue/AdminSupportIssue";
import AdminSupportIssueTwo from "./components/AdminSupportIssue/AdminSupportIssueTwo";
import ReviewTodayMission from "./components/ReviewTodayMission/ReviewTodayMission";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerifierSignIn />} />
        <Route path="/volunteer/volunteer-home" element={<VolunteerHome />} />
        <Route
          path="/volunteer/select-donation-category"
          element={<VolunteerSelectCategory />}
        />
        <Route path="/volunteer/feed-food" element={<FeedFoodCategory />} />
        <Route
          path="/volunteer/feed-stray"
          element={<FeedStrayMobileComponent />}
        />
        <Route
          path="/volunteer/contact-support-issues"
          element={<VolunteerSupportIssue />}
        />
        <Route
          path="/volunteer/contact-support-issue-two/:id"
          element={<VolunteerSupportIssueTwo />}
        />

        <Route
          path="/admin/contact-support-issues"
          element={<AdminSupportIssue />}
        />

        <Route
          path="/admin/contact-support-issue-two/:id"
          element={<AdminSupportIssueTwo />}
        />

        <Route
          path="/volunteer/provide-medicines"
          element={<MedicineMobileComponent />}
        />
        <Route
          path="/volunteer/provide-sanitary"
          element={<SanitaryPadMobileComponent />}
        />
        <Route
          path="/volunteer/clothes-to-poor"
          element={<ClothesMobileComponent />}
        />
        <Route
          path="/volunteer/uploadmoreimage"
          element={<UploadMoreImages />}
        />
        <Route
          path="/volunteer/uploadmoreimagetwo"
          element={<UploadMoreImagesTwo />}
        />
        <Route
          path="/volunteer/uploaded-images-two"
          element={<UploadedImagesTwo />}
        />
        <Route path="" element={<ImagePreview />} />
        <Route
          path="/volunteer/check-donation-status"
          element={<CheckDonationStatus />}
        />
        <Route
          path="/volunteer/check-donation-status-two"
          element={<CheckDonationStatusTwo />}
        />
        <Route
          path="/volunteer/upload-todays-photos"
          element={<UploadTodaysPhotos />}
        />
        <Route
          path="/volunteer/upload-delivery-photos"
          element={<UploadDeliveryPhotos />}
        />
        <Route
          path="/volunteer/upload-delivery-photos-two"
          element={<UploadDeliveryPhotosTwo />}
        />
        <Route
          path="/admin/volunteer/review-today-mission"
          element={<ReviewTodayMission />}
        />
        <Route path="/volunteer/upload-bills" element={<UploadBill />} />
        <Route path="/volunteer/orgn-details" element={<OrgDetails />} />
        <Route path="/volunteer/contact-help" element={<ContactHelp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

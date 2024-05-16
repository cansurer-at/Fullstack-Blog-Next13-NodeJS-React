"use client";
import React, { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import "./CookieConsentComponent.css"; // Import CSS file for styling

const CookieConsentComponent = ({ defaultLanguage }) => {
  const [language, setLanguage] = useState(defaultLanguage); // Default language
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    strictlyNecessary: false,
    performanceAndAnalytics: false,
    advertisingAndTargeting: false,
  });
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const preferences = localStorage.getItem("cookiePreferences");
    if (preferences) {
      setCookiePreferences(JSON.parse(preferences));
    }
  }, []);

  const messages = {
    en: {
      consentModal: {
        title: "We use cookies",
        description:
          "We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic. By continuing to use our site, you accept our use of cookies.",
        primaryBtnText: "Accept all",
        secondaryBtnText: "Customize",
        acceptAllBtn: "Accept all",
        rejectAllBtn: "Reject all",
      },
      settingsModal: {
        title: "Cookie settings",
        saveSettingsBtn: "Save settings",
        acceptAllBtn: "Accept all",
        rejectAllBtn: "Reject all",
        closeBtnLabel: "Close",
        blocks: [
          {
            category: "strictlyNecessary",
            title: "Strictly necessary cookies",
            description:
              "These cookies are essential for the proper functioning of our website. Without these cookies, the website would not work properly.",
          },
          {
            category: "performanceAndAnalytics",
            title: "Performance and Analytics cookies",
            description:
              "These cookies allow us to measure traffic sources and visits so we can improve the performance of our site.",
          },
          {
            category: "advertisingAndTargeting",
            title: "Advertising and Targeting cookies",
            description:
              "These cookies are set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant ads on other sites.",
          },
        ],
      },
    },
    tr: {
      consentModal: {
        title: "Çerezleri Kullanıyoruz",
        description:
          "İçeriği ve reklamları kişiselleştirmek, sosyal medya özellikleri sağlamak ve trafiğimizi analiz etmek için çerezleri kullanıyoruz. Sitemizi kullanmaya devam ederek çerez kullanımımızı kabul ediyorsunuz.",
        primaryBtnText: "Hepsini kabul et",
        secondaryBtnText: "Tercihleri düzenle",
        acceptAllBtn: "Hepsini kabul et",
        rejectAllBtn: "Hepsini reddet",
      },
      settingsModal: {
        title: "Çerez ayarları",
        saveSettingsBtn: "Ayarları kaydet",
        acceptAllBtn: "Hepsini kabul et",
        rejectAllBtn: "Hepsini reddet",
        closeBtnLabel: "Kapat",
        blocks: [
          {
            category: "strictlyNecessary",
            title: "Kesinlikle gerekli çerezler",
            description:
              "Bu çerezler, web sitemizin düzgün çalışması için gereklidir. Bu çerezler olmadan, web sitesi düzgün çalışmaz.",
          },
          {
            category: "performanceAndAnalytics",
            title: "Performans ve Analiz çerezleri",
            description:
              "Bu çerezler, trafik kaynaklarını ve ziyaretleri ölçmemizi sağlar, böylece sitemizin performansını iyileştirebiliriz.",
          },
          {
            category: "advertisingAndTargeting",
            title: "Reklam ve Hedefleme çerezleri",
            description:
              "Bu çerezler, reklam ortaklarımız tarafından web sitemiz üzerinden ayarlanır. İlgi alanlarınızı belirlemek ve diğer sitelerde size uygun reklamlar göstermek için kullanılabilirler.",
          },
        ],
      },
    },
  };
  

  const { consentModal, settingsModal } = messages[language];

  const handleSaveSettings = () => {
    if (!cookiePreferences.strictlyNecessary) {
      alert("You must accept necessary cookies to continue.");
      return;
    }

    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(cookiePreferences)
    );

    // Close the settings modal
    setShowSettings(false);

    // Check if all categories are enabled
    const allCategoriesEnabled = Object.values(cookiePreferences).every(
      (value) => value === true
    );

    // If all categories are enabled, close the cookie message
    if (allCategoriesEnabled) {
      // Programmatically click on the accept button to close the cookie message
      const acceptButton = document.querySelector(".cookie-consent button");
      if (acceptButton) {
        acceptButton.click();
      }
    }

    // Refresh the page if necessary cookie is not accepted
    if (!cookiePreferences.strictlyNecessary) {
      window.location.reload();
    }
  };

  const toggleCheckbox = (category) => {
    setCookiePreferences((prevPreferences) => ({
      ...prevPreferences,
      [category]: !prevPreferences[category],
    }));
  };

  const handleIndividualToggle = (category) => {
    const updatedPreferences = {
      ...cookiePreferences,
      [category]: !cookiePreferences[category],
    };
    setCookiePreferences(updatedPreferences);
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(updatedPreferences)
    );
  };

  const handleRejectAll = () => {
    // Clear all cookie preferences
    setCookiePreferences({
      strictlyNecessary: false,
      performanceAndAnalytics: false,
      advertisingAndTargeting: false,
    });

    // Reload the page
    window.location.href = "/cookie";
  };

  return (
    <>
      
      <CookieConsent
        location="bottom"
        buttonText={consentModal.primaryBtnText}
        declineButtonText={consentModal.rejectAllBtn} // Provide the text for the reject button
        cookieName="cookies"
        style={{ background: "grey", color: "#fff", fontSize: "13px" }}
        buttonStyle={{
          color: "#fff",
          fontSize: "13px",
          backgroundColor: "green",
        }}
        buttonWrapperClasses="button-wrapper"
        expires={150}
        onDecline={() => {
          // Handle reject action here
          window.location.href = "/cookie-rejected";
        }}
      >
        {consentModal.description}
        <button
          onClick={() => setShowSettings(true)}
          style={{
            fontSize: "13px",
            cursor: "pointer",
            color: "black",
            border: "0",
            padding: 4,
            backgroundColor: "rgb(255, 212, 45)",
          }}
        >
          {consentModal.secondaryBtnText}
        </button>
        {/* Custom reject all button */}
        
      </CookieConsent>
      {showSettings && (
        <div className="settings-modal">
          <h2>{settingsModal.title}</h2>
          <div>
            {settingsModal.blocks.map((block, index) => (
              <div key={index}>
                <h3>{block.title}</h3>
                <p>{block.description}</p>
                {/* Toggle individual preference */}
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences[block.category]}
                    onChange={() => {
                      toggleCheckbox(block.category); // Toggle the checkbox state
                      handleIndividualToggle(block.category); // Handle individual toggle action
                    }}
                  />
                  Enable
                </label>
              </div>
            ))}
          </div>
          <button className="save-btn" onClick={handleSaveSettings}>
            {settingsModal.saveSettingsBtn}
          </button>
          <button className="close-btn" onClick={() => setShowSettings(false)}>
            {settingsModal.closeBtnLabel}
          </button>
        </div>
      )}
    </>
  );
};

export default CookieConsentComponent;
